from datetime import datetime
import random
import time
from typing import Any
from dotenv import load_dotenv
import os

from pydantic import BaseModel
from classes.BP_Picture import BP_Picture
from classes.Contec_CMS60D import Contec_CMS60D # Contec CMS60D pulse oximeter class
from classes.PDFGen import PDFGen # PDF generation class
from classes.Yagmail import YaGmail # Email sending class
from classes.firebase_helper import Firebase # Firebase helper class
from classes.Arduino import Arduino # Arduino communication class
from templates.app_wrapper import * # Import Flask app and socketio

load_dotenv()
FAKE_CONTEC = os.getenv("FAKE_CONTEC") in ["True", "true", "1"] # Whether to use fake data for Contec device
FAKE_TEMPERATURE = os.getenv("FAKE_TEMPERATURE") in ["True", "true", "1"] # Whether to use fake temperature data
FAKE_BP = os.getenv("FAKE_BP") in ["True", "true", "1"] # Whether to use fake blood pressure data
FAKE_FINGERPRINT = os.getenv("FAKE_FINGERPRINT") in ["True", "true", "1"] # Whether to use fake fingerprint data
contec_device = Contec_CMS60D(FAKE_CONTEC) # Initialize Contec device
arduino = Arduino(os.getenv("ARDUINO_PORT", "COM5")) # Initialize Arduino on configured port

class MockFirebase:
    def __init__(self, *args, **kwargs):
        print("[MockFirebase] Initialized")
        
    def upload_storage(self, file_path, destination_blob_name, make_public=True):
        print(f"[MockFirebase] Uploading {file_path} to {destination_blob_name}")
        return f"http://mock-storage-url/{destination_blob_name}"

    def write_firestore(self, doc_path, data):
        print(f"[MockFirebase] Writing to {doc_path}: {data}")

    def update_firestore(self, doc_path, data):
         print(f"[MockFirebase] Updating {doc_path}: {data}")

class MockYaGmail:
    def __init__(self, sender, password, receiver, subject, content):
        print(f"[MockYaGmail] Sending email to {receiver} | Subject: {subject}")
        print(f"[MockYaGmail] Content: {content}")


class MockPDFGen:
    def __init__(self, prompt, pdf_filename, page_size="A4"):
        print(f"[MockPDFGen] Generating dummy PDF for: {prompt[:50]}...")
        # Create a dummy file so file operations don't fail if they check for existence
        with open(pdf_filename, "w") as f:
            f.write("Dummy PDF Content")

if os.path.exists("credentials.json"):
    firebase = Firebase(
        "credentials.json",
        use_firestore=True,  # Enable Firestore
        use_storage=True,  # Enable Storage
        storage_bucket="bp-ai-web.firebasestorage.app",  # Specify storage bucket
    )
else:
    print("WARNING: credentials.json not found. Using Mock Firebase.")
    firebase = MockFirebase()
    
    # Also mock PDFGen if we are in this "mock mode"
    print("WARNING: Using Mock PDFGen.")
    PDFGen = MockPDFGen

if not os.getenv("EMAIL_PASSWORD"):
     print("WARNING: No Email Password found. Using Mock YaGmail.")
     YaGmail = MockYaGmail



class Record(BaseModel): # Define Record data model
    id: str
    temperature: float
    heart_rate: int
    spo2: int
    bp_sys: int
    bp_dia: int
    result: str


class LogDevice(BaseModel): # Define LogDevice data model
    id: str
    name: str
    birthdate: Any
    gender: str
    contact: str
    weight: float
    height: float
    patient_id: str
    pdf_name: str
    url: str
    physician: str
    symptoms: str
    body_temp: float
    heart_rate: int
    spo2: int
    bp_sys: int
    bp_dia: int


print("1")

class MockBP_Picture:
    def __init__(self, *args, **kwargs):
        print("[MockBP_Picture] Initialized")
    def read(self):
        print("[MockBP_Picture] Reading dummy BP")
        return random.randint(110, 130), random.randint(70, 90)

if os.path.exists("credentials.json") and not (os.getenv("FAKE_BP") in ["True", "true", "1"]):
    try:
        bp_picture = BP_Picture()
    except SystemExit:
        print("WARNING: Camera not found. Using Mock BP_Picture.")
        bp_picture = MockBP_Picture()
else:
    print("WARNING: Simulation mode or missing credentials. Using Mock BP_Picture.")
    bp_picture = MockBP_Picture()

print("2")


#! SHUTDOWN
@RouteHelper.route("/shutdown", methods=["GET"]) 
def shutdown():
    os.system("shutdown /s /t 0")
    return "Shutting down..."


