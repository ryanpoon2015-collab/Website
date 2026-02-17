import requests
import json
import os
from classes.firebase_helper import Firebase

def verify_quick_logging():
    url = "http://localhost:5000/chatgpt_quick"
    payload = {
        "height": 170.0,
        "weight": 70.0,
        "symptoms": "User manual verification",
        "spo2": 98,
        "heart_rate": 72,
        "body_temp": 36.6,
        "bp_sys": 120,
        "bp_dia": 80,
        "patient_id": "User_Manual_Verify",
        "name": "Manual Tester"
    }

    print("Sending /chatgpt_quick request to localhost:5000...")
    try:
        response = requests.post(url, json=payload)
        res_data = response.json()
        
        if response.status_code == 200:
            data = res_data.get("data", {})
            storage_id = data.get("id")
            print(f"Success! Storage ID extracted: {storage_id}")
            
            # Now verify in Firestore
            print("Verifying in Firestore...")
            if not os.path.exists("credentials.json"):
                 print("Error: credentials.json not found in current directory.")
                 return

            firebase = Firebase(
                "credentials.json",
                use_firestore=True,
                use_storage=True,
                storage_bucket="bp-ai-web.firebasestorage.app"
            )
            
            log_device_path = f"log_device/{storage_id}_User_Manual_Verify"
            doc_ref = firebase.db.document(log_device_path)
            snapshot = doc_ref.get()
            
            if snapshot.exists:
                print(f"SUCCESS: Log found in Firestore at {log_device_path}!")
                print(f"Path to check in Firebase Console: log_device/{snapshot.id}")
            else:
                print(f"FAILED: Log NOT found in Firestore at {log_device_path}")
        else:
            print(f"Request failed with status {response.status_code}: {response.text}")
            print("Is your backend (app.py) running?")

    except Exception as e:
        print(f"Error during verification: {e}")
        print("Make sure the backend is running (python app.py)")

if __name__ == "__main__":
    verify_quick_logging()
