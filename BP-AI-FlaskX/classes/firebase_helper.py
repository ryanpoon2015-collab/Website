from datetime import datetime, timezone # Import timezone for UTC
from google.protobuf.timestamp_pb2 import Timestamp # Import Timestamp for Firestore compatibility
from time import time
import uuid
from typing import Type, TypeVar, Union
from firebase_admin import credentials, storage, initialize_app, firestore # Import Firebase modules
from pydantic import BaseModel # Import BaseModel for data validation

T = TypeVar("T")


class Firebase:
    def __init__(
        self,
        credentials_filepath: str,
        use_storage=False,
        use_firestore=False,
        storage_bucket="",
    ):
        self.cred = credentials.Certificate(credentials_filepath) # Load Firebase credentials
        initialize_app(
            self.cred,
            {"storageBucket": storage_bucket} if use_storage else None,
        )
        self.db = firestore.client() if use_firestore else None # Initialize Firestore client

    #! STORAGE
    def upload_storage(
        self, file_path: str, destination_blob_name: str, make_public=True
    ): # Upload file to Firebase Storage
        bucket = storage.bucket() # Get storage bucket
        blob = bucket.blob(destination_blob_name) # Create blob object
        blob.upload_from_filename(file_path)
        if make_public:
            blob.make_public()

        return blob.public_url

    #! FIRESTORE
    def read_firestore(self, doc_path: str, data_type: Type[T]) -> T: # Read document from Firestore
        if self.db is None:
            raise ValueError("Firestore is not initialized.") # Check Firestore initialization

        doc_ref = self.db.document(doc_path)
        data = doc_ref.get().to_dict()

        if data is None:
            return None

        return data_type(**data)

    def write_firestore(self, doc_path: str, data: Union[BaseModel, dict]): # Write document to Firestore
        if self.db is None:
            raise ValueError("Firestore is not initialized.") # Check Firestore initialization

        doc_ref = self.db.document(doc_path) # Get document reference
        if isinstance(data, BaseModel):
            doc_ref.set(data.model_dump(exclude_unset=True)) # Convert BaseModel to dict and set
        else:
            doc_ref.set(data)

    def update_firestore(self, doc_path: str, data: Union[BaseModel, dict]): # Update document in Firestore
        if self.db is None:
            raise ValueError("Firestore is not initialized.") # Check Firestore initialization

        doc_ref = self.db.document(doc_path)
        if isinstance(data, BaseModel):
            doc_ref.update(data.model_dump(exclude_unset=True)) # Convert BaseModel to dict and update
        else:
            doc_ref.update(data)

    def exists_firestore(self, doc_path: str) -> bool:
        if self.db is None:
            raise ValueError("Firestore is not initialized.") # Check Firestore initialization

        doc_ref = self.db.document(doc_path)
        return doc_ref.get().exists

    #! SERVER TIMESTAMP
    def timestamp(self):
        return datetime.now(timezone.utc) # Return current UTC timestamp

    #! UUID
    def uuid(self) -> str:
        return uuid.uuid4().hex
