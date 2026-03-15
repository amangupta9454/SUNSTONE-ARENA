# plan.py — FastAPI router for learning plan generation
#
# Endpoint: POST /plan/generate
# Calls plan_generator.py which uses PURE ML algorithms (no LLM API)

from fastapi import APIRouter, HTTPException
from models.schemas import PlanGenerateRequest
from core.plan_generator import generate_learning_plan

router = APIRouter()


@router.post("/plan/generate")
async def generate_plan(request: PlanGenerateRequest):
    """
    Generate a personalized learning plan using ML algorithms.
    Uses BKT mastery scores + knowledge graph topology + weighted gap analysis.
    No LLM API calls — pure algorithmic computation.
    """
    try:
        # Convert pydantic objects to plain dicts for the generator
        mastery_map = [
            {"skill_id": item.skill_id, "score": item.score}
            for item in request.mastery_map
        ]

        if not mastery_map:
            raise HTTPException(status_code=400, detail="mastery_map cannot be empty")

        plan = generate_learning_plan(
            student_id=request.student_id,
            mastery_map=mastery_map,
            career_goal=request.career_goal or "",
        )

        return {"success": True, "plan": plan}

    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Plan generation error: {e}")
        raise HTTPException(status_code=500, detail=f"Plan generation failed: {str(e)}")
