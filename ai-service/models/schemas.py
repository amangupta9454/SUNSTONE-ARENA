# schemas.py — Pydantic models (think of these like TypeScript interfaces)
# Pydantic validates incoming request bodies automatically, just like Joi/Zod in Node.js

from pydantic import BaseModel
from typing import List, Optional


# ─── Mastery Update (BKT) ─────────────────────────────────────────────────────

# Represents a single answer to one question
class AnswerItem(BaseModel):
    skill_id: str           # MongoDB ObjectId as string
    is_correct: bool        # True if the student answered correctly
    response_time_ms: Optional[int] = 0  # How long they took (optional)


# The full request body for POST /mastery/update
class MasteryUpdateRequest(BaseModel):
    student_id: str         # MongoDB ObjectId as string
    answers: List[AnswerItem]  # List of answers from the assessment


# A single mastery score result
class MasteryScore(BaseModel):
    skill_id: str
    score: float            # Value between 0.0 and 1.0


# The response returned after updating mastery
class MasteryUpdateResponse(BaseModel):
    mastery_updates: List[MasteryScore]


# ─── Recommendations ──────────────────────────────────────────────────────────

# The request body for POST /recommend
class RecommendRequest(BaseModel):
    student_id: str
    mastery_map: List[MasteryScore]     # Current mastery scores for all skills
    career_goal: Optional[str] = ""     # e.g. "data scientist", "web developer"


# A single topic recommendation
class TopicRecommendation(BaseModel):
    skill_id: str
    name: str               # Skill name, e.g. "Neural Networks"
    score: float            # Recommendation score (higher = more recommended)
    reason: str             # Human-readable explanation
    difficulty: int         # 1-5


# The response for POST /recommend
class RecommendResponse(BaseModel):
    recommendations: List[TopicRecommendation]


# ─── AI Tutor ─────────────────────────────────────────────────────────────────

# The request body for POST /tutor/query
class TutorRequest(BaseModel):
    question: str           # The student's question
    topic: str              # The topic/skill being studied
    mastery_score: float    # Student's current mastery (0.0 to 1.0)
    student_id: str         # For logging purposes


# ─── Learning Plan ───────────────────────────────────────────────────────────

# A single mastery score item (reused in plan request)
class MasteryItem(BaseModel):
    skill_id: str
    score: float  # 0.0 to 1.0


# Request body for POST /plan/generate
class PlanGenerateRequest(BaseModel):
    student_id: str
    mastery_map: List[MasteryItem]   # All current mastery scores
    career_goal: Optional[str] = ""  # e.g. "data scientist"


# ─── Knowledge Graph ──────────────────────────────────────────────────────────

# A single node in the knowledge graph (for React Flow visualization)
class KnowledgeGraphNode(BaseModel):
    id: str
    label: str              # Skill name
    mastery: float          # Student's mastery score for this skill
    subject: str            # "Math", "Programming", "AI"
    difficulty: int         # 1-5
    status: str             # "locked", "unlocked", "in_progress", "mastered"


# The full graph response
class KnowledgeGraphResponse(BaseModel):
    nodes: List[dict]       # List of node objects for React Flow
    edges: List[dict]       # List of edge objects for React Flow
