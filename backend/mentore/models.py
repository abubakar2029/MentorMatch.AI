from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    USER_TYPE_CHOICES = [
        ("mentor", "Mentor"),
        ("mentee", "Mentee"),
    ]

    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other"),
        ("Prefer not to say", "Prefer not to say"),
    ]

    # Core fields
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=150)
    password = models.CharField(max_length=128)  # Added from Mongo schema
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    
    # Profile details
    profile_photo = models.URLField(blank=True, null=True)
    age = models.PositiveIntegerField(
        blank=True, 
        null=True, 
        validators=[MinValueValidator(1), MaxValueValidator(120)]
    )
    gender = models.CharField(
        max_length=30, 
        blank=True, 
        null=True,
        choices=GENDER_CHOICES
    )
    country = models.CharField(max_length=100)
    
    # Common fields for both mentor and mentee
    availability = models.JSONField(
        blank=True, 
        null=True,
        help_text="List of available times e.g. ['Weekdays', 'Weekends']"
    )
    languages = models.JSONField(
        blank=True, 
        null=True,
        help_text="List of languages spoken e.g. ['English', 'Spanish']"
    )
    linked_in = models.URLField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    bio = models.TextField(
        blank=True, 
        null=True, 
        max_length=1000,
        help_text="Maximum 1000 characters"
    )
    
    # Authentication and technical fields
    vector_embedding = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name", "user_type"]

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.full_name} ({self.user_type})"

class MentorProfile(models.Model):
    user = models.OneToOneField(
        CustomUser, 
        on_delete=models.CASCADE, 
        related_name="mentor_profile"
    )
    job_role = models.CharField(max_length=100)
    industry = models.CharField(max_length=100)
    experience_years = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    mentorship_topics = models.JSONField(
        blank=True, 
        null=True,
        help_text="List of topics e.g. ['Machine Learning', 'Career Guidance']"
    )
    
    # Additional fields from Mongo schema
    education = models.JSONField(blank=True, null=True)  # Could store list of degrees
    certifications = models.JSONField(blank=True, null=True)  # List of certifications
    hourly_rate = models.DecimalField(
        max_digits=6, 
        decimal_places=2, 
        blank=True, 
        null=True
    )
    rating = models.FloatField(
        blank=True, 
        null=True,
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )

    def __str__(self):
        return f"Mentor: {self.user.full_name}"

class MenteeProfile(models.Model):
    user = models.OneToOneField(
        CustomUser, 
        on_delete=models.CASCADE, 
        related_name="mentee_profile"
    )
    current_role = models.CharField(max_length=100)
    industry_interest = models.CharField(max_length=100)
    experience_years = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    mentorship_goals = models.JSONField(
        blank=True, 
        null=True,
        help_text="List of goals e.g. ['Interview Prep', 'Web Development']"
    )
    
    # Additional fields from Mongo schema
    education_level = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )
    learning_preferences = models.JSONField(blank=True, null=True)
    budget = models.DecimalField(
        max_digits=6, 
        decimal_places=2, 
        blank=True, 
        null=True,
        help_text="Maximum budget for mentorship"
    )

    def __str__(self):
        return f"Mentee: {self.user.full_name}"