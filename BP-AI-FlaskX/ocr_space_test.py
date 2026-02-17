# ocrspace_7seg_min.py
# Usage:
#   set OCRSPACE_API_KEY=YOUR_KEY   (PowerShell: $env:OCRSPACE_API_KEY='YOUR_KEY')
#   python ocrspace_7seg_min.py "C:\path\to\image.png"
#   python ocrspace_7seg_min.py "https://example.com/meter.jpg"
from dotenv import load_dotenv  # type: ignore

load_dotenv()

import os, sys, re, json, requests

API_KEY = os.getenv("OCRSPACE_API_KEY", "YOUR_API_KEY")
ENDPOINT = "https://api.ocr.space/parse/image"


def ocr_7seg(src: str) -> str:
    hdrs = {"apikey": API_KEY}
    params = {
        "language": "eng",
        "OCREngine": 2,  # Engine 2 = better for digits/single chars
        "isOverlayRequired": False,
        "detectOrientation": True,
        "scale": True,
    }

    if os.path.exists(src):
        with open(src, "rb") as f:
            r = requests.post(ENDPOINT, headers=hdrs, data=params, files={"file": f})
    else:
        r = requests.post(ENDPOINT, headers=hdrs, data={**params, "url": src})

    try:
        j = r.json()
        if isinstance(j, str):  # sometimes API returns a JSON string
            j = json.loads(j)
    except Exception:
        raise SystemExit(f"Bad response ({r.status_code}): {r.text[:400]}")

    if j.get("IsErroredOnProcessing"):
        msg = j.get("ErrorMessage") or j.get("ErrorDetails") or str(j)
        raise SystemExit(f"OCR error: {msg}")

    pr = (j.get("ParsedResults") or [{}])[0]
    raw = pr.get("ParsedText", "")

    # Keep only typical 7-segment chars; collapse spaces
    cleaned = re.sub(r"[^0-9:.\- ]+", "", raw).strip()
    cleaned = re.sub(r"\s+", " ", cleaned)
    return cleaned


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python ocrspace_7seg_min.py <image_path_or_url>")
        sys.exit(1)
    print(ocr_7seg(sys.argv[1]))
