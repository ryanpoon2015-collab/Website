import sqlite3
import os

def verify_local_db():
    db_path = "local_backup.db"
    if not os.path.exists(db_path):
        print(f"FAILED: {db_path} not found.")
        return

    print(f"Found {db_path}. Checking tables...")
    
    try:
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            
            # Check records table
            cursor.execute("SELECT COUNT(*) FROM records")
            record_count = cursor.fetchone()[0]
            print(f"Total entries in 'records' table: {record_count}")
            
            if record_count > 0:
                print("Last record entry:")
                cursor.execute("SELECT * FROM records ORDER BY timestamp DESC LIMIT 1")
                print(cursor.fetchone())
            
            # Check log_device table
            cursor.execute("SELECT COUNT(*) FROM log_device")
            log_count = cursor.fetchone()[0]
            print(f"Total entries in 'log_device' table: {log_count}")
            
            if log_count > 0:
                print("Last log_device entry:")
                cursor.execute("SELECT * FROM log_device ORDER BY timestamp DESC LIMIT 1")
                print(cursor.fetchone())
                
    except Exception as e:
        print(f"Error checking database: {e}")

if __name__ == "__main__":
    verify_local_db()
