"""AI Service encapsulating Gemini LLM interactions, prompts, and validations."""

import logging
from typing import Any, Dict, Optional
from app.ai.gemini_client import GeminiClient
from app.ai.parsers import AIResponseParser

logger = logging.getLogger(__name__)


class AIService:
    """Orchestrates structured AI reasoning with Google Gemini."""

    def __init__(
        self,
        gemini_client: Optional[GeminiClient] = None,
        parser: Optional[AIResponseParser] = None,
    ):
        self.gemini_client = gemini_client or GeminiClient()
        self.parser = parser or AIResponseParser()

    async def generate_explanation(self, concept: str, difficulty: int) -> Dict[str, Any]:
        """Generate structured pedagogical explanation for a concept."""
        prompt = f"Explain {concept} for a student at proficiency difficulty level {difficulty}."
        raw_response = await self.gemini_client.generate_response(prompt)
        parsed = self.parser.extract_json(raw_response)
        if parsed:
            return parsed
        return {"explanation": raw_response or f"Standard explanation for {concept}."}
