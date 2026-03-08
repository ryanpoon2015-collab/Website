import json
import os
import sys

# Add project root to path
sys.path.append(os.path.abspath("."))

from classes.VectorDB import VectorDB
from dotenv import load_dotenv

load_dotenv()

def ingest(file_path):
    print(f"Ingesting data from {file_path}...")
    db = VectorDB()
    
    if file_path.endswith(".json"):
        with open(file_path, "r") as f:
            data = json.load(f)
        for item in data:
            print(f"Adding (JSON): {item['text'][:50]}...")
            db.add_document(item['text'], item.get('tags'))
            
    elif file_path.endswith(".csv"):
        import csv
        with open(file_path, "r", encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Combine all columns into a single text for better context
                text_content = " ".join([f"{k}: {v}" for k, v in row.items() if v])
                print(f"Adding (CSV): {text_content[:50]}...")
                db.add_document(text_content, row)
    else:
        print(f"Unsupported file format: {file_path}")
        return

    print("Ingestion complete. Index saved.")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Ingest health data into FAISS.")
    parser.add_argument("file", nargs="?", default="knowledge/health_patterns.csv", help="File to ingest (JSON or CSV)")
    args = parser.parse_args()
    
    if os.path.exists(args.file):
        ingest(args.file)
    else:
        print(f"File not found: {args.file}")
