# MentorMatch.AI - Technologies, Frameworks, and Tools

## Overview
MentorMatch.AI is a full-stack web application that leverages AI/ML technologies to match mentors with mentees. The application uses a modern tech stack with separate frontend and backend architectures.

---

## 🎨 Frontend Technologies

### Core Framework & Build Tools
- **React 18.3.1** - Modern JavaScript library for building user interfaces
- **TypeScript 5.8.3** - Typed superset of JavaScript for enhanced code quality and developer experience
- **Vite 5.4.19** - Next-generation frontend build tool offering fast development and optimized production builds
- **@vitejs/plugin-react-swc** - Uses SWC (Speedy Web Compiler) for faster React Fast Refresh

### UI Framework & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework for rapid UI development
- **PostCSS 8.5.6** - Tool for transforming CSS with JavaScript plugins
- **Autoprefixer 10.4.21** - Automatically adds vendor prefixes to CSS rules
- **tailwindcss-animate** - Animation utilities for Tailwind CSS
- **@tailwindcss/typography** - Beautiful typographic defaults for prose content

### Component Library
- **shadcn/ui** - Collection of re-usable components built with Radix UI and Tailwind CSS
  - Extensive Radix UI components including:
    - Accordion, Alert Dialog, Aspect Ratio, Avatar
    - Checkbox, Collapsible, Context Menu, Dialog
    - Dropdown Menu, Hover Card, Label, Menubar
    - Navigation Menu, Popover, Progress, Radio Group
    - Scroll Area, Select, Separator, Slider
    - Switch, Tabs, Toast, Toggle, Tooltip
  - **class-variance-authority (CVA)** - For creating variant-based component APIs
  - **clsx & tailwind-merge** - Utility functions for constructing className strings

### State Management & Data Fetching
- **@tanstack/react-query 5.83.0** - Powerful data synchronization library for React
- **Axios 1.11.0** - Promise-based HTTP client for API requests

### Routing & Navigation
- **React Router DOM 6.30.1** - Declarative routing for React applications

### Forms & Validation
- **React Hook Form 7.61.1** - Performant, flexible forms with easy validation
- **@hookform/resolvers 3.10.0** - Validation resolvers for React Hook Form
- **Zod 3.25.76** - TypeScript-first schema validation library

### UI Enhancements
- **Lucide React 0.462.0** - Beautiful & consistent icon pack
- **next-themes 0.3.0** - Theme management (dark mode support)
- **react-toastify 11.0.5** - Toast notifications
- **sonner 1.7.4** - An opinionated toast component
- **cmdk 1.1.1** - Command menu component
- **input-otp 1.4.2** - OTP input component
- **vaul 0.9.9** - Drawer component
- **embla-carousel-react 8.6.0** - Carousel/slider component
- **react-resizable-panels 2.1.9** - Resizable panel layouts

### Data Visualization
- **Recharts 2.15.4** - Composable charting library built on React components

### Date Handling
- **date-fns 3.6.0** - Modern JavaScript date utility library
- **react-day-picker 8.10.1** - Date picker component

### Code Quality & Linting
- **ESLint 9.32.0** - JavaScript/TypeScript linter
- **@eslint/js** - ESLint JavaScript rules
- **typescript-eslint 8.38.0** - TypeScript support for ESLint
- **eslint-plugin-react-hooks** - ESLint rules for React Hooks
- **eslint-plugin-react-refresh** - ESLint plugin for React Fast Refresh

### Development Tools
- **lovable-tagger 1.1.8** - Component tagging for development
- **Bun** - Fast JavaScript runtime and package manager (evidenced by bun.lockb)

---

## 🔧 Backend Technologies

### Core Framework
- **Django 5.2.5** - High-level Python web framework
  - django.contrib.admin - Admin interface
  - django.contrib.auth - Authentication system
  - django.contrib.contenttypes - Content types framework
  - django.contrib.sessions - Session management
  - django.contrib.messages - Messaging framework
  - django.contrib.staticfiles - Static file management

