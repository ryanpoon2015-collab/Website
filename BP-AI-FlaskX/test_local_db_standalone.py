from classes.LocalDB import LocalDB
import os

def test_local_db():
    print("Starting LocalDB standalone test...")
    db = LocalDB("test_backup.db")
    
    # Test record data
    record_data = {
        "temperature": 36.5,
        "heart_rate": 75,
        "spo2": 98,
        "bp_sys": 120,
        "bp_dia": 80,
        "result": "http://test-url.com/report.pdf"
    }
    
    print("Saving test record...")
    db.save_record("Test_Patient", "test_record_1", record_data)
    
    # Test log_device data
    log_data = {
        "name": "Test User",
        "birthdate": "1990-01-01",
        "gender": "Male",
        "contact": "123456789",
        "weight": 70.0,
        "height": 175.0,
        "patient_id": "Test_Patient",
        "pdf_name": "test_report.pdf",
        "url": "http://test-url.com/report.pdf",
        "physician": "Dr. Test",
        "symptoms": "None",
        "body_temp": 36.5,
        "heart_rate": 75,
        "spo2": 98,
        "bp_sys": 120,
        "bp_dia": 80
    }
    
    print("Saving test log_device...")
    db.save_log_device("test_log_1", log_data)
    
    print("Verification complete. Checking results...")
    if os.path.exists("test_backup.db"):
        import sqlite3
        with sqlite3.connect("test_backup.db") as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id FROM records WHERE id='test_record_1'")
            row = cursor.fetchone()
            if row and row[0] == 'test_record_1':
                print("SUCCESS: Record verified in database!")
            else:
                print("FAILED: Record not found in database.")
                
            cursor.execute("SELECT id FROM log_device WHERE id='test_log_1'")
            row = cursor.fetchone()
            if row and row[0] == 'test_log_1':
                print("SUCCESS: LogVerified in database!")
            else:
                print("FAILED: Log not found in database.")
    
    # Cleanup (Disabled for user audit)
    # os.remove("test_backup.db")

if __name__ == "__main__":
    test_local_db()
