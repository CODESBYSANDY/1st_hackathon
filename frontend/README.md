# NETRA — SEE YOUR NEXT STEP
### Adaptive Placement-Preparation Learning Game

NETRA is an adaptive placement-preparation platform designed as an immersive learning adventure rather than a traditional LMS. Students select between two core engineering worlds (**Web Development** and **App Development with Flutter/Dart**), level up through focused missions, interact with live visual concept diagrams, solve technical challenges, pass milestone checkpoints, and conquer epic Boss Tests.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The Vite development server will launch at `http://localhost:5173`.

---

## 🎨 Design Language & Visual Direction

Inspired by the visual identity of NETRA:
- **Clean Canvas**: Crisp white/light theme with ambient blue, cyan, and purple accents.
- **The Lynx Mascot Companion (`<LynxCompanion />`)**: The student's learning guide with expressive ear tufts, intelligent emotional states (`welcome`, `thinking`, `encouraging`, `celebrating`, `bossBattle`, `levelUp`), and dynamic speech bubbles.
- **Game World Roadmap**: Connected interactive nodes visually representing all 7 adaptive states (`LOCKED`, `AVAILABLE`, `IN_PROGRESS`, `COMPLETED`, `RECOMMENDED`, `REINFORCEMENT`, `MASTERED`).
- **Interactive Visualizers**: Live Tag Anatomy Inspector, Interactive CSS Box Model Simulator, and step-by-step URL-to-Render pipeline.

---

## 🧭 Routes & User Journey

| Route | Page | Purpose |
| :--- | :--- | :--- |
| `/` | Dashboard Redirect | Directs student to their active home base |
| `/login` | Login Gateway | Clean placeholder ready for Firebase Auth token integration |
| `/onboarding` | Interactive Intro | Explains NETRA's adaptive learning loop |
| `/domains` | Domain Selection | Choose between **Web Development** and **App Development** |
| `/dashboard` | Student Home Hub | Today's Mission, Lynx prompt, XP/Coins/Streak, Skill Mastery |
| `/domain/:domainId` | World Roadmap | Game-like connected milestone path |
| `/level/:levelId` | Level Overview | Objectives, mission checklist, Checkpoint, and Boss gates |
| `/mission/:missionId` | Interactive Mission | Concept, live visual simulation, example, mini-task |
| `/lesson/:lessonId` | Generic Lesson View | Generic renderer for lessons |
| `/challenge/:id` | Challenge Arena | MCQ, Code Completion, Ordering, Debugging, Prediction |
| `/checkpoint/:id` | Milestone Checkpoint | Multi-concept diagnostic assessment |
| `/boss/:bossId` | Epic Boss Test | Real-world incident debugging & architectural challenge |
| `/result/:attemptId` | Results & Rewards | XP/coins tally, skill delta, Lynx praise, next recommended step |
| `/profile` | Placement Portfolio | Readiness gauge, skill radar breakdown, achievement badges |

> **Note**: As strictly specified, Community pages, feeds, and messaging have been completely omitted from this MVP to focus 100% on learning, practice, assessments, and the Lynx companion.

---

## 🔌 Backend Integration Contract (FastAPI + Firebase)

The frontend is built to communicate with FastAPI (`/api/v1`):
* **Base URL**: `VITE_API_BASE_URL=http://127.0.0.1:8000`
* **Health Check**: `GET /api/v1/health`
* **Dual-Mode Graceful Fallback**: If the FastAPI backend is running, the services consume real API responses; if offline or under development, it automatically operates in mock mode with a non-intrusive status pill in the Top Navigation.
* **Separation of Concerns**: React acts solely as a renderer of backend decisions. It does not calculate adaptive paths, does not directly touch Firestore, and contains zero backend secrets.

---

## 📁 Project Architecture

```text
src/
├── assets/             # Icons and media
├── components/
│   ├── challenges/     # Reusable challenge dispatcher & engines
│   ├── gamification/   # XP, coins, streak badges, confetti
│   ├── layout/         # AppLayout, TopNav, SidebarNav
│   ├── lessons/        # GenericLessonRenderer, VisualSection
│   ├── lynx/           # Vector LynxCompanion mascot system
│   └── roadmap/        # RoadmapWorld, RoadmapNode
├── context/
│   ├── LearningContext.jsx   # Student progress & domain state
│   └── LynxContext.jsx       # Global mascot reactions
├── data/
│   ├── domains/        # Domains, Web Curriculum (17 levels), App Curriculum (18 levels)
│   └── mock/           # Realistic student state, challenges, checkpoints, boss tests
├── pages/              # All page views
├── routes/             # AppRoutes
├── services/           # ApiClient, healthService, learningService, assessmentService
└── index.css           # NETRA design system, tokens, and animations
```
