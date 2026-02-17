# dynamic_pdf.py
# One-call, battle-tested pipeline: prompt -> STRICT JSON -> validated -> HTML -> PDF
# Uses Playwright (Chromium). Styling is fixed; content is dynamic.

from __future__ import annotations # for Python 3.7 compatibility
import os, sys, json, asyncio, subprocess # system modules
from pathlib import Path # for file path handling
from typing import List, Literal, Optional, Union # type hinting
from pydantic import BaseModel, Field, ValidationError, StrictStr, StrictInt # for data validation
from jinja2 import Environment, select_autoescape # for HTML templating

from classes.OpenAI import OpenAI # Import OpenAI class for LLM interactions


# ----------------------------- STRICT CONTENT SCHEMA -----------------------------
class PDFGen:

    def __init__(self, prompt: str, pdf_filename: str, page_size: PDFPageSize = "A4"): # Initialize PDFGen with prompt, output filename, and page size
        _env = Environment(autoescape=select_autoescape(["html", "xml"])) # Set up Jinja2 environment for HTML templating
        _tpl = _env.from_string(_HTML)

        # 1) LLM JSON (string)
        raw = PDFGen._llm_json_for_prompt(prompt) # Get JSON response from LLM

        # 2) Validate (retry once with minimal salvage if it fails)
        def _parse(raw_json: str) -> Doc:
            data = json.loads(raw_json) # Parse JSON string into Python dictionary
            return Doc.model_validate(data) # Validate and convert to Doc model

        try:
            doc = _parse(raw)
        except (ValidationError, json.JSONDecodeError) as e: # Handle validation or JSON parsing errors
            # Minimal salvage: wrap whole thing as a paragraph
            salvage = Doc(
                title="Generated Report (Recovered)", # Set title for recovered document
                meta=_DocMeta(),
                blocks=[
                    _BlockCallout(
                        kind="callout",
                        title="Parser Warning",
                        text=str(e),
                        tone="warning",
                    ),
                    _BlockParagraph(kind="paragraph", text=str(raw)[:4000]),
                ],
            )
            doc = salvage

        # 3) Render HTML
        html = _tpl.render(doc=doc)

        # 4) To PDF
        out_path = Path(pdf_filename)
        asyncio.run(PDFGen._html_to_pdf(html, out_path, page_size=page_size)) # Convert HTML to PDF and save to specified path

    @staticmethod
    async def _ensure_chromium(): # Ensure Playwright and Chromium are installed
        # Keep browsers inside project for portability
        os.environ.setdefault("PLAYWRIGHT_BROWSERS_PATH", "0") # Set environment variable for Playwright browsers path
        try:
            # Lazy import so users can import this module without Playwright installed
            import playwright  # noqa
            from playwright.async_api import async_playwright  # noqa
        except Exception:
            subprocess.check_call(
                [sys.executable, "-m", "pip", "install", "playwright"] # Install Playwright if not present
            )
        # Check that Chromium is present; install if missing
        try:
            from playwright._impl._driver import compute_driver_executable  # type: ignore

            # If import works we still might lack browsers; perform a safe install call
            subprocess.check_call(
                [sys.executable, "-m", "playwright", "install", "chromium"] # Install Chromium browser for Playwright
            )
        except Exception:
            subprocess.check_call(
                [sys.executable, "-m", "playwright", "install", "chromium"] # Install Chromium browser for Playwright
            )

    @staticmethod
    async def _html_to_pdf(html: str, out_path: Path, page_size: str = "A4"): # Convert HTML content to PDF using Playwright
        from playwright.async_api import async_playwright  # Import Playwright's async API

        await PDFGen._ensure_chromium()
        out_path.parent.mkdir(parents=True, exist_ok=True)  # Ensure output directory exists
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.set_content(html, wait_until="load")  # Set HTML content in the page
            await page.pdf(path=str(out_path), format=page_size, print_background=True) # Generate PDF from the page content
            await browser.close()

    @staticmethod
    def _llm_json_for_prompt(prompt: str) -> str:
        key = os.getenv("OPENAI_API_KEY")
        if not key or "fake" in key:
            print(f"WARNING: OPENAI_API_KEY missing or invalid ('{key}'). Returning static mock JSON.")
            # Return a minimal valid JSON matching the Doc schema
            return json.dumps({
                "title": "MOCK HEALTH REPORT",
                "meta": {"subject": "Simulation"},
                "blocks": [
                    {"kind": "heading", "level": 1, "text": "Simulation Report"},
                    {"kind": "paragraph", "text": "This is a mock report because no OpenAI API Key was provided."}
                ]
            })
            
        print("Sending api 1") # Log API call
        base_model = OpenAI.structured(prompt, Doc)
        print("Sending api 2") # Log API call
        return base_model.model_dump_json() # Get JSON representation of the validated Doc model


type PDFPageSize = Literal[
    "A0",
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "Letter",
    "Legal",
    "Tabloid",
    "Ledger",
]


class _KVItem(BaseModel):
    key: StrictStr
    value: StrictStr


class _TableCell(BaseModel):
    text: StrictStr


class _TableRow(BaseModel):
    cells: List[_TableCell]


class _BlockHeading(BaseModel):
    kind: Literal["heading"]
    level: Literal[1, 2, 3] = 2
    text: StrictStr


