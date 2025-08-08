from django.urls import path
from .views import home_view, save_mentee_profile, save_mentor_profile, search_mentor_profiles, search_mentee_profiles

urlpatterns = [
    path('', home_view, name='home'),
    # path('register/', vector_form_view, name='vector-form'),
    # path('search/', vector_search_view, name='vector-search'),
    path('api/mentor/register/', save_mentor_profile, name='save_profile'),
    path('api/mentee/register/', save_mentee_profile, name='save_profile'),
    path('api/searchMentor/', search_mentor_profiles, name='search_mentor_profiles'),
    path('api/searchMentee/', search_mentee_profiles, name='search_mentee_profiles'),
]