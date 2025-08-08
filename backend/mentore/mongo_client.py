from pymongo import MongoClient
from django.conf import settings

# Connect to MongoDB Atlas
client = MongoClient(settings.MONGO_URI)
db = client[settings.MONGO_DB_NAME]
# collection = db[settings.MONGO_COLLECTION]

# def insert_profile(profile_data):
#     """Insert a profile document into MongoDB Atlas"""
#     result = collection.insert_one(profile_data)
#     return str(result.inserted_id)
