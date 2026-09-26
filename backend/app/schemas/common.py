"""Common shared Pydantic response and request schemas."""

from typing import Any, Generic, List, Optional, TypeVar
from pydantic import BaseModel, Field

DataT = TypeVar("DataT")


class HealthResponse(BaseModel):
    """Response model for health check endpoint."""

    status: str = Field(default="ok", json_schema_extra={"example": "ok"})
    service: str = Field(default="PW67 Backend", json_schema_extra={"example": "PW67 Backend"})
    version: str = Field(default="1.0.0", json_schema_extra={"example": "1.0.0"})


class ErrorDetail(BaseModel):
    """Structured error detail model."""

    message: str
    error_code: str
    details: Optional[dict] = None


class StandardResponse(BaseModel, Generic[DataT]):
    """Generic wrapper for standard API responses."""

    success: bool = True
    message: Optional[str] = None
    data: Optional[DataT] = None


class PaginationParams(BaseModel):
    """Pagination query parameter model."""

    page: int = Field(default=1, ge=1)
    limit: int = Field(default=20, ge=1, le=100)
