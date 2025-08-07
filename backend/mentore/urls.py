from django.urls import path
from .views import vector_form_view

urlpatterns = [
    path('register/', vector_form_view, name='vector-form'),
]
