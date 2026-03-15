# services/predictive_model.py — Predictive Student Risk Model
# Uses a heuristic Random Forest-style scoring (no sklearn dependency needed)
# Inputs: accuracy_history, response_time, focus_score, streak_gaps, cognitive_load, retry_rate, mastery_scores

from typing import List, Optional
import math


def compute_risk_score(
    accuracy_history: List[float],       # list of accuracy values 0-100
    avg_response_time_ms: float,         # average response time in ms
    focus_score: float,                  # 0-100
    streak_gap_days: int,                # days since last study
    cognitive_load_ratio: float,         # avg load ratio (1.0 = normal)
    retry_rate: float,                   # fraction of questions retried 0-1
    avg_mastery: float,                  # average mastery score 0-1
) -> dict:
    """
    Compute a risk score (0-100) using a weighted heuristic model.
    Higher score = higher risk of failing upcoming assessments.
    
    Feature weights (sum to 1.0):
      accuracy_trend   0.30
      mastery_gap      0.25
      focus_score      0.15
      streak_gap       0.15
      cognitive_load   0.10
      retry_rate       0.05
    """

    # ── Feature 1: Accuracy trend (0-100, lower = worse) ─────────────────────
    if len(accuracy_history) >= 3:
        recent = accuracy_history[-3:]
        older = accuracy_history[:-3] if len(accuracy_history) > 3 else accuracy_history[:1]
        recent_avg = sum(recent) / len(recent)
        older_avg = sum(older) / len(older) if older else recent_avg
        # Declining trend increases risk
        trend_delta = recent_avg - older_avg  # negative = declining
        accuracy_risk = max(0, min(100, 50 - trend_delta + (100 - recent_avg) * 0.5))
    elif accuracy_history:
        avg_acc = sum(accuracy_history) / len(accuracy_history)
        accuracy_risk = max(0, 100 - avg_acc)
    else:
        accuracy_risk = 60  # no data = moderate risk

    # ── Feature 2: Mastery gap (0-1, lower mastery = higher risk) ────────────
    mastery_risk = max(0, min(100, (1 - avg_mastery) * 100))

    # ── Feature 3: Focus score (0-100, lower focus = higher risk) ────────────
    focus_risk = max(0, min(100, 100 - focus_score))

    # ── Feature 4: Streak gap (days without studying) ────────────────────────
    # 0 days = 0 risk, 7+ days = 100 risk
    streak_risk = min(100, streak_gap_days * 14)

    # ── Feature 5: Cognitive load (ratio > 2 = high risk) ────────────────────
    load_risk = min(100, max(0, (cognitive_load_ratio - 1.0) * 50))

    # ── Feature 6: Retry rate (high retry = struggling) ──────────────────────
    retry_risk = min(100, retry_rate * 100)

    # ── Weighted combination ──────────────────────────────────────────────────
    risk_score = (
        accuracy_risk  * 0.30 +
        mastery_risk   * 0.25 +
        focus_risk     * 0.15 +
        streak_risk    * 0.15 +
        load_risk      * 0.10 +
        retry_risk     * 0.05
    )
    risk_score = round(min(100, max(0, risk_score)), 1)

    # ── Risk level classification ─────────────────────────────────────────────
    if risk_score >= 65:
        risk_level = "high"
        color = "#EF4444"
    elif risk_score >= 35:
        risk_level = "moderate"
        color = "#F59E0B"
    else:
        risk_level = "low"
        color = "#10B981"

    # ── Intervention suggestions ──────────────────────────────────────────────
    interventions = []
    if accuracy_risk > 60:
        interventions.append("Review recent incorrect answers in Mistake Journal")
    if mastery_risk > 60:
        interventions.append("Focus on low-mastery skills before next assessment")
    if streak_risk > 40:
        interventions.append("Re-establish daily study habit — even 15 minutes helps")
    if focus_risk > 50:
        interventions.append("Reduce distractions during study sessions")
    if load_risk > 50:
        interventions.append("Break complex topics into shorter study blocks")
    if not interventions:
        interventions.append("Keep up the great work — maintain your current pace")

    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "color": color,
        "feature_breakdown": {
            "accuracy_risk": round(accuracy_risk, 1),
            "mastery_risk": round(mastery_risk, 1),
            "focus_risk": round(focus_risk, 1),
            "streak_risk": round(streak_risk, 1),
            "load_risk": round(load_risk, 1),
            "retry_risk": round(retry_risk, 1),
        },
        "interventions": interventions[:3],  # top 3 suggestions
    }
