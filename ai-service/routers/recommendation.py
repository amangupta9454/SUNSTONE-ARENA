# recommendation.py — POST /recommend and GET /knowledge-graph/{student_id}
#
# This router handles:
#   1. Getting personalized topic recommendations
#   2. Fetching the student's knowledge graph for visualization

import os
from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from bson import ObjectId
from models.schemas import RecommendRequest, RecommendResponse, TopicRecommendation, KnowledgeGraphResponse
from core.recommendation_engine import compute_recommendations
import core.knowledge_graph as kg_module
from core.knowledge_graph import get_graph_for_student, build_skill_graph

router = APIRouter()


def get_db():
    """Connect to MongoDB and return the database."""
    client = MongoClient(os.getenv("MONGODB_URI"))
    return client["edupath"]


@router.post("/recommend", response_model=RecommendResponse)
async def recommend_topics(request: RecommendRequest):
    """
    POST /recommend
    
    Returns the top 3 recommended skills for the student to study next,
    based on their mastery scores, career goal, and the knowledge graph.
    
    Request body:
    {
        "student_id": "abc123",
        "mastery_map": [
            { "skill_id": "skill1", "score": 0.8 },
            { "skill_id": "skill2", "score": 0.3 }
        ],
        "career_goal": "data scientist"
    }
    """
    try:
        student_id = request.student_id
        career_goal = request.career_goal or ""
        
        # Convert Pydantic MasteryScore objects to plain dicts for the engine
        # Like: masteryMap.map(m => ({ skill_id: m.skill_id, score: m.score }))
        mastery_map = [{"skill_id": m.skill_id, "score": m.score} for m in request.mastery_map]
        
        print(f"🎯 Recommendation request for student {student_id}, career: '{career_goal}'")
        
        # Call the recommendation engine
        recommendations = compute_recommendations(student_id, mastery_map, career_goal)
        
        # Convert plain dicts to Pydantic TopicRecommendation objects
        topic_recs = [
            TopicRecommendation(
                skill_id=r["skill_id"],
                name=r["name"],
                score=r["score"],
                reason=r["reason"],
                difficulty=r["difficulty"],
            )
            for r in recommendations
        ]
        
        return RecommendResponse(recommendations=topic_recs)
    
    except Exception as e:
        print(f"❌ Error in recommend_topics: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to compute recommendations: {str(e)}")


@router.get("/knowledge-graph/{student_id}")
async def get_knowledge_graph(student_id: str):
    """
    GET /knowledge-graph/{student_id}
    
    Returns the student's personalized knowledge graph as nodes + edges
    formatted for React Flow visualization.
    
    The nodes are colored by status:
    - locked: prerequisites not met
    - unlocked: ready to study
    - in_progress: partially learned
    - mastered: fully learned (>= 0.7)
    """
    try:
        db = get_db()
        
        # Fetch all mastery records for this student from MongoDB
        try:
            student_obj_id = ObjectId(student_id)
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid student_id format")
        
        mastery_records = list(db["studentmasteries"].find({"student_id": student_obj_id}))
        
        # Build mastery dict: { skill_id_string: mastery_score }
        mastery_dict = {
            str(record["skill_id"]): record["mastery_score"]
            for record in mastery_records
        }
        
        print(f"🕸️ Building graph for student {student_id}: {len(mastery_dict)} mastery records")
        
        # Ensure the graph is built
        if kg_module.skill_graph is None or kg_module.skill_graph.number_of_nodes() == 0:
            build_skill_graph()
        
        # Get the React Flow-compatible graph
        graph_data = get_graph_for_student(student_id, mastery_dict)
        
        return graph_data
    
    except HTTPException:
        raise  # Re-raise HTTP exceptions as-is
    except Exception as e:
        print(f"❌ Error in get_knowledge_graph: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch knowledge graph: {str(e)}")
