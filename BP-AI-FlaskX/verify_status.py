import sys
import os

# Add project root to path
sys.path.append(os.path.abspath("."))

from classes.Arduino import Arduino
from classes.Contec_CMS60D import Contec_CMS60D

def test_status():
    print("Testing Device Status Connectivity Logic...")
    
    # Test Arduino (without real port, should be False if port fails to open or is empty)
    # Using a fake port to see if it handles the error gracefully
    arduino = Arduino("COM_NONEXISTENT")
    print(f"Arduino (fake port) is_connected: {arduino.is_connected()}")
    
    # Test Contec (should be False if device not found)
    contec = Contec_CMS60D()
    try:
        status = contec.is_connected()
        print(f"Contec is_connected: {status}")
    except Exception as e:
        print(f"Contec check failed as expected: {e}")

if __name__ == "__main__":
    test_status()
