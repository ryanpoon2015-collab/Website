import random
import time
import os
import pandas as pd

class MockFirebase:
    def __init__(self, *args, **kwargs):
        print("[MOCK] Firebase initialized")
    def upload_storage(self, path, filename):
        print(f"[MOCK] Uploading {path} to storage as {filename}")
        return f"https://mock-firebase-url.com/{filename}"
    def write_firestore(self, path, data):
        print(f"[MOCK] Writing to Firestore at {path}: {data}")
    def update_firestore(self, path, data):
        print(f"[MOCK] Updating Firestore at {path}: {data}")
    def exists_firestore(self, path):
        return False
    def timestamp(self):
        from datetime import datetime, timezone
        return datetime.now(timezone.utc)
    def uuid(self):
        import uuid
        return uuid.uuid4().hex

class MockArduino:
    def __init__(self, port):
        print(f"[MOCK] Arduino initialized on {port}")
        self.connected = True
        self.last_cmd = None
    def is_connected(self):
        return self.connected
    def println(self, msg):
        print(f"[MOCK] Arduino println: {msg}")
        self.last_cmd = msg
    def available(self):
        return True
    def read(self):
        # Command 1 is Temperature. Others like 2 (BP Start), 3 (BP Stop), 4 (Fingerprint) expect "1" as success.
        if self.last_cmd in ["2", "3", "4"]:
            return "1"
        
        # Occasionally return a "scary" value to trigger RAG context in PDF
        if random.random() < 0.2:
            return "39.2" # Matches high fever in CSV
        return str(random.uniform(36.5, 37.5)) 

class MockContec:
    def __init__(self):
        print("[MOCK] Contec CMS60D initialized")
    def is_connected(self):
        return True
    def start(self):
        print("[MOCK] Contec started")
    def read(self):
        if random.random() < 0.2:
            return 110, 88 # Matches Tachycardia and Low SpO2 in CSV
        return random.randint(70, 90), random.randint(95, 99)

class MockBPPicture:
    def __init__(self, cam_index=0):
        print(f"[MOCK] BP_Picture initialized on cam {cam_index}")
    def read(self):
        if random.random() < 0.2:
            return 150, 95 # Matches Hypertension in CSV
        return random.randint(110, 130), random.randint(70, 85)

class MockPDFGen:
    def __init__(self, prompt, pdf_filename="output.pdf", **kwargs):
        print(f"[MOCK] PDFGen generating: {pdf_filename}")
        # Extract data and context from prompt if possible for a slightly better mock
        with open(pdf_filename, "w", encoding="utf-8") as f:
            f.write("=" * 60 + "\n")
            f.write("       MOCK HEALTH REPORT (SIMULATION MODE)\n")
            f.write("=" * 60 + "\n\n")
            f.write("PATIENT SUMMARY & AI ANALYSIS:\n")
            f.write("-" * 30 + "\n")
            # Just take the first few lines of the prompt as they usually contain the vital readings
            summary_lines = prompt.split("\n")[:10]
            f.write("\n".join(summary_lines) + "\n\n")
            
            f.write("RECOMMENDATIONS BASED ON HEALTH PATTERNS:\n")
            f.write("-" * 30 + "\n")
            try:
                patterns = pd.read_csv("knowledge/health_patterns.csv")
                for _, row in patterns.sample(n=min(3, len(patterns))).iterrows():
                    f.write(f"- {row['reading_type']} Issue: {row['recommendation']}\n")
            except Exception:
                f.write("- General health advice: Maintain a balanced diet and regular exercise.\n")
            
            f.write("\n" + "=" * 60 + "\n")
            f.write("NOTE: This is a text-based mock PDF for simulation.\n")
            f.write("In production, this would be a full PDF generated via Playwright.\n")
            f.write("=" * 60 + "\n")

class MockYaGmail:
    def __init__(self, *args, **kwargs):
        print(f"[MOCK] YaGmail sending email: {kwargs}")

class MockVectorDB:
    def __init__(self, *args, **kwargs):
        print("[MOCK] VectorDB initialized")
        self.csv_path = "knowledge/health_patterns.csv"
        try:
            self.patterns = pd.read_csv(self.csv_path)
        except Exception as e:
            print(f"[MOCK] Warning: Could not read {self.csv_path}: {e}")
            self.patterns = None

    def search(self, query, k=2):
        print(f"[MOCK] VectorDB searching for: {query}")
        if self.patterns is None:
            return [{"text": "Mock medical context for " + query}]
        
        results = []
        query_lower = query.lower()
        
        # Simple keyword matching for simulation
        for _, row in self.patterns.iterrows():
            if str(row['reading_type']).lower() in query_lower:
                text = f"Pattern Found: {row['reading_type']} at {row['value']}. Symptoms: {row['symptoms']}. Analysis: {row['analysis']}. Rec: {row['recommendation']}"
                results.append({"text": text})
            if len(results) >= k:
                break
        
        if not results:
            results = [{"text": "General health advice: Maintain a balanced diet and regular exercise."}]
            
        return results
