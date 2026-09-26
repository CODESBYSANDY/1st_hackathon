"""Tests for authentication dependencies and security abstractions."""

import pytest
from app.core.exceptions import UnauthorizedError
from app.core.security import verify_firebase_token


def test_verify_token_empty_raises_unauthorized():
    """Empty or whitespace token must raise UnauthorizedError."""
    with pytest.raises(UnauthorizedError):
        verify_firebase_token("")

    with pytest.raises(UnauthorizedError):
        verify_firebase_token("   ")
