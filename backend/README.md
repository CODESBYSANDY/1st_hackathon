# PW67 Backend — Adaptive Placement Preparation System

The backend system of record and adaptive intelligence engine for the **PW67 Adaptive Placement Preparation System**.

---

## 1. Backend Purpose

Unlike traditional static placement preparation platforms that deliver fixed roadmaps and question banks, PW67 is an **Adaptive Placement Preparation Platform**. 

The backend:
- Serves as the authoritative **System of Record** and **Business Logic Layer**.
- Validates requests and authenticates students using Firebase Auth ID tokens.
- Manages the dynamic **Student Learning State** in Google Cloud Firestore.
- Runs the **Adaptive Engine** to evaluate learning evidence and calculate optimal pedagogical interventions (advance, reinforce, prerequisite revision, challenge).
- Evaluates diagnostic and checkpoint assessments.
- Integrates Google Gemini AI for structured reasoning, concept explanations, and personalized recommendations.

---

## 2. Architecture Overview

```
                      FRONTEND
                    React / Vite
                         |
                         | HTTPS / JSON
                         ↓
                 FASTAPI REST API
                         |
               ┌─────────┴─────────┐
               ↓                   ↓
          API ROUTES          AUTHENTICATION
               |
               ↓
         SERVICE LAYER
               |
       ┌───────┼────────┬───────────────┐
       ↓       ↓        ↓               ↓
    Learning Assessment Adaptive       AI
    Service   Service    Engine       Service
       |         |         |             |
       └─────────┼─────────┼─────────────┘
                 ↓
          REPOSITORY LAYER
                 ↓
             FIRESTORE
                 |
                 ↓
          PERSISTENT STATE
```

### The Adaptive Loop:
```
STUDENT → LEARN → PRACTICE → ASSESS → COLLECT EVIDENCE → UPDATE STUDENT STATE → ADAPTIVE ENGINE → DETERMINE NEXT ACTION → NEXT ACTIVITY → REPEAT
```

---

## 3. Folder Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                     # Application entry point & middleware setup
│   ├── core/                       # Core configuration, security, & dependencies
│   │   ├── config.py               # Pydantic Settings & environment variables
│   │   ├── security.py             # Firebase token verification abstraction
│   │   ├── dependencies.py         # FastAPI dependency injection providers
│   │   └── exceptions.py           # Centralized application exceptions
│   ├── api/                        # HTTP / API layer
│   │   ├── router.py               # Main API router
│   │   └── v1/                     # API v1 route endpoints
│   │       ├── health.py           # Health check endpoint
│   │       ├── auth.py             # Authentication endpoints
│   │       ├── users.py            # User profile endpoints
│   │       ├── onboarding.py       # Student onboarding endpoints
│   │       ├── dashboard.py        # Dashboard summary endpoints
│   │       ├── learning.py         # Lesson and journey endpoints
│   │       ├── assessments.py      # Assessment & quiz submission endpoints
│   │       ├── adaptive.py         # Adaptive engine state & next activity
│   │       ├── rewards.py          # Gamification, XP, & badges
│   │       ├── community.py        # Discussion posts & comments
│   │       └── ai.py               # Gemini AI reasoning endpoints
│   ├── schemas/                    # Pydantic request & response contracts
│   ├── models/                     # Domain entity models
│   ├── services/                   # Business logic layer
│   ├── repositories/               # Firestore data access layer
│   ├── adaptive/                   # Core Adaptive Intelligence Engine
│   │   ├── engine.py               # Engine orchestrator
│   │   ├── state_updater.py        # State mutation based on evidence
│   │   ├── path_generator.py       # Dynamic next activity selector
│   │   ├── difficulty.py           # Difficulty calibration & clamping
│   │   └── rules.py                # Deterministic pedagogical rules
│   ├── ai/                         # Google Gemini integration & prompts
│   │   ├── gemini_client.py        # Gemini client wrapper
│   │   ├── parsers.py              # Structured JSON response parser
│   │   └── prompts/                # Versioned prompt templates
│   ├── db/                         # Database infrastructure
│   │   ├── firebase.py             # Firebase Admin & Firestore client provider
│   │   └── collections.py          # Centralized Firestore collection constants
│   └── utils/                      # Common utilities (ids, timestamps, validators)
├── tests/                          # Pytest test suite
│   ├── test_health.py
│   ├── test_auth.py
│   ├── test_onboarding.py
│   ├── test_learning.py
│   ├── test_assessment.py
│   └── test_adaptive.py
├── requirements.txt                # Python dependencies
├── .env.example                    # Environment variable template
└── README.md                       # Backend documentation
```

---

## 4. Setup & Installation

### Prerequisites
- Python 3.9+ (Python 3.10/3.11/3.12 recommended)
- Git

### 1. Create Virtual Environment
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
```

