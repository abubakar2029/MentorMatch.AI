from django.urls import path
from .views import vector_form_view, save_mentee_profile,save_mentor_profile

# urlpatterns = [
#     path('register/', vector_form_view, name='vector-form'),
# ]

urlpatterns = [
    path('register/', vector_form_view, name='vector-form'),
    path('api/mentor/register/', save_mentor_profile, name='save_profile'),
    path('api/mentee/register/', save_mentee_profile, name='save_profile'),
]