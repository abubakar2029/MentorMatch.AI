# utils/vector_db.py
import chromadb
from utils.embeddings import get_embedding

client = chromadb.PersistentClient(path="./chroma_store")
collection = client.get_or_create_collection("mentors")

def add_to_vector_db(profile_id, text, embedding=None):
    if embedding is None:
        embedding = get_embedding(text)
    collection.add(
        documents=[text],
        embeddings=[embedding],
        ids=[str(int(profile_id))]
    )
    print(f"✅ Added profile {profile_id} to vector DB")

def query_similar_profiles(query_text, top_k=3):
    embedding = get_embedding(query_text)
    results = collection.query(
        query_embeddings=[embedding],
        n_results=top_k
    )
    return results
