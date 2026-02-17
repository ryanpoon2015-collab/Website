import json
from typing import Optional
from pydantic import BaseModel


class HealthData(BaseModel):
    spo2: int
    pulse_rate: int
    reading_contec: bool


class MyData:
    def __init__(self):
        self.filepath = "health_data.json"
        self.data = self.load()

    #! LOAD
    def load(self) -> HealthData:
        with open(self.filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
        return HealthData(**data)  # directly convert dict -> Pydantic class

    #! SAVE
    def save(
        self,
        spo2: Optional[int] = None,
        pulse_rate: Optional[int] = None,
        reading_contec: Optional[bool] = None,
    ):
        if spo2 is not None:
            self.data.spo2 = spo2

        if pulse_rate is not None:
            self.data.pulse_rate = pulse_rate

        if reading_contec is not None:
            self.data.reading_contec = reading_contec

        with open(self.filepath, "w", encoding="utf-8") as f:
            json.dump(self.data.model_dump(), f, indent=4)