class _BlockParagraph(BaseModel):
    kind: Literal["paragraph"]
    text: StrictStr


class _BlockBullets(BaseModel):
    kind: Literal["bullets"]
    items: List[StrictStr]


class _BlockKeyValues(BaseModel):
    kind: Literal["key_values"]
    items: List[_KVItem]


class _BlockTable(BaseModel):
    kind: Literal["table"]
    header: Optional[_TableRow] = None
    rows: List[_TableRow]


class _BlockCallout(BaseModel):
    kind: Literal["callout"]
    title: Optional[StrictStr] = None
    text: StrictStr
    tone: Literal["info", "warning", "success", "neutral"] = "info"


_ContentBlock = Union[
    _BlockHeading,
    _BlockParagraph,
    _BlockBullets,
    _BlockKeyValues,
    _BlockTable,
    _BlockCallout,
]


class _DocMeta(BaseModel):
    # author: Optional[StrictStr] = None
    subject: Optional[StrictStr] = None
    # locale: Optional[StrictStr] = "en-US"


class Doc(BaseModel):
    title: StrictStr
    meta: _DocMeta = _DocMeta()
    # blocks are order-preserving; layout is template-controlled
    blocks: List[_ContentBlock] = Field(default_factory=list)
    # footer_note: Optional[StrictStr] = None


# ----------------------------- HTML TEMPLATE (INLINE) -----------------------------

_HTML = r"""<!doctype html>
<html lang="{{ doc.meta.locale or 'en' }}">
<head>
<meta charset="utf-8">
<title>{{ doc.title }}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  /* Minimal reset for predictable layout */
  html,body{margin:0;padding:0}
  @page { size: A4; margin: 22mm 18mm; }
  *{box-sizing:border-box}
  body{font: 12pt/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Inter,Arial,sans-serif;color:#111}
  h1,h2,h3{margin:0 0 8px 0; font-weight:700}
  h1{font-size:20pt} h2{font-size:14pt} h3{font-size:12.5pt}
  p{margin:0 0 8px 0}
  p + h1, p + h2, p + h3,
  ul + h1, ul + h2, ul + h3,
  table + h1, table + h2, table + h3,
  .callout + h1, .callout + h2, .callout + h3 { margin-top:16px; }
  .muted{color:#555}
  .doc-header{border-bottom:1px solid #e5e7eb;padding-bottom:8px;margin-bottom:12px}
  .kv{display:flex;flex-wrap:wrap;gap:10px;margin:6px 0 0}
  .kv>span{white-space:nowrap}
  ul{margin:6px 0 8px 20px}
  table{width:100%;border-collapse:collapse;margin:8px 0}
  th,td{border:1px solid #e5e7eb;padding:6px 8px;text-align:left;vertical-align:top}
  th{background:#fafafa;font-weight:600}
  .callout{border-left:4px solid #3b82f6;background:#eff6ff;padding:8px 10px;border-radius:4px;margin:8px 0}
  .callout.warning{border-color:#f59e0b;background:#fffbeb}
  .callout.success{border-color:#10b981;background:#ecfdf5}
  .callout.neutral{border-color:#9ca3af;background:#f3f4f6}
  .footer{position:fixed;bottom:10mm;left:18mm;right:18mm;font-size:9pt;color:#666}
  .page-break{break-after:page}
</style>
</head>
<body>
  <div class="doc-header">
    <h1>{{ doc.title }}</h1>
    <div class="kv muted">
      {% if doc.meta.author %}<span><strong>Author:</strong> {{ doc.meta.author }}</span>{% endif %}
    </div>
  </div>

  {% for b in doc.blocks %}
    {% if b.kind == "heading" %}
      {% if b.level == 1 %}<h1>{{ b.text }}</h1>{% elif b.level == 2 %}<h2>{{ b.text }}</h2>{% else %}<h3>{{ b.text }}</h3>{% endif %}
    {% elif b.kind == "paragraph" %}
      <p>{{ b.text }}</p>
    {% elif b.kind == "bullets" and b.items %}
      <ul>{% for it in b.items %}<li>{{ it }}</li>{% endfor %}</ul>
    {% elif b.kind == "key_values" and b.items %}
      <table>
        <thead><tr><th>Key</th><th>Value</th></tr></thead>
        <tbody>{% for it in b.items %}<tr><td>{{ it.key }}</td><td>{{ it.value }}</td></tr>{% endfor %}</tbody>
      </table>
    {% elif b.kind == "table" and (b.rows or b.header) %}
      <table>
        {% if b.header %}<thead><tr>{% for c in b.header.cells %}<th>{{ c.text }}</th>{% endfor %}</tr></thead>{% endif %}
        <tbody>
          {% for r in b.rows %}
            <tr>{% for c in r.cells %}<td>{{ c.text }}</td>{% endfor %}</tr>
          {% endfor %}
        </tbody>
      </table>
    {% elif b.kind == "callout" %}
      <div class="callout {{ b.tone }}"><strong>{{ b.title or "Note" }}:</strong> {{ b.text }}</div>
    {% endif %}
  {% endfor %}

  {% if doc.footer_note %}
    <div class="footer">{{ doc.footer_note }}</div>
  {% endif %}
</body>
</html>"""
