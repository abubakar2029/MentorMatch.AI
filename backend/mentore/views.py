# mentore/views.py
import os
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from .models import CustomUser, MentorProfile, MenteeProfile
from utils.vector_db import add_to_vector_db, query_similar_profiles
from utils.embeddings import get_embedding
from sentence_transformers import SentenceTransformer
from chromadb import PersistentClient
from .models import Mentee, Mentor
import json
from django.http import JsonResponse
from mongoengine.errors import NotUniqueError, ValidationError

# Ensure Chroma directory exists (vector_db also creates client, so this is just defensive)
CHROMA_DIR = "./chroma_store"
os.makedirs(CHROMA_DIR, exist_ok=True)

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Chroma client setup
chroma_client = PersistentClient(path=CHROMA_DIR)
collection = chroma_client.get_or_create_collection(name="mentors")


@csrf_exempt
def vector_form_view(request):
    """
    Create user profile, store in DB, generate vector from multiple fields, add to Chroma.
    """
    if request.method == 'POST':
        full_name = request.POST.get('full_name', '').strip()
        email = request.POST.get('email', '').strip()
        user_type = request.POST.get('user_type', '').strip()  # 'mentor' or 'mentee'
        skills_raw = request.POST.get('skills', '')  # comma-separated string
        skills = [s.strip() for s in skills_raw.split(',') if s.strip()]
        bio = request.POST.get('bio', '').strip()
        job_role = request.POST.get('job_role', '').strip()
        industry = request.POST.get('industry', '').strip()
        # availability is a multi-select in the form
        availability = request.POST.getlist('availability')  # list like ['Weekdays', 'Evenings']

        # safe parse experience years
        try:
            experience_years = int(request.POST.get('experience_years', 0))
        except (TypeError, ValueError):
            experience_years = 0

        if not full_name or not email or not user_type:
            return HttpResponse("❌ Missing required fields.", status=400)

        # Create base user (ensure your CustomUser model has these fields: full_name, email, user_type, bio, vector_embedding)
        user = CustomUser.objects.create(
            full_name=full_name,
            email=email,
            user_type=user_type,
            bio=bio
        )

        # Create profile row and combined text for embedding
        combined_parts = []

        if user_type == 'mentor':
            mentor = MentorProfile.objects.create(
                user=user,
                job_role=job_role,
                industry=industry,
                experience_years=experience_years,
                mentorship_topics=skills,
                bio=bio
            )
            combined_parts.extend([
                mentor.job_role,
                mentor.industry,
                f"{mentor.experience_years} years experience",
                " ".join(skills),
                " ".join(availability or []),
                bio or ""
            ])

        else:  # mentee
            mentee = MenteeProfile.objects.create(
                user=user,
                current_role=job_role,
                industry_interest=industry,
                experience_years=experience_years,
                mentorship_goals=skills,
                bio=bio
            )
            combined_parts.extend([
                mentee.current_role,
                mentee.industry_interest,
                f"{mentee.experience_years} years experience",
                " ".join(skills),
                " ".join(availability or []),
                bio or ""
            ])

        # Build combined text (strip extras)
        combined_text = " ".join([p for p in combined_parts if p]).strip()

        # Generate embedding (single call to shared helper)
        embedding = get_embedding(combined_text)

        # Save embedding to user model and persist
        user.vector_embedding = embedding
        user.save(update_fields=["vector_embedding"])

        # Add to Chroma vector DB via utils.vector_db
        add_to_vector_db(user.id, combined_text, embedding)

        return render(request, 'vector_result.html', {
            'name': full_name,
            'skills': skills,
            'combined_text': combined_text,
            'embedding': embedding
        })

    return render(request, 'vector_form.html')


@csrf_exempt
def vector_search_view(request):
    """
    Search similar profiles by multi-field query (skills + role + industry + bio + availability).
    Returns enriched results (user info + distance + document snippet).
    """
    if request.method == 'POST':
        query = request.POST.get('query', '').strip()
        if not query:
            return HttpResponse("❌ Query is required.", status=400)

        # raw chroma result (dict)
        raw = query_similar_profiles(query, top_k=5)

        # raw typically has keys like 'ids', 'distances', 'documents'
        # Each is a list-of-lists (one per query). We asked only one query so take [0].
        ids = raw.get("ids", [[]])[0] if isinstance(raw.get("ids"), list) else []
        distances = raw.get("distances", [[]])[0] if isinstance(raw.get("distances"), list) else []
        docs = raw.get("documents", [[]])[0] if isinstance(raw.get("documents"), list) else []

        matches = []
        for i, uid in enumerate(ids):
            try:
                # ids are stored as strings; convert to int if your PKs are ints
                try:
                    lookup_id = int(uid)
                except Exception:
                    lookup_id = uid
                user = CustomUser.objects.get(id=lookup_id)
                matches.append({
                    "id": lookup_id,
                    "name": getattr(user, "full_name", str(user)),
                    "email": getattr(user, "email", ""),
                    "role": getattr(user, "user_type", ""),
                    "bio": getattr(user, "bio", ""),
                    "distance": distances[i] if i < len(distances) else None,
                    "doc": docs[i] if i < len(docs) else None,
                })
            except CustomUser.DoesNotExist:
                # skip if user record not found
                continue

        return render(request, 'vector_search_results.html', {
            'query': query,
            'results': matches
        })

    return render(request, 'vector_search.html')


def home_view(request):
    return render(request, 'home.html')


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
