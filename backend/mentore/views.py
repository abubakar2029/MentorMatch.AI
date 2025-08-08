import os
import uuid
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from sentence_transformers import SentenceTransformer
from chromadb import PersistentClient
from .models import Mentee, Mentor
import json
from django.http import JsonResponse
from mongoengine.errors import NotUniqueError, ValidationError

# Ensure Chroma directory exists
CHROMA_DIR = "./chroma_store"
os.makedirs(CHROMA_DIR, exist_ok=True)

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Chroma client setup
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


@csrf_exempt
def save_mentor_profile(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # ✅ Pre-check for unique email
            if Mentor.objects(email=data.get("email")).first():
                return JsonResponse({
                    "status": "error",
                    "message": "This email is already registered."
                }, status=400)

            mentor = Mentor(
                fullName=data.get("fullName"),
                email=data.get("email"),
                password=data.get("password"),
                profilePhoto=data.get("profilePhoto"),
                age=int(data.get('age', 0)),
                gender=data.get("gender"),
                country=data.get("country"),
                jobRole=data.get("jobRole"),
                industry=data.get("industry"),
                experienceYears=int(data.get('experienceYears', 0)),
                mentorshipTopics=data.get("mentorshipTopics") or [],
                bio=data.get("bio"),
                availability=data.get("availability") or [],
                languages=data.get("languages") or [],
                linkedIn=data.get("linkedIn"),
                website=data.get("website"),
            )

            mentor.save()

            # ✅ Save bio embedding to Chroma
            # if data.get("bio"):
            #     embedding = model.encode(data.get("bio")).tolist()
            #     collection.add(
            #         documents=[data.get("bio")],
            #         embeddings=[embedding],
            #         ids=[str(mentor.id)]
            #     )

            return JsonResponse({"status": "success", "id": str(mentor.id)}, status=201)

        except ValidationError as ve:
            return JsonResponse({"status": "error", "message": f"Validation error: {str(ve)}"}, status=400)

        except Exception as e:
            return JsonResponse({"status": "error", "message": f"Unexpected error: {str(e)}"}, status=500)

    return JsonResponse({"status": "error", "message": "Invalid request method"}, status=405)


@csrf_exempt
def save_mentee_profile(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # ✅ Pre-check for unique email
            if Mentee.objects(email=data.get("email")).first():
                return JsonResponse({
                    "status": "error",
                    "message": "This email is already registered."
                }, status=400)

            mentee = Mentee(
                fullName=data.get('fullName'),
                email=data.get('email'),
                password=data.get('password'),
                profilePhoto=data.get('profilePhoto'),
                age=int(data.get('age', 0)),
                gender=data.get('gender'),
                country=data.get('country'),
                currentRole=data.get('currentRole'),
                industryInterest=data.get('industryInterest'),
                experienceYears=int(data.get('experienceYears', 0)),
                mentorshipGoals=data.get('mentorshipGoals') or [],
                bio=data.get('bio'),
                availability=data.get('availability') or [],
                languages=data.get('languages') or [],
                linkedIn=data.get('linkedIn'),
                website=data.get('website')
            )

            mentee.save()

            # ✅ Save bio embedding to Chroma
            # if data.get("bio"):
            #     embedding = model.encode(data.get("bio")).tolist()
            #     collection.add(
            #         documents=[data.get("bio")],
            #         embeddings=[embedding],
            #         ids=[str(mentee.id)]
            #     )
            print(f"✅ Mentee profile saved successfully with ID: {mentee.id}")
            return JsonResponse({"status": "success", "id": str(mentee.id)}, status=201)

        except ValidationError as ve:
            return JsonResponse({"status": "error", "message": f"Validation error: {str(ve)}"}, status=400)

        except Exception as e:
            return JsonResponse({"status": "error", "message": f"Unexpected error: {str(e)}"}, status=500)

    return JsonResponse({"status": "error", "message": "Invalid request method"}, status=405)
