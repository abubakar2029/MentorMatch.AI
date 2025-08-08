from django.contrib import admin
from .models import CustomUser, MentorProfile, MenteeProfile

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'full_name', 'user_type', 'is_staff')
    search_fields = ('email', 'full_name')
    ordering = ('email',)

@admin.register(MentorProfile)
class MentorProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'job_role', 'industry', 'hourly_rate', 'rating')
    list_filter = ('industry',)
    search_fields = ('user__email', 'user__full_name')

@admin.register(MenteeProfile)
class MenteeProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'current_role', 'industry_interest', 'education_level')
    list_filter = ('industry_interest',)
    search_fields = ('user__email', 'user__full_name')