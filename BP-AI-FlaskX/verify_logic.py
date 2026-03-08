def get_temp_status(t):
    if t < 35.0: return "Hypothermia"
    if t <= 37.2: return "Normal"
    if t <= 38.4: return "Fever"
    return "High Fever"

def get_spo2_status(s):
    if s >= 95: return "Normal"
    if s >= 90: return "Low Oxygen"
    return "Critical"

def get_pulse_status(p):
    if p < 60: return "Bradycardia"
    if p <= 100: return "Normal"
    return "Tachycardia"

def get_bp_status(sys, dia):
    if sys < 120 and dia < 80: return "Normal"
    if sys < 130 and dia < 80: return "Elevated"
    if sys < 140 or dia < 90: return "Hypertension Stage 1"
    if sys < 180 or dia < 120: return "Hypertension Stage 2"
    return "Hypertensive Crisis"

def verify():
    print("Verifying Status Categorization Logic...")
    
    # Temperature tests
    assert get_temp_status(34.9) == "Hypothermia"
    assert get_temp_status(36.5) == "Normal"
    assert get_temp_status(37.5) == "Fever"
    assert get_temp_status(38.5) == "High Fever"
    print("Temperature Status: OK")

    # SpO2 tests
    assert get_spo2_status(96) == "Normal"
    assert get_spo2_status(92) == "Low Oxygen"
    assert get_spo2_status(88) == "Critical"
    print("SpO2 Status: OK")

    # Heart Rate tests
    assert get_pulse_status(55) == "Bradycardia"
    assert get_pulse_status(75) == "Normal"
    assert get_pulse_status(105) == "Tachycardia"
    print("Heart Rate Status: OK")

    # BP tests
    assert get_bp_status(110, 70) == "Normal"
    assert get_bp_status(125, 75) == "Elevated"
    assert get_bp_status(135, 85) == "Hypertension Stage 1"
    assert get_bp_status(150, 95) == "Hypertension Stage 2"
    assert get_bp_status(190, 130) == "Hypertensive Crisis"
    print("Blood Pressure Status: OK")

if __name__ == "__main__":
    verify()