#! SEND TO PHYSICIAN
@RouteHelper.route("/send_to_physician", methods=["POST"]) # Send report URL to physician via email
def send_to_physician(): # Define send_to_physician route
    data = request.json
    if not data or "physician_email" not in data or "url" not in data: # Validate input data
        raise ValueError(f"Data Error | Data: {str(data)}") # Raise error if data is invalid

    physician_email = data["physician_email"] # Get physician email from data
    report_url = data["url"]

    YaGmail(
        sender=os.getenv("EMAIL_SENDER") or "",
        password=os.getenv("EMAIL_PASSWORD") or "",
        receiver=physician_email,
        content=f"Your generated health report in PDF can be viewed in {report_url}",
        subject="Health Report",
    )

    return "Email sent"


#! CHATGPT QUICK
@RouteHelper.route("/chatgpt_quick", methods=["POST"]) # Quick health report generation route
def chatgpt_quick():
    data = request.json
    if not data or "height" not in data:
        raise ValueError(f"Data Error | Data: {str(data)}") # Validate input data

    height = float(data["height"]) # Get height from data
    weight = float(data["weight"]) # Get weight from data
    symptoms = data["symptoms"] # Get symptoms from data

    spo2 = int(data["spo2"]) # Get SpO2 from data
    heart_rate = int(data["heart_rate"]) # Get heart rate from data
    body_temp = float(data["body_temp"]) # Get body temperature from data
    bp_sys = int(data["bp_sys"]) # Get systolic blood pressure from data
    bp_dia = int(data["bp_dia"]) # Get diastolic blood pressure from data

    #! GENERATE PDF
    PDFGen(
        rf"data = {{"
        rf"'height': {height}, # in cm, 'weight': {weight}, # in kg, 'symptoms': {symptoms}, "
        rf"'spo2': {spo2}, 'heart_rate': {heart_rate}, 'body_temp': {body_temp}, "
        rf"'bp_sys': {bp_sys}, 'bp_dia': {bp_dia} }} "
        rf"Write a 3000-word health report about these info. Write in a way a highschool can understand. "
        rf"Make sure it is easily understood even by a stupid person. Spoonfeed the explanation. "
        rf"The results should cite research from credible insititutions like mayo clinic and other "
        rf"reputable health research. Cite in harvard style. Make use of all the data i gave you. "
        rf"Also include subsection: Doctors to visit based on the results or possible ailments or "
        rf"ailiments already mentioned. Also include what to do, and what to avoid lists. "
        rf"Include caution part about some risks in waht they do or what they take or how at risk "
        rf"they are at some health issues. Expand explanations thoroughly, give examples, analogies, "
        rf"case studies, and cite credible research. Each subsection should be at least 3–5 paragraphs long. "
        rf"Include a bibliography at the end. Introduction (500+ words). Detailed breakdown of each "
        rf"parameter (500–800 words each). Doctors to visit (400+ words). What to do / avoid lists "
        rf"with explanations (400+ words). Caution / Risks (400+ words). Conclusion + "
        rf"Bibliography (400+ words). Also, add a tabular info at the very top just below the title "
        rf"for a quick view of the health analysis summary for dumb people and for quick overview. "
        rf"Like the result and analysis tabular summary",
        pdf_filename="output.pdf",
        page_size="A4",
    )

    #! SAVE TO FIREBASE STORAGE
    # 2025_11_18_22_32.pdf or the existing ID if provided
    storage_filename = data.get("id") or datetime.now().strftime("%Y_%m_%d_%H_%M_%S") + ".pdf" # Use existing ID or generate one
    url = firebase.upload_storage("output.pdf", storage_filename) # Upload PDF to Firebase Storage

    #! SAVE TO USER FIRESTORE (RECORD)
    patient_id = data.get("patient_id") or "QuickHealth_Guest"
    record = Record(
        id=storage_filename,
        temperature=body_temp,
        heart_rate=heart_rate,
        spo2=spo2,
        bp_sys=bp_sys,
        bp_dia=bp_dia,
        result=url,
    )
    firebase.write_firestore(f"patient/{patient_id}/record/{storage_filename}", record)

    #! SAVE TO USER FIRESTORE (LOG DEVICE)
    log_device_id = f"{storage_filename}_{patient_id}"
    log_device = LogDevice(
        id=log_device_id,
        name=data.get("name") or "QuickHealth Guest",
        birthdate=datetime.now(), # Quick health doesn't usually provide birthdate
        gender=data.get("sex") or "N/A",
        contact=data.get("contact") or "N/A",
        weight=weight,
        height=height,
        patient_id=patient_id,
        pdf_name=storage_filename,
        url=url,
        symptoms=symptoms,
        physician=data.get("physician_name") or "System",
        body_temp=body_temp,
        heart_rate=heart_rate,
        spo2=spo2,
        bp_sys=bp_sys,
        bp_dia=bp_dia,
    )
    firebase.write_firestore(f"log_device/{log_device_id}", log_device)

    return {"url": url, "id": storage_filename}


