"""Gemini API client wrapper for AI reasoning and feedback."""

import logging
from typing import Any, Dict, Optional
from app.core.config import settings

logger = logging.getLogger(__name__)


class GeminiClient:
    """Wrapper around Google Gemini client.

    Maintains safe execution when API key is unconfigured.
    """

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.GEMINI_API_KEY
        self._is_configured = bool(self.api_key)

    @property
    def is_configured(self) -> bool:
        """Return True if Gemini API key is available."""
        return self._is_configured

    async def generate_response(
        self,
        prompt: str,
        system_instruction: Optional[str] = None,
        temperature: float = 0.2,
    ) -> Optional[str]:
        """Generate response from Gemini model."""
        if not self.is_configured:
            logger.warning("GeminiClient: API key is not configured. Returning fallback response.")
            return None

        # When the Gemini SDK is integrated in Phase 8, actual client invocation occurs here.
        # Fallback placeholder for Foundation Phase:
        return "AI reasoning response placeholder."
