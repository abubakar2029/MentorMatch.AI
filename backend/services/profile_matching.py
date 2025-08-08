# services/profile_matching.py
from utils.vector_db import add_to_vector_db, query_similar_profiles

def index_profile(profile):
    # Merge multiple attributes into one searchable text
    profile_text = f"""
    Name: {profile.name}
    Field: {profile.field}
    Skills: {', '.join(profile.skills)}
    Experience: {profile.experience} years
    Bio: {profile.bio}
    """
    add_to_vector_db(profile.id, profile_text)

def find_matches(field=None, skills=None, experience=None, bio=None, top_k=3):
    # Build a search query from given filters
    query_parts = []
    if field:
        query_parts.append(f"Field: {field}")
    if skills:
        query_parts.append(f"Skills: {', '.join(skills)}")
    if experience:
        query_parts.append(f"Experience: {experience} years")
    if bio:
        query_parts.append(f"Bio: {bio}")

    query_text = " ".join(query_parts)
    return query_similar_profiles(query_text, top_k=top_k)
