# mentore/views.py
import os
from unittest import result
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
# from django.http import HttpResponse
# from .models import CustomUser, MentorProfile, MenteeProfile
# from utils.vector_db import add_to_vector_db, query_similar_profiles
# from utils.embeddings import get_embedding
from sentence_transformers import SentenceTransformer
from chromadb import PersistentClient
from .models import Mentee, Mentor
import json
from django.http import JsonResponse
from mongoengine.errors import NotUniqueError, ValidationError
from .models import Mentor,Mentee

# Ensure Chroma directory exists (vector_db also creates client, so this is just defensive)
CHROMA_DIR = "./chroma_store"
os.makedirs(CHROMA_DIR, exist_ok=True)

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Chroma client setup
chroma_client = PersistentClient(path=CHROMA_DIR)
collection = chroma_client.get_or_create_collection(name="mentors")
mentors_collection = chroma_client.get_or_create_collection(name="mentors")
mentees_collection = chroma_client.get_or_create_collection(name="mentees")

# @csrf_exempt
# def vector_form_view(request):
#     """
#     Create user profile, store in DB, generate vector from multiple fields, add to Chroma.
#     """
#     if request.method == 'POST':
#         full_name = request.POST.get('full_name', '').strip()
#         email = request.POST.get('email', '').strip()
#         user_type = request.POST.get('user_type', '').strip()  # 'mentor' or 'mentee'
#         skills_raw = request.POST.get('skills', '')  # comma-separated string
#         skills = [s.strip() for s in skills_raw.split(',') if s.strip()]
#         bio = request.POST.get('bio', '').strip()
#         job_role = request.POST.get('job_role', '').strip()
#         industry = request.POST.get('industry', '').strip()
#         # availability is a multi-select in the form
#         availability = request.POST.getlist('availability')  # list like ['Weekdays', 'Evenings']

#         # safe parse experience years
#         try:
#             experience_years = int(request.POST.get('experience_years', 0))
#         except (TypeError, ValueError):
#             experience_years = 0

#         if not full_name or not email or not user_type:
#             return HttpResponse("❌ Missing required fields.", status=400)

#         # Create base user (ensure your CustomUser model has these fields: full_name, email, user_type, bio, vector_embedding)
#         user = CustomUser.objects.create(
#             full_name=full_name,
#             email=email,
#             user_type=user_type,
#             bio=bio
#         )

#         # Create profile row and combined text for embedding
#         combined_parts = []

#         if user_type == 'mentor':
#             mentor = MentorProfile.objects.create(
#                 user=user,
#                 job_role=job_role,
#                 industry=industry,
#                 experience_years=experience_years,
#                 mentorship_topics=skills,
#                 bio=bio
#             )
#             combined_parts.extend([
#                 mentor.job_role,
#                 mentor.industry,
#                 f"{mentor.experience_years} years experience",
#                 " ".join(skills),
#                 " ".join(availability or []),
#                 bio or ""
#             ])

#         else:  # mentee
#             mentee = MenteeProfile.objects.create(
#                 user=user,
#                 current_role=job_role,
#                 industry_interest=industry,
#                 experience_years=experience_years,
#                 mentorship_goals=skills,
#                 bio=bio
#             )
#             combined_parts.extend([
#                 mentee.current_role,
#                 mentee.industry_interest,
#                 f"{mentee.experience_years} years experience",
#                 " ".join(skills),
#                 " ".join(availability or []),
#                 bio or ""
#             ])

#         # Build combined text (strip extras)
#         combined_text = " ".join([p for p in combined_parts if p]).strip()

#         # Generate embedding (single call to shared helper)
#         embedding = get_embedding(combined_text)

#         # Save embedding to user model and persist
#         user.vector_embedding = embedding
#         user.save(update_fields=["vector_embedding"])

#         # Add to Chroma vector DB via utils.vector_db
#         add_to_vector_db(user.id, combined_text, embedding)

#         return render(request, 'vector_result.html', {
#             'name': full_name,
#             'skills': skills,
#             'combined_text': combined_text,
#             'embedding': embedding
#         })

#     return render(request, 'vector_form.html')


# @csrf_exempt
# def vector_search_view(request):

