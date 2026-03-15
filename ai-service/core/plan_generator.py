# plan_generator.py — ML-powered Learning Plan Generator
#
# This module uses PURE ALGORITHMS (no LLM API) to generate a personalized
# learning plan based on:
#   1. BKT mastery scores (what the student knows)
#   2. Knowledge graph structure (what unlocks what)
#   3. Skill difficulty + subject clustering
#   4. Career goal alignment scoring
#
# Techniques used:
#   - Weighted gap analysis (mastery gap scoring)
#   - Topological sort (prerequisite ordering via NetworkX)
#   - K-means-style subject clustering (group skills by subject)
#   - Priority queue scheduling (weekly plan generation)
#   - Confidence scoring (based on data completeness)

import os
from pymongo import MongoClient
from bson import ObjectId
import core.knowledge_graph as kg_module
from core.knowledge_graph import build_skill_graph
from core.recommendation_engine import CAREER_SKILL_MAP
import networkx as nx


def get_db():
    client = MongoClient(os.getenv("MONGODB_URI"))
    return client["edupath"]


# ── Strategy templates per skill type ────────────────────────────────────────
# These are rule-based strategies, not LLM-generated
OVERCOME_STRATEGIES = {
    "Math": [
        "Practice 10 problems daily using Khan Academy",
        "Watch 3Blue1Brown visual explanations on YouTube",
        "Build intuition before memorizing formulas",
        "Use spaced repetition flashcards for key theorems",
    ],
    "Programming": [
        "Code for 30 minutes daily — consistency beats intensity",
        "Build a small project using this skill",
        "Read other people's code on GitHub",
        "Solve 2 LeetCode problems per week on this topic",
    ],
    "AI": [
        "Implement the algorithm from scratch in Python",
        "Read the original research paper (use Semantic Scholar)",
        "Reproduce a tutorial notebook on Kaggle",
        "Explain the concept to someone else (Feynman technique)",
    ],
}

DIFFICULTY_HOURS = {1: 5, 2: 8, 3: 12, 4: 18, 5: 25}  # estimated hours to master each difficulty level


