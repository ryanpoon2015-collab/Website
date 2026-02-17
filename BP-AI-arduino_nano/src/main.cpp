

#include <Arduino.h> // Arduino core library
/*//**/ #pragma region  /// ------ MLX90614
#include <Adafruit_GFX.h> // Core graphics library
#include <Adafruit_MLX90614.h> // MLX90614 library 
#include <Wire.h> // I2C library
class MLX90614 {
 private:
  Adafruit_MLX90614 mlx;

 public:
  double calibration = 10.00; //
  MLX90614(double calibration) : calibration(calibration) { 
  }

  void setup() {
    mlx.begin();
    delay(2500); //
  }
  float readTempObj() {
    // float sum = 0;
    // for (int i = 0; i < 10; i++) { // average 10 readings
    //   sum += mlx.readObjectTempC() + calibration; // accumulate 10 readings
    //   delay(100);
    // }
    // float temp = sum / 10.0; // average temperature

    // while (temp < 36.10) temp += 1.0;

    float temp = mlx.readObjectTempC() + calibration; // single read
    return temp; // return temperature
  }

  float readTempAmb() {
    return mlx.readAmbientTempC(); // return ambient temperature
  }
};
#pragma endregion 
/*//**/ #pragma region  /// ------ SerialSerial
typedef void (*StringArrayFunction)(String[], int); // Function pointer type for callback
class SerialSerial {
 private:
  static int splitString(String input, char delimiter, String* resultArray, int maxItems) {
    if (maxItems == 1) { // If only one item is requested, return the whole string
      resultArray[0] = input; // Assign the entire input to the first element
      resultArray[0].trim();
      return 1; // Return count as 1
    }

    int splitCount = 0;
    int startIndex = 0;
    int endIndex = input.indexOf(delimiter); // Find the first occurrence of the delimiter

    while (endIndex >= 0 && splitCount < maxItems) {
      resultArray[splitCount] = input.substring(startIndex, endIndex); // Extract substring
      resultArray[splitCount].trim();
      startIndex = endIndex + 1;
      endIndex = input.indexOf(delimiter, startIndex);// Find the next occurrence of the delimiter
      splitCount++;
    }

    // Add the last part of the input (or the whole input if there are fewer
    // than maxItems parts)
    if (splitCount < maxItems) {
      resultArray[splitCount] = input.substring(startIndex);
      resultArray[splitCount].trim();
      splitCount++;
    }

    return splitCount;
  }

 public:
  SerialSerial() {
  }

  void setup() {
    Serial.begin(9600);
  }

  void on_receive(int receive_size, StringArrayFunction callback) {
    if (Serial.available() > 0) {
      String receivedData = Serial.readStringUntil('\n'); // Read until newline
      // Serial.println("Received Data: " + receivedData);

      String values[receive_size];
      int numValues = splitString(receivedData, ',', values, receive_size);

      if (numValues == receive_size) {
        // Assuming the format is "float,float,String,float"
        callback(values, receive_size);
      }
    }
  }

  template <typename T>
  void print(T data) {
    Serial.print(data);
  }

  template <typename T>
  void println(T data) {
    Serial.println(data);
  }

  void println() {
    Serial.println();
  }

  template <typename T>
  void write(T data) {
    Serial.write(data);
  }

  void write(const uint8_t* data, size_t length) {
    Serial.write(data, length);
  }
};
#pragma endregion
/*//**/ #pragma region  /// ------ Fingerprint_AS608 (rx 8, tx 9)
// Up to 64 fingerprints
#include <Adafruit_Fingerprint.h> // Adafruit Fingerprint library
#include <AltSoftSerial.h> // AltSoftSerial library
class Fingerprint_AS608 {
 private:
  AltSoftSerial ss;
  Adafruit_Fingerprint finger;

 public:
  Fingerprint_AS608() : ss(), finger(&ss) {
  }
  void setup() {
    ss.begin(57600);
    finger.begin(57600);
    if (!finger.verifyPassword()) {
      // Serial.println("Error: Did not find fingerprint sensor. Kindly check wiring and click upload again.");
      while (1) delay(1000);
    }

    finger.getTemplateCount();
    if (finger.templateCount == 0) {
      // Serial.print("[IMPORTANT] Sensor doesn't contain any fingerprint data yet.");
    } else {
      // Serial.print(finger.templateCount);
      // Serial.println(" fingerprints");
    }
  }

  int read() {
    uint8_t p = finger.getImage();
    if (p != FINGERPRINT_OK) return -1;

    p = finger.image2Tz();
    if (p != FINGERPRINT_OK) return -1;

    p = finger.fingerFastSearch();
    if (p != FINGERPRINT_OK) return -1;

    return finger.fingerID;
  }
};
#pragma endregion
/*//**/ #pragma region  /// ------ Relay
class Relay {
 private:
  byte pin;
  bool activeLow;
  bool state = false;

 public:
  Relay(byte pin, bool activeLow = true) {
    this->pin = pin;
    this->activeLow = activeLow;
  }

  void setup() {
    pinMode(pin, OUTPUT);
    off();
  }

  void on() {
    digitalWrite(pin, !activeLow);
    state = true;
  }

  void off() {
    digitalWrite(pin, activeLow);
    state = false;
  }

  void onIf(bool isOn) {
    if (isOn) {
      this->on();
    } else {
      this->off();
    }
  }

  bool isOn() {
    return state;
  }
};
#pragma endregion

// --------------------------------------------------------------- CLASSES
MLX90614 mlx90614(3.7);  // calibration
SerialSerial optiplex;
Fingerprint_AS608 fingerprint;
Relay bpStartRelay(3, true); 
Relay bpPowerRelay(6, true);

// --------------------------------------------------------------- VARIABLES

// --------------------------------------------------------------- FUNCTIONS
void handle_optiplex_receive(String data[], int size) {
  String cmd = data[0];
  cmd.trim();

  //! 1: TEMPERATURE READ
  if (cmd.equals("1")) {
    float tempObject = mlx90614.readTempObj();
    optiplex.println(String(tempObject, 2));
  }

  //! 2: BP START
  else if (cmd.equals("2")) {
    bpPowerRelay.off();
    delay(1000);
    bpPowerRelay.on();
    delay(1000);
    bpStartRelay.on();
    delay(600);
    bpStartRelay.off();
    optiplex.println("1");
  }

  //! 3: BP STOP
  else if (cmd.equals("3")) {
    bpPowerRelay.off();
    delay(500);
    optiplex.println("1");
  }

  //! 4: FINGERPRINT READ
  else if (cmd.equals("4")) {
    int fingerID = fingerprint.read();
    bool found = fingerID > 0;
    optiplex.println(found ? "1" : "0");
  }
}

// --------------------------------------------------------------- SETUP
void _setup() {
  mlx90614.setup();
  optiplex.setup();
  fingerprint.setup();
  bpStartRelay.setup();
  bpPowerRelay.setup();
  bpPowerRelay.off();
}

// --------------------------------------------------------------- LOOP
void _loop() {
  optiplex.on_receive(1, handle_optiplex_receive);
}

// OTHER USE CASES
void other_use_cases() {
}

#pragma region setup
void setup() {
  Serial.begin(9600);
  delay(1000);
  // Serial.println();
  // Serial.println(F("_____________________________"));
  // Serial.println(F("___________S̲_E̲_T̲_U̲_P̲_________"));
  _setup();
  // Serial.println();
}
void loop() {
  // Serial.println(F("_____________________________"));
  // Serial.println(F("___________L̲_O̲_O̲_P̲___________"));
  _loop();
  // Serial.println();
}
#pragma endregion
