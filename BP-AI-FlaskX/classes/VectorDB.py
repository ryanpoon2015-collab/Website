import faiss
import numpy as np
import os
import json
from classes.OpenAI import OpenAI

class VectorDB:
    def __init__(self, index_path="faiss_index.bin", meta_path="faiss_meta.json"):
        self.index_path = index_path
        self.meta_path = meta_path
        self.dimension = 1536  # Default dimension for text-embedding-3-small
        
        if os.path.exists(index_path) and os.path.exists(meta_path):
            self.index = faiss.read_index(index_path)
            with open(meta_path, "r") as f:
                self.metadata = json.load(f)
        else:
            self.index = faiss.IndexFlatL2(self.dimension)
            self.metadata = []

    def add_document(self, text, metadata=None):
        embedding = OpenAI.get_embedding(text)
        vector = np.array([embedding]).astype('float32')
        self.index.add(vector)
        self.metadata.append({"text": text, "info": metadata or {}})
        self.save()

    def search(self, query, k=3):
        if self.index.ntotal == 0:
            return []
            
        query_embedding = OpenAI.get_embedding(query)
        query_vector = np.array([query_embedding]).astype('float32')
        distances, indices = self.index.search(query_vector, k)
        
        results = []
        for i in range(len(indices[0])):
            idx = indices[0][i]
            if idx != -1 and idx < len(self.metadata):
                results.append(self.metadata[idx])
        return results

    def save(self):
        faiss.write_index(self.index, self.index_path)
        with open(self.meta_path, "w") as f:
            json.dump(self.metadata, f)