def generate_learning_plan(student_id: str, mastery_map: list, career_goal: str = "") -> dict:
    """
    Generate a complete personalized learning plan using ML algorithms.

    Steps:
    1. Classify skills into strengths/weaknesses using mastery thresholds
    2. Topological sort the weakness skills by prerequisites (so we study in order)
    3. Cluster skills by subject for focused weekly blocks
    4. Score each weakness by: gap * 0.5 + career_relevance * 0.3 + difficulty_fit * 0.2
    5. Schedule into weekly blocks (max 15 hours/week assumed)
    6. Generate overcome strategies per skill
    7. Compute ML confidence score based on data completeness

    Args:
        student_id: MongoDB student ID
        mastery_map: [{ skill_id, score }]
        career_goal: e.g. "data scientist"

    Returns:
        Complete plan dict
    """
    db = get_db()

    # ── STEP 1: Build mastery dict ────────────────────────────────────────────
    mastery_dict = {item["skill_id"]: item["score"] for item in mastery_map}
    overall_score = round(sum(mastery_dict.values()) / len(mastery_dict) * 100) if mastery_dict else 0

    print(f"📋 Generating plan for student {student_id}, overall score: {overall_score}%")

    # ── STEP 2: Fetch all skill metadata ─────────────────────────────────────
    try:
        object_ids = [ObjectId(sid) for sid in mastery_dict.keys() if len(sid) == 24]
        skills_data = list(db["skillnodes"].find({"_id": {"$in": object_ids}}))
        skills_lookup = {str(s["_id"]): s for s in skills_data}
    except Exception as e:
        print(f"❌ Failed to fetch skills: {e}")
        skills_lookup = {}

    # ── STEP 3: Classify strengths and weaknesses ─────────────────────────────
    # Strength: mastery >= 0.65 (doing well)
    # Weakness: mastery < 0.65 (needs work)
    strengths = []
    weaknesses = []

    for skill_id, score in mastery_dict.items():
        skill = skills_lookup.get(skill_id, {})
        name = skill.get("name", "Unknown")
        subject = skill.get("subject", "General")
        difficulty = skill.get("difficulty", 3)

        if score >= 0.65:
            strengths.append({
                "skill_id": skill_id,
                "skill_name": name,
                "mastery_score": round(score, 3),
                "subject": subject,
                "difficulty": difficulty,
            })
        else:
            gap = round(1.0 - score, 3)
            weaknesses.append({
                "skill_id": skill_id,
                "skill_name": name,
                "mastery_score": round(score, 3),
                "subject": subject,
                "difficulty": difficulty,
                "gap": gap,
            })

    print(f"   Strengths: {len(strengths)}, Weaknesses: {len(weaknesses)}")

    # ── STEP 4: Sort weaknesses by prerequisite order (topological sort) ──────
    # This ensures we study prerequisites before advanced skills
    if kg_module.skill_graph is None or kg_module.skill_graph.number_of_nodes() == 0:
        build_skill_graph()

    graph = kg_module.skill_graph
    weakness_ids = {w["skill_id"] for w in weaknesses}

    # Build a subgraph of just the weakness skills
    try:
        subgraph = graph.subgraph(weakness_ids)
        # Topological sort gives us the correct study order
        topo_order = list(nx.topological_sort(subgraph))
        # Map skill_id to its topo position
        topo_rank = {sid: i for i, sid in enumerate(topo_order)}
    except Exception:
        topo_rank = {}

    # ── STEP 5: Score each weakness ───────────────────────────────────────────
    career_key = career_goal.lower().strip()
    relevant_skills = [s.lower() for s in CAREER_SKILL_MAP.get(career_key, [])]
    avg_mastery = sum(mastery_dict.values()) / len(mastery_dict) if mastery_dict else 0.3

    for w in weaknesses:
        # Gap score: how much does the student need to improve?
        gap_score = w["gap"]

        # Career relevance: is this skill important for their goal?
        career_score = 1.0 if w["skill_name"].lower() in relevant_skills else 0.0

        # Difficulty fit: recommend skills matching current level
        ideal_diff = 1 + (avg_mastery * 4)
        diff_fit = max(0.0, 1.0 - abs(w["difficulty"] - ideal_diff) / 4.0)

        # Topo priority: prerequisites first (lower rank = study sooner)
        topo_score = 1.0 - (topo_rank.get(w["skill_id"], len(weaknesses)) / max(len(weaknesses), 1))

        # Final priority score
        w["priority_score"] = round(
            gap_score * 0.4 + career_score * 0.3 + diff_fit * 0.15 + topo_score * 0.15, 4
        )

    # Sort weaknesses by priority score (highest first)
    weaknesses.sort(key=lambda x: x["priority_score"], reverse=True)

    # ── STEP 6: Generate overcome strategies ──────────────────────────────────
    overcome_strategies = []
    for w in weaknesses[:6]:  # top 6 weaknesses
        subject = w["subject"]
        strategies = OVERCOME_STRATEGIES.get(subject, OVERCOME_STRATEGIES["Programming"])
        # Pick strategy based on mastery level
        if w["mastery_score"] < 0.2:
            strategy = strategies[0]  # most basic
            priority = "critical"
        elif w["mastery_score"] < 0.4:
            strategy = strategies[1]
            priority = "high"
        elif w["mastery_score"] < 0.55:
            strategy = strategies[2]
            priority = "medium"
        else:
            strategy = strategies[3]
            priority = "low"

        overcome_strategies.append({
            "skill_name": w["skill_name"],
            "current_mastery": w["mastery_score"],
            "strategy": strategy,
            "priority": priority,
            "estimated_hours": DIFFICULTY_HOURS.get(w["difficulty"], 10),
        })

    # ── STEP 7: Build weekly plan ─────────────────────────────────────────────
    # Assume student can study 15 hours/week
    # Group skills by subject for focused learning blocks
    HOURS_PER_WEEK = 15
    weekly_plan = []
    week = 1
    hours_used = 0
    current_week_skills = []
    current_week_subjects = set()

    for w in weaknesses:
        skill_hours = DIFFICULTY_HOURS.get(w["difficulty"], 10) * w["gap"]  # scale by gap
        skill_hours = max(3, round(skill_hours))  # minimum 3 hours per skill

        if hours_used + skill_hours > HOURS_PER_WEEK and current_week_skills:
            # Finalize this week
            weekly_plan.append(_build_week(week, current_week_skills, current_week_subjects, career_goal))
            week += 1
            hours_used = 0
            current_week_skills = []
            current_week_subjects = set()

        current_week_skills.append(w["skill_name"])
        current_week_subjects.add(w["subject"])
        hours_used += skill_hours

    # Add remaining skills
    if current_week_skills:
        weekly_plan.append(_build_week(week, current_week_skills, current_week_subjects, career_goal))

    # ── STEP 8: Compute ML confidence score ───────────────────────────────────
    # Confidence is higher when:
    # - More skills have been assessed (more data)
    # - Mastery scores are spread out (not all 0.3 defaults)
    # - Career goal is set
    data_completeness = min(1.0, len(mastery_dict) / 10.0)  # 10 skills = full confidence
    score_variance = _variance(list(mastery_dict.values()))
    variance_score = min(1.0, score_variance * 10)  # higher variance = more reliable data
    career_bonus = 0.1 if career_goal else 0.0
    ml_confidence = round(data_completeness * 0.5 + variance_score * 0.4 + career_bonus, 3)

    # ── STEP 9: Estimate completion time ─────────────────────────────────────
    total_hours_needed = sum(
        DIFFICULTY_HOURS.get(w["difficulty"], 10) * w["gap"] for w in weaknesses
    )
    predicted_weeks = max(1, round(total_hours_needed / HOURS_PER_WEEK))

    print(f"✅ Plan generated: {len(weekly_plan)} weeks, confidence: {ml_confidence}")

    return {
        "student_id": student_id,
        "overall_score": overall_score,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "overcome_strategies": overcome_strategies,
        "weekly_plan": weekly_plan,
        "predicted_completion_weeks": predicted_weeks,
        "ml_confidence": ml_confidence,
        "career_goal": career_goal,
        "total_skills_assessed": len(mastery_dict),
    }


