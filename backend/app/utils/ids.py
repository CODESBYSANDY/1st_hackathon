"""Unique identifier generation utilities."""

import uuid


def generate_uuid() -> str:
    """Generate a random UUID4 string."""
    return str(uuid.uuid4())


def generate_id(prefix: str = "") -> str:
    """Generate a prefixed unique identifier string.

    Example: generate_id("lesson_") -> "lesson_a1b2c3d4..."
    """
    uid_str = uuid.uuid4().hex
    return f"{prefix}{uid_str}" if prefix else uid_str
