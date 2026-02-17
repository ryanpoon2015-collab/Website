from dataclasses import dataclass # Import dataclass decorator
import serial


@dataclass
class Arduino:
    port: str
    baudrate: int = 9600

    def __post_init__(self):
        self.use_arduino = self.port != ""
        if self.use_arduino:
            self.ser = serial.Serial(self.port, self.baudrate, timeout=1) # Initialize serial connection

    def print(self, data: str):
        if self.use_arduino:
            self.ser.write(data.encode()) # Send data to Arduino

    def println(self, data: str):
        if self.use_arduino:
            self.ser.write((data + "\n").encode()) # Send data with newline

    def available(self):
        if not self.use_arduino: # Check if Arduino is used
            return False

        return self.ser.in_waiting # Check if data is available

    def read(self):
        if not self.use_arduino: # Check if Arduino is used
            return ""

        try:
            return self.ser.readline().decode("utf-8", errors="replace").strip() # Read and decode data
        except UnicodeDecodeError as e:
            print(f"Decoding error: {e}") # Handle decoding errors
            return ""

    def close(self):
        if self.use_arduino:
            self.ser.close() # Close serial connection
