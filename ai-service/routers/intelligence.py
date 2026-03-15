# routers/intelligence.py — Intelligence API endpoints
# Handles: student risk, question generation, learning style, burnout detection

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

from services.predictive_model import compute_risk_score
from services.question_generator import generate_question, generate_batch
from services.learning_style_model import detect_learning_style

router = APIRouter(prefix="/intelligence", tags=["intelligence"])


# ── Schemas ───────────────────────────────────────────────────────────────────

class RiskRequest(BaseModel):
    student_id: str
    accuracy_history: List[float] = []
    avg_response_time_ms: float = 3000
    focus_score: float = 70
    streak_gap_days: int = 0
    cognitive_load_ratio: float = 1.0
    retry_rate: float = 0.1
    avg_mastery: float = 0.5

class QuestionRequest(BaseModel):
    topic: str
    subject: str = "General"
    difficulty: int = 3
    count: int = 1
    past_mistakes: List[str] = []
    mastery_score: float = 0.5

class LearningStyleRequest(BaseModel):
    student_id: str
    time_spent_reading_pct: float = 30
    quiz_frequency: float = 3
    video_completion_rate: float = 50
    accuracy_improvement: float = 0
    avg_session_length_min: float = 20
    retry_rate: float = 0.2

class BurnoutRequest(BaseModel):
    student_id: str
    session_lengths: List[float] = []   # minutes per session
    accuracy_trend: List[float] = []    # accuracy per session
    focus_scores: List[float] = []      # focus score per session
    hours_between_sessions: List[float] = []  # gaps between sessions


# ── Routes ────────────────────────────────────────────────────────────────────

@router.post("/student-risk")
async def predict_student_risk(req: RiskRequest):
    """Predict if a student is at risk of failing upcoming assessments."""
    result = compute_risk_score(
        accuracy_history=req.accuracy_history,
        avg_response_time_ms=req.avg_response_time_ms,
        focus_score=req.focus_score,
        streak_gap_days=req.streak_gap_days,
        cognitive_load_ratio=req.cognitive_load_ratio,
        retry_rate=req.retry_rate,
        avg_mastery=req.avg_mastery,
    )
    return {"success": True, "student_id": req.student_id, **result}


@router.post("/generate-questions")
async def generate_questions(req: QuestionRequest):
    """Generate practice questions for a topic."""
    if req.count == 1:
        q = generate_question(req.topic, req.subject, req.difficulty, req.past_mistakes, req.mastery_score)
        return {"success": True, "questions": [q]}
    else:
        questions = generate_batch(req.topic, req.subject, req.difficulty, min(req.count, 10))
        return {"success": True, "questions": questions}


@router.post("/learning-style")
async def detect_style(req: LearningStyleRequest):
    """Detect a student's learning style from behavioral signals."""
    result = detect_learning_style(
        time_spent_reading_pct=req.time_spent_reading_pct,
        quiz_frequency=req.quiz_frequency,
        video_completion_rate=req.video_completion_rate,
        accuracy_improvement=req.accuracy_improvement,
        avg_session_length_min=req.avg_session_length_min,
        retry_rate=req.retry_rate,
    )
    return {"success": True, "student_id": req.student_id, **result}


@router.post("/burnout-detection")
async def detect_burnout(req: BurnoutRequest):
    """Detect cognitive burnout from study pattern signals."""
    risk_score = 0.0
    signals = []

    # Signal 1: Very long sessions (> 90 min) increase burnout risk
    if req.session_lengths:
        avg_len = sum(req.session_lengths) / len(req.session_lengths)
        if avg_len > 90:
            risk_score += 30
            signals.append(f"Average session length is {avg_len:.0f} min — consider shorter sessions")
        elif avg_len > 60:
            risk_score += 15

    # Signal 2: Declining accuracy trend
    if len(req.accuracy_trend) >= 3:
        recent = req.accuracy_trend[-3:]
        older = req.accuracy_trend[:-3] if len(req.accuracy_trend) > 3 else req.accuracy_trend[:1]
        delta = (sum(recent) / len(recent)) - (sum(older) / len(older))
        if delta < -15:
            risk_score += 35
            signals.append(f"Accuracy dropped by {abs(delta):.0f}% recently")
        elif delta < -5:
            risk_score += 15

    # Signal 3: Low focus scores
    if req.focus_scores:
        avg_focus = sum(req.focus_scores) / len(req.focus_scores)
        if avg_focus < 40:
            risk_score += 25
            signals.append(f"Focus score is low ({avg_focus:.0f}/100)")
        elif avg_focus < 60:
            risk_score += 10

    # Signal 4: Very short gaps between sessions (no recovery time)
    if req.hours_between_sessions:
        avg_gap = sum(req.hours_between_sessions) / len(req.hours_between_sessions)
        if avg_gap < 4:
            risk_score += 20
            signals.append("Sessions are too close together — allow recovery time")

    risk_score = min(100, round(risk_score, 1))

    if risk_score >= 60:
        level = "high"
        suggestion = "Take a 24-hour break and switch to a lighter subject"
    elif risk_score >= 30:
        level = "moderate"
        suggestion = "Consider a short break and reduce session length"
    else:
        level = "low"
        suggestion = "Your study pattern looks healthy — keep it up!"

    return {
        "success": True,
        "student_id": req.student_id,
        "burnout_risk_score": risk_score,
        "burnout_level": level,
        "suggestion": suggestion,
        "signals": signals,
    }
