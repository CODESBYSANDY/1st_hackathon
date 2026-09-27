"""Learning service managing lessons, curriculum journeys, and study materials."""

from typing import Any, Dict, List, Optional
from app.core.exceptions import NotFoundError
from app.repositories.domain_repository import DomainRepository
from app.repositories.learning_repository import LearningRepository
from app.repositories.state_repository import StateRepository
from app.repositories.user_repository import UserRepository
from app.utils.timestamps import now_iso

# Hardcoded domain catalog — used when Firestore has no domains seeded
DEFAULT_DOMAINS = [
    {
        "id": "web",
        "name": "Web Development",
        "tagline": "Build the web from fundamentals to full-stack applications.",
        "icon": "Code",
        "primary_color": "#2563EB",
        "active": True,
    },
    {
        "id": "cloud",
        "name": "Cloud Computing",
        "tagline": "Architect distributed systems on AWS, GCP, and Azure.",
        "icon": "Cloud",
        "primary_color": "#0284C7",
        "active": True,
    },
    {
        "id": "cybersecurity",
        "name": "Cybersecurity",
        "tagline": "Defend systems against modern cyber threats.",
        "icon": "ShieldCheck",
        "primary_color": "#059669",
        "active": True,
    },
    {
        "id": "app",
        "name": "App Development",
        "tagline": "Build native and cross-platform mobile applications.",
        "icon": "Smartphone",
        "primary_color": "#7C3AED",
        "active": True,
    },
    {
        "id": "ai_ml",
        "name": "AI & Machine Learning",
        "tagline": "Build intelligent systems with modern ML frameworks.",
        "icon": "Brain",
        "primary_color": "#D946EF",
        "active": True,
    },
    {
        "id": "data_science",
        "name": "Data Science",
        "tagline": "Extract insights and tell stories with data.",
        "icon": "BarChart3",
        "primary_color": "#0EA5E9",
        "active": True,
    },
    {
        "id": "devops",
        "name": "DevOps",
        "tagline": "Automate, deploy, and monitor production systems.",
        "icon": "Workflow",
        "primary_color": "#EA580C",
        "active": True,
    },
    {
        "id": "database",
        "name": "Database",
        "tagline": "Design, optimize, and scale data engines.",
        "icon": "Database",
        "primary_color": "#4F46E5",
        "active": True,
    },
]


class LearningService:
    """Business logic for lesson retrieval and curriculum progression."""

    def __init__(
        self,
        learning_repo: Optional[LearningRepository] = None,
        state_repo: Optional[StateRepository] = None,
        domain_repo: Optional[DomainRepository] = None,
        user_repo: Optional[UserRepository] = None,
    ):
        self.learning_repo = learning_repo or LearningRepository()
        self.state_repo = state_repo or StateRepository()
        self.domain_repo = domain_repo or DomainRepository()
        self.user_repo = user_repo or UserRepository()

    def list_domains(self) -> List[Dict[str, Any]]:
        """List all available learning domains."""
        try:
            domains = self.domain_repo.list_all_domains()
            if domains:
                return domains
        except Exception:
            pass
        # Fallback to hardcoded catalog
        return DEFAULT_DOMAINS

    def get_domain_journey(self, uid: str, domain_id: str) -> Dict[str, Any]:
        """Get personalized journey for a specific domain."""
        state = self.state_repo.get_student_state(uid) or {}
        lessons = self.learning_repo.list_lessons_by_domain(domain_id)
        completed = state.get("completed_lesson_ids", [])

        journey_items = []
        for lesson in lessons:
            lid = lesson.get("id", "")
            journey_items.append({
                "lesson_id": lid,
                "title": lesson.get("title", ""),
                "type": lesson.get("lesson_type", "lesson"),
                "difficulty": lesson.get("difficulty_level", 1),
                "is_completed": lid in completed,
                "is_current": lid == state.get("current_lesson_id"),
            })

        return {
            "domain_id": domain_id,
            "journey": journey_items,
            "skills": state.get("skills", {}),
            "completed_count": len(completed),
            "total_count": len(lessons),
        }

    def select_domain(self, uid: str, domain_id: str) -> Dict[str, Any]:
        """Select a domain for the user and initialize state if needed."""
        # Update user's selected domain
        self.user_repo.update(uid, {"selected_domain": domain_id, "updated_at": now_iso()})

        # Initialize or update student state for this domain
        state = self.state_repo.get_student_state(uid)
        if not state:
            new_state = {
                "user_id": uid,
                "domain_id": domain_id,
                "skills": {},
                "current_lesson_id": None,
                "difficulty": 1,
                "weak_areas": [],
                "strong_areas": [],
                "completed_lesson_ids": [],
                "recent_performance": {},
                "adaptation_history": [],
                "created_at": now_iso(),
            }
            self.state_repo.create_student_state(uid, new_state)
        else:
            self.state_repo.upsert_student_state(uid, {
                "domain_id": domain_id,
                "updated_at": now_iso(),
            })

        return {"success": True, "domain_id": domain_id}

    def get_lesson(self, lesson_id: str) -> Dict[str, Any]:
        """Fetch lesson content and instructions."""
        lesson = self.learning_repo.get_lesson(lesson_id)
        if not lesson:
            raise NotFoundError(message=f"Lesson '{lesson_id}' not found")
        return lesson

    def get_journey(self, uid: str) -> Dict[str, Any]:
        """Fetch personalized learning journey for the authenticated user."""
        state = self.state_repo.get_student_state(uid) or {}
        domain_id = state.get("domain_id", "software_engineering")
        lessons = self.learning_repo.list_lessons_by_domain(domain_id)

        return {
            "domain_id": domain_id,
            "current_module": "Core Fundamentals",
            "completed_lessons": [],
            "upcoming_lessons": lessons,
        }