@csrf_exempt
def search_mentor_profiles(request):
    """
    Search for similar mentor profiles based on mentee's provided details or a text query.
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Build a description string from request data (reuse your helper)
            temp_mentee = Mentee(
                fullName=data.get('fullName', ''),
                email=data.get('email', ''),
                password=data.get('password', ''),
                profilePhoto=data.get('profilePhoto'),
                age=int(data.get('age', 0)),
                gender=data.get('gender', ''),
                country=data.get('country', ''),
                currentRole=data.get('currentRole', ''),
                industryInterest=data.get('industryInterest', ''),
                experienceYears=int(data.get('experienceYears', 0)),
                mentorshipGoals=data.get('mentorshipGoals') or [],
                bio=data.get('bio', ''),
                availability=data.get('availability') or [],
                languages=data.get('languages') or [],
                linkedIn=data.get('linkedIn'),
                website=data.get('website')
            )

            description = build_mentee_profile_string(temp_mentee)

            # Encode mentee description
            query_embedding = model.encode(description).tolist()

            # Search in Chroma mentor collection
            search_results = mentors_collection.query(
                query_embeddings=[query_embedding],
                n_results=5,  # Top 5 results
                include=["embeddings", "distances", "metadatas", "documents"]
            )

            return JsonResponse({
                "status": "success",
                "query": description,
                "results": search_results
            }, status=200)

        except Exception as e:
            return JsonResponse({"status": "error", "message": f"Unexpected error: {str(e)}"}, status=500)

    return JsonResponse({"status": "error", "message": "Invalid request method"}, status=405)


@csrf_exempt
def search_mentee_profiles(request):
    """
    Search for similar mentee profiles based on mentor's provided details or a text query.
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Build a description string from request data (reuse your helper)
            temp_mentor = Mentor(
                fullName=data.get('fullName', ''),
                email=data.get('email', ''),
                password=data.get('password', ''),
                profilePhoto=data.get('profilePhoto'),
                age=int(data.get('age', 0)),
                gender=data.get('gender', ''),
                country=data.get('country', ''),
                jobRole=data.get('jobRole', ''),
                industry=data.get('industry', ''),
                experienceYears=int(data.get('experienceYears', 0)),
                mentorshipTopics=data.get('mentorshipTopics') or [],
                bio=data.get('bio', ''),
                availability=data.get('availability') or [],
                languages=data.get('languages') or [],
                linkedIn=data.get('linkedIn'),
                website=data.get('website')
            )

            description = build_mentor_profile_string(temp_mentor)

            # Encode mentor description
            query_embedding = model.encode(description).tolist()

            # Search in Chroma mentee collection
            search_results = mentees_collection.query(
                query_embeddings=[query_embedding],
                n_results=5,  # Top 5 results
                include=["embeddings", "distances", "metadatas", "documents"]
            )

            return JsonResponse({
                "status": "success",
                "query": description,
                "results": search_results
            }, status=200)

        except Exception as e:
            return JsonResponse({"status": "error", "message": f"Unexpected error: {str(e)}"}, status=500)

    return JsonResponse({"status": "error", "message": "Invalid request method"}, status=405)


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

            # Create description string from mentor profile
            description = build_mentor_profile_string(mentor)
            
            # ✅ Save bio embedding to Chroma
            # if data.get("bio"):
            embedding = model.encode(description).tolist()
            mentors_collection.add(
                # documents=[description],
                embeddings=[embedding],
                ids=[str(mentor.id)]
            )

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
            
            
            # Create description string for vector
            description = build_mentee_profile_string(mentee)

            # ✅ Save bio embedding to Chroma
            embedding = model.encode(description).tolist()
            mentees_collection.add(
                # documents=[description],
                embeddings=[embedding],
                ids=[str(mentee.id)]
            )
            result = mentees_collection.get(ids=[str(mentee.id)])
            print("From Chroma:", result)

            
            print(f"✅ Mentee profile saved successfully with ID: {mentee.id}")
            return JsonResponse({"status": "success", "id": str(mentee.id)}, status=201)

        except ValidationError as ve:
            return JsonResponse({"status": "error", "message": f"Validation error: {str(ve)}"}, status=400)

        except Exception as e:
            return JsonResponse({"status": "error", "message": f"Unexpected error: {str(e)}"}, status=500)

    return JsonResponse({"status": "error", "message": "Invalid request method"}, status=405)



def build_mentor_profile_string(profile):
    """
    Builds a consistent string from either:
    - Django MentorProfile + related CustomUser
    - Mongo Mentor Document
    """
    # Detect if it's Django ORM or MongoEngine object
    is_django = hasattr(profile, "_meta")  # Django models have _meta attribute

    job_role = getattr(profile, "jobRole", "N/A")
    industry = getattr(profile, "industry", "N/A")
    experience_years = getattr(profile, "experienceYears", "N/A")
    mentorship_topics = getattr(profile, "mentorshipTopics", [])
    bio = getattr(profile, "bio", "No bio provided.")
    availability = getattr(profile, "availability", [])
    languages = getattr(profile, "languages", [])
    country = getattr(profile, "country", None) or getattr(profile, "user", None) and getattr(profile.user, "country", "N/A")

    return f"""
    Job Role: {job_role}
    Industry: {industry}
    Experience: {experience_years} years
    Mentorship Topics: {", ".join(mentorship_topics or ["N/A"])}
    Country: {country or "N/A"}
    Bio: {bio or "No bio provided."}
    Availability: {", ".join(availability or ["Not specified"])}
    Languages: {", ".join(languages or ["Not specified"])}
    """.strip()


def build_mentee_profile_string(profile):
    """
    Builds a consistent string from either:
    - Django MenteeProfile + related CustomUser
    - Mongo Mentee Document
    """
    # is_django = hasattr(profile, "_meta")

    current_role = getattr(profile, "currentRole", "N/A")
    industry_interest = getattr(profile, "industryInterest", "N/A")
    experience_years = getattr(profile, "experienceYears", "N/A")
    mentorship_goals = getattr(profile, "mentorshipGoals", [])
    bio = getattr(profile, "bio", "No bio provided.")
    availability = getattr(profile, "availability", [])
    languages = getattr(profile, "languages", [])
    country = getattr(profile, "country", None) or getattr(profile, "user", None) and getattr(profile.user, "country", "N/A")

    return f"""
    Current Role: {current_role}
    Industry Interest: {industry_interest}
    Experience: {experience_years} years
    Mentorship Goals: {", ".join(mentorship_goals or ["N/A"])}
    Country: {country or "N/A"}
    Bio: {bio or "No bio provided."}
    Availability: {", ".join(availability or ["Not specified"])}
    Languages: {", ".join(languages or ["Not specified"])}
    """.strip()
