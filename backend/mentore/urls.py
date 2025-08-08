from django.urls import path
from .views import vector_form_view, vector_search_view, home_view

urlpatterns = [
    path('', home_view, name='home'),
    path('register/', vector_form_view, name='vector-form'),
    path('search/', vector_search_view, name='vector-search'),
    path('api/mentor/register/', save_mentor_profile, name='save_profile'),
    path('api/mentee/register/', save_mentee_profile, name='save_profile'),
]