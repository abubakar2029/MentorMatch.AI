# utils/vector_db.py

import chromadb
from chromadb.config import Settings

# ✅ Use the new PersistentClient
client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection("profiles")

def add_to_vector_db(profile_id, text, embedding):
    collection.add(
        documents=[text],
        embeddings=[embedding],
        ids=[str(profile_id)]
    )
    print("✅ Added to vector DB")

def query_similar_profiles(query_text, top_k=3):
    from utils.embeddings import get_embedding
    embedding = get_embedding(query_text)
    results = collection.query(
        query_embeddings=[embedding],
        n_results=top_k
    )
    return results
