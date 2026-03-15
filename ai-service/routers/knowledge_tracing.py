# knowledge_tracing.py — POST /mastery/update
#
# This router receives student answers, runs BKT to update mastery scores,
# saves the results to MongoDB, and returns the updated scores.

import os
from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from bson import ObjectId
from models.schemas import MasteryUpdateRequest, MasteryUpdateResponse, MasteryScore
from core.bkt_model import bkt  # Import the singleton BKT model instance

# Create a router (like express.Router() in Node.js)
router = APIRouter()


def get_db():
    """Connect to MongoDB and return the database."""
    client = MongoClient(os.getenv("MONGODB_URI"))
    return client["edupath"]


@router.post("/mastery/update", response_model=MasteryUpdateResponse)
async def update_mastery(request: MasteryUpdateRequest):
    """
    POST /mastery/update
    
    Receives a list of student answers, groups them by skill,
    runs BKT to compute new mastery scores, saves to DB, and returns results.
    
    Request body:
    {
        "student_id": "abc123",
        "answers": [
            { "skill_id": "skill1", "is_correct": true, "response_time_ms": 3000 },
            { "skill_id": "skill1", "is_correct": false, "response_time_ms": 5000 },
            { "skill_id": "skill2", "is_correct": true, "response_time_ms": 2000 }
        ]
    }
    """
    try:
        db = get_db()
        student_id = request.student_id
        answers = request.answers
        
        print(f"📊 Updating mastery for student {student_id}: {len(answers)} answers")
        
        # ── STEP 1: Group answers by skill_id ─────────────────────────────────
        # Like: answers.reduce((acc, a) => { acc[a.skill_id] = [...(acc[a.skill_id] || []), a.is_correct]; return acc; }, {})
        skill_answers = {}  # { skill_id: [True, False, True, ...] }
        
        for answer in answers:
            sid = answer.skill_id
            if sid not in skill_answers:
                skill_answers[sid] = []
            skill_answers[sid].append(answer.is_correct)
        
        print(f"   Skills to update: {list(skill_answers.keys())}")
        
        # ── STEP 2: For each skill, fetch current mastery and run BKT ─────────
        mastery_updates = []
        
        for skill_id, responses in skill_answers.items():
            # Try to convert skill_id string to ObjectId for MongoDB query
            try:
                skill_obj_id = ObjectId(skill_id)
            except Exception:
                print(f"   ⚠️ Invalid skill_id format: {skill_id}, skipping")
                continue
            
            # Fetch current mastery from student_mastery collection
            # If no record exists, use the BKT default (P_L0 = 0.3)
            existing = db["studentmasteries"].find_one({
                "student_id": ObjectId(student_id),
                "skill_id": skill_obj_id,
            })
            
            current_mastery = existing["mastery_score"] if existing else bkt.P_L0
            print(f"   Skill {skill_id}: current mastery = {current_mastery:.3f}, {len(responses)} new responses")
            
            # Run BKT bulk update — processes all responses for this skill in sequence
            new_mastery = bkt.bulk_update(current_mastery, responses)
            print(f"   Skill {skill_id}: new mastery = {new_mastery:.3f}")
            
            # ── STEP 3: Upsert mastery to MongoDB ─────────────────────────────
            # upsert=True means: insert if not exists, update if exists
            # This is like Mongoose's findOneAndUpdate with { upsert: true }
            db["studentmasteries"].update_one(
                {
                    "student_id": ObjectId(student_id),
                    "skill_id": skill_obj_id,
                },
                {
                    "$set": {
                        "mastery_score": new_mastery,
                        "student_id": ObjectId(student_id),
                        "skill_id": skill_obj_id,
                    }
                },
                upsert=True,
            )
            
            mastery_updates.append(MasteryScore(skill_id=skill_id, score=round(new_mastery, 4)))
        
        print(f"✅ Mastery updated for {len(mastery_updates)} skills")
        
        return MasteryUpdateResponse(mastery_updates=mastery_updates)
    
    except Exception as e:
        print(f"❌ Error in update_mastery: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to update mastery: {str(e)}")
