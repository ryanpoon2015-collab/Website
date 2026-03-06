import sqlite3
import json
import os
from datetime import datetime

class LocalDB:
    def __init__(self, db_path="local_backup.db"):
        self.db_path = db_path
        self._init_db()

    def _init_db(self):
        """Initialize the SQLite database with required tables."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            
            # Table for patient records (matches Record model)
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS records (
                    id TEXT PRIMARY KEY,
                    patient_id TEXT,
                    temperature REAL,
                    heart_rate INTEGER,
                    spo2 INTEGER,
                    bp_sys INTEGER,
                    bp_dia INTEGER,
                    result_url TEXT,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Table for log_device (matches LogDevice model)
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS log_device (
                    id TEXT PRIMARY KEY,
                    name TEXT,
                    birthdate TEXT,
                    gender TEXT,
                    contact TEXT,
                    weight REAL,
                    height REAL,
                    patient_id TEXT,
                    pdf_name TEXT,
                    url TEXT,
                    physician TEXT,
                    symptoms TEXT,
                    body_temp REAL,
                    heart_rate INTEGER,
                    spo2 INTEGER,
                    bp_sys INTEGER,
                    bp_dia INTEGER,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            conn.commit()

    def save_record(self, patient_id, record_id, record_dict):
        """Save a record to the local database."""
        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT OR REPLACE INTO records 
                    (id, patient_id, temperature, heart_rate, spo2, bp_sys, bp_dia, result_url)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    record_id,
                    patient_id,
                    record_dict.get('temperature'),
                    record_dict.get('heart_rate'),
                    record_dict.get('spo2'),
                    record_dict.get('bp_sys'),
                    record_dict.get('bp_dia'),
                    record_dict.get('result')
                ))
                conn.commit()
                print(f"LocalDB: Record {record_id} saved.")
        except Exception as e:
            print(f"LocalDB Error saving record: {e}")

    def save_log_device(self, log_id, log_dict):
        """Save a device log to the local database."""
        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT OR REPLACE INTO log_device 
                    (id, name, birthdate, gender, contact, weight, height, patient_id, 
                     pdf_name, url, physician, symptoms, body_temp, heart_rate, spo2, bp_sys, bp_dia)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    log_id,
                    log_dict.get('name'),
                    str(log_dict.get('birthdate')),
                    log_dict.get('gender'),
                    log_dict.get('contact'),
                    log_dict.get('weight'),
                    log_dict.get('height'),
                    log_dict.get('patient_id'),
                    log_dict.get('pdf_name'),
                    log_dict.get('url'),
                    log_dict.get('physician'),
                    log_dict.get('symptoms'),
                    log_dict.get('body_temp'),
                    log_dict.get('heart_rate'),
                    log_dict.get('spo2'),
                    log_dict.get('bp_sys'),
                    log_dict.get('bp_dia')
                ))
                conn.commit()
                print(f"LocalDB: Log {log_id} saved.")
        except Exception as e:
            print(f"LocalDB Error saving log: {e}")
