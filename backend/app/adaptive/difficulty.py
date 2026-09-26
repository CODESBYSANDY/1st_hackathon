"""Difficulty calibration and management."""

from typing import List


class DifficultyManager:
    """Manages difficulty boundaries and level transitions."""

    MIN_DIFFICULTY: int = 1
    MAX_DIFFICULTY: int = 5

    @classmethod
    def clamp_difficulty(cls, level: int) -> int:
        """Ensure difficulty level is strictly within [1, 5]."""
        return max(cls.MIN_DIFFICULTY, min(cls.MAX_DIFFICULTY, level))

    @classmethod
    def calculate_average_difficulty(cls, levels: List[int]) -> int:
        """Calculate rounded average difficulty from history."""
        if not levels:
            return cls.MIN_DIFFICULTY
        avg = sum(levels) / len(levels)
        return cls.clamp_difficulty(round(avg))
