import os
import uuid
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from sentence_transformers import SentenceTransformer
from chromadb import PersistentClient  # ✅ New Chroma import

# Ensure Chroma directory exists
CHROMA_DIR = "./chroma_store"
os.makedirs(CHROMA_DIR, exist_ok=True)

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# ✅ New Chroma client setup (replaces deprecated Settings + Client)
chroma_client = PersistentClient(path=CHROMA_DIR)
collection = chroma_client.get_or_create_collection(name="mentors")

@csrf_exempt
def vector_form_view(request):
    if request.method == 'POST':
        bio = request.POST.get('bio')
        if not bio:
            return HttpResponse("❌ Bio is required.", status=400)

        embedding = model.encode(bio).tolist()
        collection.add(
            documents=[bio],
            embeddings=[embedding],
            ids=[str(uuid.uuid4())]
        )
        return render(request, 'vector_result.html', {'bio': bio, 'embedding': embedding})

    return render(request, 'vector_form.html')
