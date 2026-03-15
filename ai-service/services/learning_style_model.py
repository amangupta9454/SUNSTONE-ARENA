# services/learning_style_model.py — Learning Style Detection AI
# Detects learning style: visual | practice | text | mixed
# Based on behavioral signals from study sessions

from typing import List, Optional


def detect_learning_style(
    time_spent_reading_pct: float,   # % of session time reading text content (0-100)
    quiz_frequency: float,           # quizzes per week
    video_completion_rate: float,    # % of videos completed (0-100)
    accuracy_improvement: float,     # accuracy delta over last 5 sessions
    avg_session_length_min: float,   # average session length in minutes
    retry_rate: float,               # fraction of questions retried (0-1)
) -> dict:
    """
    Classify learning style using a weighted scoring model.
    Returns: style, confidence, description, content_recommendations
    """

    scores = {"visual": 0.0, "practice": 0.0, "text": 0.0}

    # Visual signals: high video completion, shorter sessions (prefers visual chunks)
    scores["visual"] += video_completion_rate * 0.5
    scores["visual"] += max(0, (30 - avg_session_length_min)) * 0.5  # shorter = more visual

    # Practice signals: high quiz frequency, high retry rate, accuracy improvement
    scores["practice"] += min(100, quiz_frequency * 15)
    scores["practice"] += retry_rate * 60
    scores["practice"] += max(0, accuracy_improvement) * 2

    # Text signals: high reading time, longer sessions
    scores["text"] += time_spent_reading_pct * 0.6
    scores["text"] += min(100, avg_session_length_min * 1.5)

    # Normalize to 0-100
    total = sum(scores.values()) or 1
    normalized = {k: round((v / total) * 100, 1) for k, v in scores.items()}

    # Determine dominant style
    dominant = max(normalized, key=normalized.get)
    confidence = normalized[dominant]

    # Mixed if no clear winner (top score < 45%)
    if confidence < 45:
        dominant = "mixed"

    style_info = {
        "visual": {
            "description": "You learn best through diagrams, charts, and visual representations.",
            "recommendations": [
                "Focus on Knowledge Graph visualization",
                "Use Weak Spot Radar charts to identify gaps",
                "Watch video explanations when available",
            ],
        },
        "practice": {
            "description": "You learn best by doing — repetition and active recall work great for you.",
            "recommendations": [
                "Use SRS Review daily for spaced repetition",
                "Take frequent quizzes to reinforce knowledge",
                "Use Mistake Journal for targeted retry practice",
            ],
        },
        "text": {
            "description": "You learn best through detailed reading and written explanations.",
            "recommendations": [
                "Read full topic explanations in Learning mode",
                "Ask the AI Tutor for detailed written answers",
                "Take notes in the Mistake Journal",
            ],
        },
        "mixed": {
            "description": "You use a balanced mix of learning strategies.",
            "recommendations": [
                "Alternate between quizzes, reading, and visual tools",
                "Use the full platform — Assessment, Tutor, and SRS",
                "Track your progress with the Skill Heatmap",
            ],
        },
    }

    return {
        "learning_style": dominant,
        "confidence": round(confidence, 1),
        "scores": normalized,
        "description": style_info[dominant]["description"],
        "recommendations": style_info[dominant]["recommendations"],
    }