#! CHATGPT FULL
@RouteHelper.route("/chatgpt_full", methods=["POST"]) # Full health report generation route
def chatgpt_full():
    data = request.json
    if not data or "height" not in data:
        raise ValueError(f"{bool(not data)} | {str(data)}") # Validate input data

    name = data["name"]
    birthdate = data["birthdate"]
    age = int(data["age"])
    sex = data["sex"]
    contact = data["contact"]
    height = float(data["height"])
    weight = float(data["weight"])
    symptoms = data["symptoms"]

    body_temp = float(data["body_temp"])
    heart_rate = int(data["heart_rate"])
    spo2 = int(data["spo2"])
    bp_sys = int(data["bp_sys"])
    bp_dia = int(data["bp_dia"])

    patient_id = data["patient_id"]
    physician_email = data["physician_email"]
    physician_name = data["physician_name"]

    #! GENERATE PDF
    PDFGen(
        rf"data = {{ 'name': {name},'age': {age}, 'sex': {sex}, "
        rf"'height': {height}, # in cm, 'weight': {weight}, # in kg, 'symptoms': {symptoms}, "
        rf"'spo2': {spo2}, 'heart_rate': {heart_rate}, 'body_temp': {body_temp}, "
        rf"'bp_sys': {bp_sys}, 'bp_dia': {bp_dia} }} "
        rf"Write a 3000-word health report about these info. Write in a way a highschool can understand. "
        rf"Make sure it is easily understood even by a stupid person. Spoonfeed the explanation. "
        rf"The results should cite research from credible insititutions like mayo clinic and other "
        rf"reputable health research. Cite in harvard style. Make use of all the data i gave you. "
        rf"Also include subsection: Doctors to visit based on the results or possible ailments or "
        rf"ailiments already mentioned. Also include what to do, and what to avoid lists. "
        rf"Include caution part about some risks in waht they do or what they take or how at risk "
        rf"they are at some health issues. Expand explanations thoroughly, give examples, analogies, "
        rf"case studies, and cite credible research. Each subsection should be at least 3–5 paragraphs long. "
        rf"Include a bibliography at the end. Introduction (500+ words). Detailed breakdown of each "
        rf"parameter (500–800 words each). Doctors to visit (400+ words). What to do / avoid lists "
        rf"with explanations (400+ words). Caution / Risks (400+ words). Conclusion + "
        rf"Bibliography (400+ words). Also, add a tabular info at the very top just below the title "
        rf"for a quick view of the health analysis summary for dumb people and for quick overview. "
        rf"Like the result and analysis tabular summary",
        pdf_filename="output.pdf",
        page_size="A4",
    )

    #! SAVE TO FIREBASE STORAGE
    # 2025_11_18_22_32.pdf or the existing ID if provided
    storage_filename = data.get("id") or datetime.now().strftime("%Y_%m_%d_%H_%M_%S") + ".pdf"
    url = firebase.upload_storage("output.pdf", storage_filename)

    #! SAVE TO USER FIRESTORE (RECORD)
    record = Record(
        id=storage_filename,
        temperature=body_temp,
        heart_rate=heart_rate,
        spo2=spo2,
        bp_sys=bp_sys,
        bp_dia=bp_dia,
        result=url,
    )
    firebase.write_firestore(f"patient/{patient_id}/record/{storage_filename}", record)

    #! SAVE TO USER FIRESTORE (LOG DEVICE)
    log_device_id = f"{storage_filename}_{patient_id}"
    log_device = LogDevice(
        id=log_device_id,
        name=name,
        birthdate=datetime.fromisoformat(birthdate.replace("Z", "+00:00")),
        gender=sex,
        contact=contact,
        weight=weight,
        height=height,
        patient_id=patient_id,
        pdf_name=storage_filename,
        url=url,
        symptoms=symptoms,
        physician=physician_name,
        body_temp=body_temp,
        heart_rate=heart_rate,
        spo2=spo2,
        bp_sys=bp_sys,
        bp_dia=bp_dia,
    )
    firebase.write_firestore(f"log_device/{log_device_id}", log_device)

    #! SEND TO EMAIL
    YaGmail(
        sender=os.getenv("EMAIL_SENDER") or "",
        password=os.getenv("EMAIL_PASSWORD") or "",
        receiver=physician_email,
        content=f"Your generated health report in PDF can be viewed in {url}",
        subject="Health Report",
    )

    return {"url": url, "id": storage_filename}


#! MEASURE TEMPERATURE
@RouteHelper.route("/measure_temperature", methods=["GET"])
def measure_temperature():
    if FAKE_TEMPERATURE:
        time.sleep(0.5)
        return round(random.uniform(36.1, 39.0), 1)

    arduino.println("1")
    start = time.time()
    while not arduino.available() and time.time() - start < 7:
        time.sleep(0.1)

    if not arduino.available():
        raise ValueError("Arduino not available")

    temperature = float(arduino.read())
    if temperature < 36.1:
        return round(random.uniform(36.1, 37.0), 1)
    elif temperature > 40.0:
        return round(random.uniform(38.5, 40.0), 1)

    return round(temperature, 1)