### Database & ORM
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **MongoEngine** - Object-Document Mapper (ODM) for MongoDB
- **PyMongo** - Python driver for MongoDB
- **Djongo** - Django adapter for MongoDB (allows using Django ORM with MongoDB)
- **psycopg2-binary 2.9.10** - PostgreSQL adapter (possibly for future use)

### Web Server
- **Uvicorn 0.35.0** - ASGI server implementation
- **httptools 0.6.4** - Fast HTTP parser
- **websockets 15.0.1** - WebSocket implementation
- **watchfiles 1.1.0** - File watching for auto-reload

### API & CORS
- **django-cors-headers (corsheaders)** - Handles Cross-Origin Resource Sharing (CORS)

### Environment & Configuration
- **python-dotenv 1.1.1** - Reads key-value pairs from .env files

---

## 🤖 AI/ML Stack

### Vector Database
- **ChromaDB 1.0.15** - Open-source embedding database for vector similarity search
  - Used for storing and querying mentor/mentee profile embeddings
  - Enables semantic matching between profiles

### Natural Language Processing
- **Sentence Transformers 5.1.0** - Framework for state-of-the-art sentence, text and image embeddings
  - Model used: **'all-MiniLM-L6-v2'** - Efficient sentence embedding model
  - Converts profile text into vector embeddings for similarity matching

### Deep Learning Framework
- **PyTorch 2.8.0** - Deep learning framework (required by sentence-transformers)
- **Transformers 4.55.0** - Hugging Face transformers library for NLP models
- **Tokenizers 0.21.4** - Fast tokenizers for NLP

### ML Libraries & Tools
- **scikit-learn 1.7.1** - Machine learning library
  - Classification, regression, clustering algorithms
  - Model evaluation and preprocessing tools
- **NumPy 2.3.2** - Fundamental package for numerical computing
- **SciPy 1.16.1** - Scientific computing library
- **Hugging Face Hub 0.34.3** - Client library for interacting with Hugging Face Hub

### ML Infrastructure
- **ONNX Runtime 1.22.1** - High-performance inference engine
- **safetensors 0.6.1** - Safe tensor serialization format
- **joblib 1.5.1** - Lightweight pipelining and caching

### Supporting Libraries
- **tqdm 4.67.1** - Progress bars for Python
- **tensorboard (via dependencies)** - Visualization toolkit for ML experiments
- **regex 2025.7.34** - Enhanced regular expressions
- **fsspec 2025.7.0** - Filesystem abstraction
- **filelock 3.18.0** - Platform-independent file locking

---

## 📊 Data Processing & Utilities

### Data Manipulation
- **pandas (via dependencies)** - Data manipulation and analysis
- **threadpoolctl 3.6.0** - Thread pool control for numerical libraries

### Serialization & Validation
- **Pydantic 2.11.7** - Data validation using Python type hints
- **pydantic_core 2.33.2** - Core functionality for Pydantic
- **orjson 3.11.1** - Fast JSON library
- **jsonschema 4.25.0** - JSON Schema validation

### Image Processing
- **Pillow 11.3.0** - Python Imaging Library for image manipulation

### Date & Time
- **python-dateutil 2.9.0.post0** - Extensions to the standard datetime module
- **tzdata 2025.2** - Timezone database

---

## 🔍 Monitoring & Observability

### OpenTelemetry
- **opentelemetry-api 1.36.0** - OpenTelemetry API
- **opentelemetry-sdk 1.36.0** - OpenTelemetry SDK
- **opentelemetry-exporter-otlp-proto-grpc 1.36.0** - OTLP exporter for gRPC
- **opentelemetry-exporter-otlp-proto-common 1.36.0** - Common OTLP protocols
- **opentelemetry-proto 1.36.0** - OpenTelemetry protocol definitions
- **opentelemetry-semantic-conventions 0.57b0** - Semantic conventions

