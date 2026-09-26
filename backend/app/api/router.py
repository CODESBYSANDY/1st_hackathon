"""Main API router combining all v1 endpoints."""

from fastapi import APIRouter
from app.api.v1 import (
    adaptive,
    ai,
    assessments,
    auth,
    community,
    dashboard,
    health,
    learning,
    onboarding,
    rewards,
    users,
)

api_router = APIRouter()

# Health check
api_router.include_router(health.router)

# V1 Domain Routers
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(onboarding.router)
api_router.include_router(dashboard.router)
api_router.include_router(learning.router)
api_router.include_router(assessments.router)
api_router.include_router(adaptive.router)
api_router.include_router(rewards.router)
api_router.include_router(community.router)
api_router.include_router(ai.router)
