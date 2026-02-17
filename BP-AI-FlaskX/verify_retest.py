import requests
import json
import time

def verify_retest_logic():
    url = "http://localhost:5000/chatgpt_quick"
    
    # First request
    payload1 = {
        "height": 170.0,
        "weight": 70.0,
        "symptoms": "First attempt to get an ID",
        "spo2": 98,
        "heart_rate": 72,
        "body_temp": 36.6,
        "bp_sys": 120,
        "bp_dia": 80
    }

    print("Testing retest / ID reuse logic...")
    print("Sending first request...")
    try:
        resp1 = requests.post(url, json=payload1)
        data1 = resp1.json()
        
        if resp1.status_code != 200:
            print(f"First request failed: {resp1.text}")
            return

        storage_id = data1.get("data", {}).get("id")
        print(f"First request success. ID: {storage_id}")

        # Second request with same ID
        payload2 = payload1.copy()
        payload2["id"] = storage_id
        payload2["symptoms"] = "Retest with same ID"

        print(f"Sending retest request with ID: {storage_id}...")
        resp2 = requests.post(url, json=payload2)
        data2 = resp2.json()

        if resp2.status_code != 200:
            print(f"Retest request failed: {resp2.text}")
            return

        new_storage_id = data2.get("data", {}).get("id")
        print(f"Retest request success. ID: {new_storage_id}")

        if storage_id == new_storage_id:
            print("SUCCESS: Record ID was reused!")
        else:
            print(f"FAILED: ID mismatch. Original: {storage_id}, New: {new_storage_id}")

    except Exception as e:
        print(f"Error during verification: {e}")
        print("Make sure the backend is running (python app.py)")

if __name__ == "__main__":
    verify_retest_logic()