def _build_week(week_num: int, skills: list, subjects: set, career_goal: str) -> dict:
    """Build a single week's plan entry."""
    subject_str = " + ".join(sorted(subjects))
    focus = f"Week {week_num}: {subject_str} Focus"

    # Generate goal based on skills
    if len(skills) == 1:
        goal = f"Achieve 70%+ mastery in {skills[0]}"
    else:
        goal = f"Build foundation in {', '.join(skills[:2])}{'...' if len(skills) > 2 else ''}"

    # Resource suggestions based on subjects
    resources = []
    for subject in subjects:
        if subject == "Math":
            resources.append("Khan Academy Math")
        elif subject == "Programming":
            resources.append("LeetCode / HackerRank")
        elif subject == "AI":
            resources.append("Kaggle Learn / fast.ai")
    if career_goal:
        resources.append(f"Search: '{career_goal} projects for beginners'")

    return {
        "week": week_num,
        "focus": focus,
        "skills": skills,
        "goal": goal,
        "resources": list(set(resources))[:3],
        "estimated_hours": 15,
    }


def _variance(values: list) -> float:
    """Compute variance of a list of numbers."""
    if len(values) < 2:
        return 0.0
    mean = sum(values) / len(values)
    return sum((v - mean) ** 2 for v in values) / len(values)
