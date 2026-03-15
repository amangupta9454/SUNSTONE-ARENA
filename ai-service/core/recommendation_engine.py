# recommendation_engine.py — Personalized Topic Recommendation Engine
#
# This module decides WHAT the student should study next.
# It combines 3 factors into a score:
#   1. Mastery Gap (50% weight): How much does the student still need to learn?
#   2. Career Boost (30% weight): Is this skill relevant to their career goal?
#   3. Difficulty Fit (20% weight): Is the difficulty appropriate for their level?

import os
from pymongo import MongoClient
import core.knowledge_graph as kg_module
from core.knowledge_graph import get_unlocked_skills, build_skill_graph


# ── Career → Skill Mapping ────────────────────────────────────────────────────
# Maps career goals to the skill names most relevant to that career.
# When a student sets their career goal, we boost skills in this list.
CAREER_SKILL_MAP = {
    "data scientist": ["Statistics", "Linear Algebra", "ML Fundamentals", "Neural Networks", "Natural Language Processing"],
    "machine learning engineer": ["ML Fundamentals", "Neural Networks", "Linear Algebra", "Algorithms", "Reinforcement Learning"],
    "web developer": ["Python Basics", "Data Structures", "Algorithms"],
    "ai researcher": ["Neural Networks", "Reinforcement Learning", "Natural Language Processing", "Linear Algebra", "ML Fundamentals"],
    "data analyst": ["Statistics", "Algebra", "Python Basics", "ML Fundamentals"],
    "software engineer": ["Data Structures", "Algorithms", "Python Basics"],
    "": [],  # No career goal = no boost
}


def get_db():
    """Connect to MongoDB. Same helper as in knowledge_graph.py."""
    client = MongoClient(os.getenv("MONGODB_URI"))
    return client["edupath"]