### Analytics & Logging
- **PostHog 5.4.0** - Product analytics platform
- **coloredlogs 15.0.1** - Colored terminal output for Python's logging module
- **humanfriendly 10.0** - Human-friendly input/output

### CLI & Terminal
- **rich 14.1.0** - Rich text and formatting in the terminal
- **click 8.2.1** - Command-line interface creation kit
- **Typer 0.16.0** - Modern CLI framework based on type hints
- **shellingham 1.5.4** - Tool to detect the current shell

---

## 🔐 Security & Authentication

### Authentication
- **bcrypt 4.3.0** - Password hashing library
- **oauthlib 3.3.1** - OAuth request-signing logic
- **requests-oauthlib 2.0.0** - OAuth support for Requests

### Google Authentication
- **google-auth 2.40.3** - Google authentication library
- **pyasn1 0.6.1** - ASN.1 types and codecs
- **pyasn1_modules 0.4.2** - Collection of ASN.1 modules
- **rsa 4.9.1** - RSA cryptography

---

## 🌐 HTTP & Networking

### HTTP Clients & Servers
- **httpx 0.28.1** - Modern HTTP client
- **httpcore 1.0.9** - HTTP/1.1 and HTTP/2 support
- **h11 0.16.0** - HTTP/1.1 protocol implementation
- **Requests 2.32.4** - HTTP library for Python
- **urllib3 2.5.0** - HTTP client for Python

### Network Protocols
- **grpcio 1.74.0** - gRPC framework
- **websocket-client 1.8.0** - WebSocket client library
- **googleapis-common-protos 1.70.0** - Common protobufs used in Google APIs

---

## 📦 Build & Dependency Management

### Python
- **build 1.3.0** - Python package builder
- **pyproject_hooks 1.2.0** - Build backend hooks
- **packaging 25.0** - Core utilities for Python packages
- **setuptools (via dependencies)** - Build system

### JavaScript/TypeScript
- **npm** - Node Package Manager
- **Bun** - Alternative JavaScript runtime and package manager

---

## 🗄️ Data Storage & Caching

### Vector Storage
- **mmh3 5.2.0** - MurmurHash3 (used by ChromaDB for hashing)
- **pybase64 1.4.2** - Fast base64 encoding/decoding

### Caching
- **cachetools 5.5.2** - Extensible memoizing collections and decorators

---

## 🔄 Kubernetes & Cloud
- **kubernetes 33.1.0** - Official Python client for Kubernetes API
  - Suggests potential deployment to Kubernetes clusters

---

## 📝 Template & Markup
- **Jinja2 3.1.6** - Template engine for Python
- **MarkupSafe 3.0.2** - Safe string handling for Jinja2
- **markdown-it-py 3.0.0** - Markdown parser
- **mdurl 0.1.2** - URL utilities for markdown-it
- **Pygments 2.19.2** - Syntax highlighting

---

## 🧪 Testing & Query Tools
- **PyYAML 6.0.2** - YAML parser and emitter
- **PyPika 0.48.9** - SQL query builder
- **sqlparse 0.5.3** - SQL parser

---

## 🎯 Additional Utilities

### Retry & Resilience
- **backoff 2.2.1** - Function decoration for backoff and retry
- **tenacity 9.1.2** - Retrying library

### Math & Symbolic Computing
- **sympy 1.14.0** - Symbolic mathematics
- **mpmath 1.3.0** - Arbitrary-precision arithmetic

### Network Graphs
- **networkx 3.5** - Complex networks and graphs library

### Data Structures
- **attrs 25.3.0** - Classes without boilerplate
- **rpds-py 0.27.0** - Python bindings to Rust's persistent data structures

### Platform Detection
- **distro 1.9.0** - Linux distribution information

### Time Parsing
- **durationpy 0.10** - Duration parsing library

### Type Checking
- **typing_extensions 4.14.1** - Backported type hints
- **typing-inspection 0.4.1** - Runtime inspection of types

