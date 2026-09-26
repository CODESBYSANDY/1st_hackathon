"""Common data validation helper functions."""

import re
from typing import Optional

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")


def is_valid_email(email: Optional[str]) -> bool:
    """Validate email format."""
    if not email:
        return False
    return bool(EMAIL_REGEX.match(email.strip()))


def sanitize_string(val: Optional[str]) -> str:
    """Strip leading/trailing whitespace and control characters."""
    if not val:
        return ""
    return val.strip()
