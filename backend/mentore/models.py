from django.db import models

from mongoengine import Document, StringField, IntField, ListField, EmailField, URLField

class Mentee(Document):
    fullName = StringField(required=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    profilePhoto = URLField()  # Link to profile image
    age = IntField(min_value=0)
    gender = StringField(choices=["Male", "Female", "Other"])
    country = StringField()

    currentRole = StringField()         # e.g., "Student", "Junior Developer"
    industryInterest = StringField()    # Industry they want mentorship in
    experienceYears = IntField(min_value=0)
    mentorshipGoals = ListField(StringField())  # e.g., ["Interview Prep", "Web Development"]
    bio = StringField(max_length=1000)
    availability = ListField(StringField())     # e.g., ["Weekdays", "Weekends", "Evenings"]

    languages = ListField(StringField())
    linkedIn = URLField()
    website = URLField()

    meta = {
        'collection': 'mentee'  # Name of the MongoDB collection
    }

class Mentor(Document):
    fullName = StringField(required=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    profilePhoto = URLField()  # Optional - URL after upload
    age = IntField(min_value=0)  # Optional
    gender = StringField(choices=["Male", "Female", "Other", "Prefer not to say"])
    country = StringField()

    jobRole = StringField()             # e.g., "Software Engineer"
    industry = StringField()            # e.g., "IT", "Healthcare"
    experienceYears = IntField(min_value=0)  # e.g., 5
    mentorshipTopics = ListField(StringField())  # e.g., ["Machine Learning", "Career Guidance"]
    bio = StringField(max_length=500)   # Short intro
    availability = ListField(StringField())  # e.g., ["Weekdays", "Weekends", "Evenings"]

    languages = ListField(StringField())  # Optional
    linkedIn = URLField()  # Optional
    website = URLField()   # Optional

    meta = {
        'collection': 'mentor'
    }
