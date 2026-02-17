import os
from typing import List, Optional, Type, TypedDict
from openai import OpenAI as _OpenAI
from pydantic import BaseModel

from classes.p import P


class OpenAI:
    @staticmethod 
    def audio_transcribe(file_path: str):
        client = _OpenAI(api_key=os.getenv("OPENAI_API_KEY")) # Initialize OpenAI client   
        audio_file = open(file_path, "rb") # Open audio file using
        P(file_path)
        response = client.audio.transcriptions.create(
            model="gpt-4o-mini-transcribe",
            file=audio_file,
        )
        return response.text

    @staticmethod
    def chat(message: str):
        client = _OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        response = client.responses.create( # Create chat response
            model="gpt-5-nano", # Specify model
            input=message,
        )
        ai_message = response.output_text

        return ai_message

    @staticmethod
    def structured(prompt: str, model_cls: Type[BaseModel]) -> BaseModel:
        client = _OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        response = client.responses.parse( # Parse structured response
            model="gpt-5-nano", # Specify model
            input=[
                {"role": "system", "content": "Follow the schema exactly."}, # System prompt
                {"role": "user", "content": prompt},
            ],
            text_format=model_cls,
            text={"verbosity": "high"}, # Additional text formatting options
            # max_output_tokens=5000,
        )
        # print(response.output_parsed)
        parsed: Optional[BaseModel] = response.output_parsed # Get parsed output
        if parsed is None:
            raise ValueError("Failed to parse response") # Handle parsing failure
        return parsed