def compute_recommendations(student_id: str, mastery_map: list, career_goal: str = "") -> list:
    """
    Compute the top 3 recommended skills for a student to study next.
    
    Args:
        student_id: The student's MongoDB ID
        mastery_map: List of { skill_id, score } dicts (current mastery)
        career_goal: String like "data scientist" or "web developer"
    
    Returns:
        List of up to 3 TopicRecommendation dicts, sorted by score (highest first)
    
    JavaScript equivalent concept:
    const computeRecommendations = (studentId, masteryMap, careerGoal) => {
        const masteryDict = Object.fromEntries(masteryMap.map(m => [m.skill_id, m.score]));
        const unlocked = getUnlockedSkills(graph, masteryDict);
        const scored = unlocked.map(skillId => scoreSkill(skillId, masteryDict, careerGoal));
        return scored.sort((a, b) => b.score - a.score).slice(0, 3);
    }
    """
    
    # ── STEP 1: Build mastery dictionary for fast lookups ─────────────────────
    # Convert list [{ skill_id: "abc", score: 0.5 }] to dict { "abc": 0.5 }
    # This is like: const masteryDict = Object.fromEntries(masteryMap.map(...))
    mastery_dict = {item["skill_id"]: item["score"] for item in mastery_map}
    
    print(f"🎯 Computing recommendations for student {student_id}, career: '{career_goal}'")
    print(f"   Mastery map has {len(mastery_dict)} skills")
    
    # ── STEP 2: Get all unlocked skills via graph traversal ───────────────────
    # Use the knowledge graph to find skills the student CAN study right now
    # (all prerequisites are mastered, but the skill itself is not yet mastered)
    if kg_module.skill_graph is None or kg_module.skill_graph.number_of_nodes() == 0:
        build_skill_graph()
    
    unlocked_skill_ids = get_unlocked_skills(kg_module.skill_graph, mastery_dict, threshold=0.7)
    print(f"   Unlocked skills: {len(unlocked_skill_ids)}")
    
    if not unlocked_skill_ids:
        print("   No unlocked skills found — returning empty recommendations")
        return []
    
    # ── STEP 3: Fetch skill metadata from MongoDB ─────────────────────────────
    # We need skill names and difficulty levels to compute scores
    try:
        db = get_db()
        from bson import ObjectId
        
        # Convert string IDs to ObjectId for MongoDB query
        object_ids = []
        for sid in unlocked_skill_ids:
            try:
                object_ids.append(ObjectId(sid))
            except Exception:
                pass  # Skip invalid IDs
        
        skills_data = list(db["skillnodes"].find({"_id": {"$in": object_ids}}))
        
        # Build a lookup dict: skill_id_string → skill document
        skills_lookup = {str(s["_id"]): s for s in skills_data}
        
    except Exception as e:
        print(f"❌ Failed to fetch skill data: {e}")
        return []
    
    # ── STEP 4: Score each unlocked skill ─────────────────────────────────────
    # Formula: score = (mastery_gap * 0.5) + (career_boost * 0.3) + (difficulty_fit * 0.2)
    
    # Get the list of career-relevant skill names (lowercase for comparison)
    career_key = career_goal.lower().strip()
    relevant_skills = [s.lower() for s in CAREER_SKILL_MAP.get(career_key, [])]
    
    # Calculate the student's average mastery to determine their "level"
    avg_mastery = sum(mastery_dict.values()) / len(mastery_dict) if mastery_dict else 0.3
    
    scored_skills = []
    
    for skill_id in unlocked_skill_ids:
        skill = skills_lookup.get(skill_id)
        if not skill:
            continue  # Skip if we couldn't find this skill in DB
        
        skill_name = skill.get("name", "Unknown")
        difficulty = skill.get("difficulty", 3)
        current_mastery = mastery_dict.get(skill_id, 0.3)
        
        # Factor 1: Mastery Gap (weight: 50%)
        # Higher gap = more important to study
        # Gap of 1.0 means student knows nothing; gap of 0.0 means fully mastered
        mastery_gap = 1.0 - current_mastery
        
        # Factor 2: Career Boost (weight: 30%)
        # 1.0 if this skill is relevant to career goal, 0.0 if not
        career_boost = 1.0 if skill_name.lower() in relevant_skills else 0.0
        
        # Factor 3: Difficulty Fit (weight: 20%)
        # We want to recommend skills that match the student's current level
        # If avg_mastery is low (beginner), recommend easy skills (difficulty 1-2)
        # If avg_mastery is high (advanced), recommend harder skills (difficulty 4-5)
        ideal_difficulty = 1 + (avg_mastery * 4)  # Maps 0.0→1, 1.0→5
        difficulty_distance = abs(difficulty - ideal_difficulty)
        difficulty_fit = max(0.0, 1.0 - (difficulty_distance / 4.0))  # Normalize to 0-1
        
        # Final weighted score
        final_score = (mastery_gap * 0.5) + (career_boost * 0.3) + (difficulty_fit * 0.2)
        
        # Build a human-readable reason string
        reason_parts = []
        if mastery_gap > 0.5:
            reason_parts.append(f"low mastery ({current_mastery:.0%})")
        if career_boost > 0:
            reason_parts.append(f"relevant to your {career_goal} goal")
        if difficulty_fit > 0.7:
            reason_parts.append(f"matches your current level")
        
        reason = "Recommended because of " + ", ".join(reason_parts) if reason_parts else "Good next step in your learning path"
        
        scored_skills.append({
            "skill_id": skill_id,
            "name": skill_name,
            "score": round(final_score, 4),
            "reason": reason,
            "difficulty": difficulty,
        })
        
        print(f"   Scored '{skill_name}': gap={mastery_gap:.2f}, career={career_boost:.1f}, fit={difficulty_fit:.2f} → {final_score:.3f}")
    
    # ── STEP 5: Sort by score and return top 3 ────────────────────────────────
    # Python's sort is like JavaScript's .sort((a, b) => b.score - a.score)
    scored_skills.sort(key=lambda x: x["score"], reverse=True)
    
    top_3 = scored_skills[:3]
    print(f"✅ Top recommendations: {[s['name'] for s in top_3]}")
    
    return top_3
