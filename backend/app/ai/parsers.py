"""Parsers for validating and sanitizing structured Gemini AI outputs."""

import json
import logging
import re
from typing import Any, Dict, Optional

logger = logging.getLogger(__name__)


class AIResponseParser:
    """Parses and extracts JSON responses from Gemini LLM outputs."""

    @classmethod
    def extract_json(cls, raw_text: Optional[str]) -> Optional[Dict[str, Any]]:
        """Extract structured JSON object from markdown fenced blocks or raw strings."""
        if not raw_text:
            return None

        # Clean markdown code blocks if present
        text = raw_text.strip()
        json_match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
        if json_match:
            text = json_match.group(1).strip()

        try:
            return json.loads(text)
        except json.JSONDecodeError as e:
            logger.error("Failed to parse JSON from AI response: %s", e)
            return None