*(On Windows)*
```cmd
.venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

---

## 5. Environment Variables

Create your `.env` file from the example template:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```ini
# Application Configuration
APP_NAME=PW67 Backend
APP_VERSION=1.0.0
ENVIRONMENT=development
DEBUG=True

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173
FRONTEND_URL=http://localhost:5173

# Firebase Configuration (Optional for /health check)
FIREBASE_CREDENTIALS_PATH=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Google Gemini AI Configuration
GEMINI_API_KEY=
```

---

## 6. Running the Development Server

From the `backend/` directory:

```bash
uvicorn app.main:app --reload --port 8000
```

The API will start at: `http://127.0.0.1:8000`

---

## 7. Interactive API Documentation

- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
- **Health Check**: [http://127.0.0.1:8000/api/v1/health](http://127.0.0.1:8000/api/v1/health)

---

## 8. Running Tests

Run the test suite with pytest:

```bash
pytest
```

Run with verbose output:
```bash
pytest -v
```

---

## 9. Firebase Setup Placeholder

The backend uses **Firebase Admin SDK** to communicate with Firestore and verify Firebase Authentication tokens.

1. Create a Firebase Project in the Firebase Console.
2. Go to **Project Settings > Service accounts** and generate a new private key (`serviceAccountKey.json`).
3. Set `FIREBASE_CREDENTIALS_PATH=path/to/serviceAccountKey.json` in your `.env`.
   *Alternatively, configure `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` directly in `.env`.*
4. The server runs safely in development mode even if Firebase credentials are omitted (e.g. `/health` and unit tests will still function).

---

## 10. Gemini Setup Placeholder

Google Gemini powers natural language feedback, concept synthesis, and AI-assisted recommendations.

1. Obtain a Gemini API Key from Google AI Studio.
2. Set `GEMINI_API_KEY=your_key_here` in `.env`.
3. The AI service will generate structured recommendations and explanations during Phase 8.

---

## 11. Adaptive Engine Explanation

The **Adaptive Engine** (`app/adaptive/`) is the intellectual core of the platform:
- **`rules.py`**: Deterministic rule evaluation based on student assessment scores and mastery thresholds.
- **`difficulty.py`**: Calibrates difficulty levels strictly between 1 (Beginner) and 5 (Advanced).
- **`state_updater.py`**: Dynamically adjusts individual skill proficiency ratings (0-100), tracks strong/weak areas, and records adaptation history.
- **`path_generator.py`**: Computes the optimal next activity (Lesson, Assessment, Simulation, Practice Drill, or Prerequisite Revision).
- **`engine.py`**: Orchestrates the adaptive loop and delivers decisions.

---

## 12. Development Rules & Guidelines

- **No business logic in routes**: Keep `app/api/` strictly for request validation, service invocation, and response formatting.
- **Repositories for data access**: All Firestore interactions belong inside `app/repositories/`.
- **Collection constants**: Always use `app.db.collections` constants; never hardcode collection names.
- **Type safety**: Use type hints across all functions and classes.
- **No committed secrets**: Never commit `.env` or credential JSON files.
- **Phase discipline**: Build each feature in its designated phase.
