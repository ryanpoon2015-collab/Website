import sys
from unittest.mock import MagicMock
import os

if not os.path.exists("credentials.json"):
    with open("credentials.json", "w") as f:
        f.write("{}")

if not os.path.exists(".env"):
    with open(".env", "w") as f:
        f.write("EMAIL_SENDER=mock@example.com\nEMAIL_PASSWORD=mockpassword\nARDUINO_PORT=MOCK_COM\n")

import mocks

sys.modules["classes.firebase_helper"] = MagicMock()
sys.modules["classes.firebase_helper"].Firebase = mocks.MockFirebase
sys.modules["classes.Arduino"] = MagicMock()
sys.modules["classes.Arduino"].Arduino = mocks.MockArduino
sys.modules["classes.Contec_CMS60D"] = MagicMock()
sys.modules["classes.Contec_CMS60D"].Contec_CMS60D = mocks.MockContec
sys.modules["classes.BP_Picture"] = MagicMock()
sys.modules["classes.BP_Picture"].BP_Picture = mocks.MockBPPicture
sys.modules["classes.PDFGen"] = MagicMock()
sys.modules["classes.PDFGen"].PDFGen = mocks.MockPDFGen
sys.modules["classes.Yagmail"] = MagicMock()
sys.modules["classes.Yagmail"].YaGmail = mocks.MockYaGmail
sys.modules["classes.VectorDB"] = MagicMock()
sys.modules["classes.VectorDB"].VectorDB = mocks.MockVectorDB

print("Starting simulated Flask app...")
import app
