from pathlib import Path
import os
from dotenv import load_dotenv
import pymongo
from mongoengine import connect

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-i)7q84%mf$6g&ic&)kpk0h^f*fmbc%2d$nq=72a(=0^hi^zqx7'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'mentore',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]



CORS_ALLOW_ALL_ORIGINS = True
ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# Load .env variables
load_dotenv()

MONGO_USER = os.getenv("MONGO_USER")
MONGO_PASS = os.getenv("MONGO_PASS")
MONGO_DB   = os.getenv("MONGO_DB")
print(f"MongoDB User: {MONGO_USER}, Database: {MONGO_DB}")
DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': MONGO_DB,
        'CLIENT': {
            'host': f"mongodb+srv://abubakarzafar2029:{MONGO_PASS}@cluster0.wkvfdg4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            'ssl': True
        }
    }
}
# Test MongoDB Atlas connection
try:
    # client = pymongo.MongoClient(
    #     f"mongodb+srv://{MONGO_USER}:{MONGO_PASS}@cluster0.wkvfdg4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    #     serverSelectionTimeoutMS=5000
    # )
    # client.server_info()  # Force connection to check if it's working
    connect(
    db="MentorMatchAI",
    username=MONGO_USER,
    password=MONGO_PASS,
    host="mongodb+srv://cluster0.wkvfdg4.mongodb.net/",
    # authentication_source='admin'  # or your auth DB
)
    print(f"✅ Connected to MongoDB Atlas database '{MONGO_DB}'")
except Exception as e:
    print(f"❌ MongoDB Atlas connection failed: {e}")


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# import os
# from dotenv import load_dotenv
# load_dotenv()

# MONGO_DB_NAME = "MentorMatchAI"  # Your local DB name

# from mongoengine import connect, get_connection

# try:
#     connect(
#         db=MONGO_DB_NAME,
#         host="localhost",
#         port=27017,  # Default MongoDB port
#         username=None,  # Or your MongoDB username if auth enabled
#         password=None   # Or your MongoDB password if auth enabled
#     )
#     conn = get_connection()
#     print(f"✅ Connected local MongoDB database '{MONGO_DB_NAME}'")
# except Exception as e:
#     print(f"❌ MongoDB connection failed: {e}")

# AUTH_USER_MODEL = 'mentore.CustomUser'
# AUTHENTICATION_BACKENDS = [
#     'django.contrib.auth.backends.ModelBackend',
# ]