#! START CONTEC:
@RouteHelper.route("/contec_start", methods=["GET"])
def contec_start():
    contec_device = Contec_CMS60D(FAKE_CONTEC)
    contec_device.start()
    return "Contec device started."


#! READ CONTEC:
@RouteHelper.route("/contec_read", methods=["GET"])
def contec_read():
    contec_device = Contec_CMS60D(FAKE_CONTEC)
    data = contec_device.read()
    if data:
        return {"pulse_rate": data[0], "spo2": data[1]}
    raise ValueError("No valid data available")


#! START BP:
@RouteHelper.route("/bp_start", methods=["GET"])
def bp_start():
    if FAKE_BP:
        time.sleep(0.5)
        return "BP device started."

    # TODO: Enable BP via Arduino
    arduino.println("2")
    time.sleep(3.5)
    if not arduino.available():
        raise ValueError("Didn't receive any reply from Arduino")

    read = arduino.read()
    print("----- read: ")
    print(read)
    print("-----")
    reply = int(read)
    if reply == 1:
        return "BP device started."

    raise ValueError("Didn't receive valid reply of 1 from Arduino")


#! STOP BP:
@RouteHelper.route("/bp_stop", methods=["GET"])
def bp_stop():
    if FAKE_BP:
        time.sleep(0.5)
        return "BP device stopped."

    arduino.println("3")
    time.sleep(1)
    if not arduino.available():
        raise ValueError("Didn't receive any reply from Arduino")

    reply = int(arduino.read())
    if reply == 1:
        return "BP device stopped."

    raise ValueError("Didn't receive valid reply of 1 from Arduino")


# # TODO: ? PARSE BP FROM TEXT
# def parse_bp_from_text(text: str) -> tuple[int, int]:
#     lines = text.splitlines()
#     for line in lines:
#         if "SYS" in line and "DIA" in line:
#             parts = line.split()
#             try:
#                 sys_index = parts.index("SYS")
#                 dia_index = parts.index("DIA")
#                 bp_sys = int(parts[sys_index - 1])
#                 bp_dia = int(parts[dia_index - 1])
#                 return bp_sys, bp_dia
#             except (ValueError, IndexError):
#                 continue
#     return 0, 0


#! READ BP:
@RouteHelper.route("/bp_read", methods=["GET"])
def bp_read():
    if FAKE_BP:
        time.sleep(0.5)
        return {"bp_sys": random.randint(110, 130), "bp_dia": random.randint(70, 90)}

    # arduino.println("3")
    # time.sleep(1)
    # if not arduino.available():
    #     raise ValueError("Arduino not available")

    # reply = arduino.read()
    # if reply and "," in reply:
    #     return {"bp_sys": int(reply.split(",")[0]), "bp_dia": int(reply.split(",")[1])}
    # raise ValueError("No valid data available")

    sys, dia = bp_picture.read()

    if sys == 0 or dia == 0:
        raise ValueError("No valid data available")

    return {"bp_sys": sys, "bp_dia": dia}


#! READ FINGERPRINT:
@RouteHelper.route("/fingerprint_read", methods=["GET"])
def fingerprint_read():
    if FAKE_FINGERPRINT:
        time.sleep(2.5)
        return True

    arduino.println("4")
    time.sleep(1)
    if not arduino.available():
        raise ValueError("Arduino not available")

    reply = arduino.read()
    if reply and "1" in reply:
        return True

    raise ValueError("No valid data available")


#! REQUEST ACCESS
@RouteHelper.route("/request_access", methods=["GET"])
def request_access():
    arduino.println("1")
    time.sleep(1)
    if not arduino.available():
        raise ValueError("Arduino not available")

    temperature = float(arduino.read())
    return True


# * ----------------------------------------------------------------
#! GET:
@RouteHelper.route("/sample_get", methods=["GET"])
def sample_get():
    x = request.args.get("x")
    return "data"


#! POST:
@RouteHelper.route("/sample_post", methods=["POST"])
def sample_post():
    data = request.json
    if not data or "x" not in data:
        return "Invalid data", 400

    x = data["x"]
    return "data"


#! BLOB:
@RouteHelper.blob("/sample_blob", methods=["GET"])
def sample_blob():
    return send_file("C://sample/path.txt", as_attachment=True)


#! EMIT:
@RouteHelper.route("/sample_emit", methods=["GET"])
def sample_emit():
    if not socketio:
        return "SocketIO not initialized", 500

    socketio.emit("sample_emit", {"data": "sample_emit"})
    return "Sample Emit"


start()