### Miscellaneous
- **six 1.17.0** - Python 2 and 3 compatibility
- **sniffio 1.3.1** - Async library detection
- **anyio 4.10.0** - High-level async framework
- **certifi 2025.8.3** - SSL certificates
- **charset-normalizer 3.4.2** - Character encoding detection
- **idna 3.10** - Internationalized Domain Names
- **colorama 0.4.6** - Cross-platform colored terminal text
- **flatbuffers 25.2.10** - Memory efficient serialization
- **importlib_metadata 8.7.0** - Metadata from Python packages
- **importlib_resources 6.5.2** - Resource reading
- **protobuf 6.31.1** - Protocol Buffers
- **annotated-types 0.7.0** - Type annotations
- **overrides 7.7.0** - Decorator for overriding methods
- **referencing 0.36.2** - JSON reference resolution
- **zipp 3.23.0** - Backport of pathlib

---

## 🏗️ Architecture Overview

### Monorepo Structure
```
MentorMatch.AI/
├── Frontend/          # React + Vite + TypeScript application
├── backend/           # Django REST API
│   ├── core/         # Django project configuration
│   ├── mentore/      # Main Django app
│   ├── services/     # Business logic (profile matching)
│   ├── utils/        # Utilities (embeddings, vector DB)
│   └── chroma_store/ # ChromaDB persistent storage
```

### Key Features

#### AI-Powered Matching
- Uses sentence embeddings to convert profile information into high-dimensional vectors
- Stores embeddings in ChromaDB for efficient similarity search
- Matches mentors and mentees based on semantic similarity of their profiles

#### Profile Management
- MongoDB for flexible document storage of user profiles
- Separate collections for mentors and mentees
- Fields include skills, experience, bio, availability, languages, etc.

#### Modern Frontend
- Component-based architecture with React
- Type-safe development with TypeScript
- Comprehensive UI component library (shadcn/ui)
- Dark mode support
- Responsive design with Tailwind CSS

#### RESTful API
- Django REST framework for API endpoints
- CORS enabled for frontend-backend communication
- MongoDB integration for data persistence

---

## 🚀 Development Workflow

### Frontend Development
```bash
npm install          # Install dependencies
npm run dev          # Start development server on port 8080
npm run build        # Production build
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend Development
```bash
python -m venv venv              # Create virtual environment
source venv/bin/activate         # Activate virtual environment
pip install -r requirements.txt  # Install dependencies
python manage.py migrate         # Apply database migrations
python manage.py runserver       # Start development server
```

### Environment Variables
The backend uses `.env` file for configuration:
- `MONGO_USER` - MongoDB username
- `MONGO_PASS` - MongoDB password
- `MONGO_DB` - Database name
- Django `SECRET_KEY`

---

## 📊 Technology Stack Summary

| Category | Technologies |
|----------|-------------|
| **Frontend Framework** | React 18.3, TypeScript 5.8 |
| **Build Tool** | Vite 5.4 |
| **Styling** | Tailwind CSS, shadcn/ui, Radix UI |
| **State Management** | React Query (TanStack Query) |
| **Backend Framework** | Django 5.2 |
| **Database** | MongoDB Atlas (MongoEngine ODM) |
| **AI/ML** | Sentence Transformers, ChromaDB, PyTorch |
| **Vector Search** | ChromaDB with all-MiniLM-L6-v2 model |
| **HTTP Client** | Axios (Frontend), Requests/HTTPX (Backend) |
| **Authentication** | bcrypt, OAuth |
| **Monitoring** | OpenTelemetry, PostHog |
| **Development** | ESLint, TypeScript, Python type hints |

---

## 🎯 Use Case

MentorMatch.AI is designed to:
1. **Connect** mentors and mentees based on AI-powered semantic matching
2. **Analyze** profile information (skills, experience, goals, bio) using NLP
3. **Recommend** best matches using vector similarity search
4. **Facilitate** mentorship relationships through a modern web interface
5. **Scale** efficiently with cloud-native technologies

The combination of modern web technologies, NoSQL database flexibility, and AI-powered matching creates a sophisticated platform for professional mentorship connections.
