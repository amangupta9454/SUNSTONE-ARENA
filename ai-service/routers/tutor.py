# tutor.py — POST /tutor/query (Streaming AI Tutor)
#
# This router handles AI tutoring using Groq AI (OpenAI-compatible API).
# It streams the response back to the client in real-time (like ChatGPT).
#
# Streaming means: instead of waiting for the full response, we send
# each chunk of text as soon as Groq generates it.

import os
import json
import httpx
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from models.schemas import TutorRequest

router = APIRouter()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = "llama3-70b-8192"


def build_system_prompt(topic: str, mastery_score: float) -> str:
    """
    Build an adaptive system prompt based on the student's mastery level.

    - Beginner (< 0.4): Simple language, analogies, step-by-step
    - Intermediate (0.4 - 0.7): Technical terms, examples
    - Advanced (> 0.7): Edge cases, deeper applications, challenges
    """
    if mastery_score < 0.4:
        level_instructions = """
You are teaching a BEGINNER student. Follow these rules:
- Use simple, everyday analogies to explain concepts
- Break down every concept into small, numbered steps
- Avoid jargon — if you must use a technical term, immediately explain it in plain English
- Be encouraging and patient
- Use short sentences
- Give one concrete real-world example for every concept
"""
    elif mastery_score < 0.7:
        level_instructions = """
You are teaching an INTERMEDIATE student. Follow these rules:
- Use proper technical terminology but briefly explain any advanced terms
- Provide code examples or mathematical notation where helpful
- Connect new concepts to things they likely already know
- Give practical examples showing real-world applications
- Encourage deeper thinking with "what if" scenarios
"""
    else:
        level_instructions = """
You are teaching an ADVANCED student. Follow these rules:
- Assume strong foundational knowledge — skip basic explanations
- Discuss edge cases, limitations, and nuances
- Challenge them with thought-provoking questions
- Reference research papers, advanced techniques, or cutting-edge developments
- Encourage them to think about trade-offs and design decisions
- Discuss how this topic connects to other advanced areas
"""

    return f"""You are EduPath AI Tutor, an expert in {topic}.
{level_instructions}

IMPORTANT: Always end your response with ONE follow-up question to check understanding or encourage deeper thinking.
Keep your response focused and under 400 words unless the question requires more detail.
"""


def generate_fallback_response(topic: str, question: str) -> str:
    """Returns a helpful hardcoded response if the Groq API fails."""
    return f"""I'm having trouble connecting to my AI engine right now, but here's what I can tell you about {topic}:

**Your question:** {question}

**General guidance:**
{topic} is an important concept in your learning path. Here are some steps to explore it:

1. Start with the official documentation or a beginner tutorial
2. Try to implement a simple example yourself
3. Look for visual explanations on YouTube (search "{topic} explained")
4. Practice with small exercises before tackling complex problems

**Recommended resources:**
- Khan Academy for foundational concepts
- YouTube for visual explanations
- Official documentation for technical details
- Stack Overflow for specific questions

**Follow-up question:** What specific aspect of {topic} are you finding most challenging right now?

*(Note: AI tutor is temporarily unavailable. Please try again in a moment.)*
"""


@router.post("/tutor/query")
async def tutor_query(request: TutorRequest):
    """
    POST /tutor/query

    Streams an AI-generated tutoring response back to the client.

    Request body:
    {
        "question": "What is backpropagation?",
        "topic": "Neural Networks",
        "mastery_score": 0.35,
        "student_id": "abc123"
    }
    """
    question = request.question
    topic = request.topic
    mastery_score = request.mastery_score
    student_id = request.student_id

    print(f"🤖 Tutor query: student={student_id}, topic='{topic}', mastery={mastery_score:.2f}")
    print(f"   Question: {question[:100]}...")

    system_prompt = build_system_prompt(topic, mastery_score)

    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question},
        ],
        "stream": True,
        "max_tokens": 1024,
        "temperature": 0.7,
    }

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }

    async def stream_groq_response():
        """
        Async generator that streams SSE chunks from Groq and yields text deltas.
        Groq returns Server-Sent Events lines like:
            data: {"choices":[{"delta":{"content":"Hello"}}]}
        We parse each line and yield only the content string.
        """
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                async with client.stream(
                    "POST", GROQ_API_URL, json=payload, headers=headers
                ) as response:
                    response.raise_for_status()
                    async for line in response.aiter_lines():
                        if not line.startswith("data:"):
                            continue
                        data = line[len("data:"):].strip()
                        if data == "[DONE]":
                            break
                        try:
                            chunk = json.loads(data)
                            delta = chunk["choices"][0]["delta"]
                            content = delta.get("content", "")
                            if content:
                                yield content
                        except (json.JSONDecodeError, KeyError, IndexError):
                            continue

            print(f"✅ Tutor stream completed for student {student_id}")

        except Exception as e:
            print(f"❌ Groq API error: {e}")
            yield generate_fallback_response(topic, question)

    return StreamingResponse(
        stream_groq_response(),
        media_type="text/plain",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )
