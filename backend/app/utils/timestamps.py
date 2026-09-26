"""Timestamp and date utility functions."""

from datetime import datetime, timezone


def now_utc() -> datetime:
    """Return the current timezone-aware UTC datetime."""
    return datetime.now(timezone.utc)


def now_iso() -> str:
    """Return current UTC timestamp as ISO-8601 formatted string."""
    return now_utc().isoformat()
