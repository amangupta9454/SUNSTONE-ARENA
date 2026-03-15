# main.py — FastAPI Application Entry Point
#
# This is the equivalent of server.js in Node.js.
# It creates the FastAPI app, registers all routers, and starts the server.
#
# ─────────────────────────────────────────────────────────────────────────────
# HOW TO RUN THIS SERVICE:
#   uvicorn main:app --reload --port 8000
#
# --reload means: auto-restart when you save a file (like nodemon)
# --port 8000 means: listen on port 8000
# ──────────────────────────────────────────────────────────

import os
from dotenv import load_dotenv

# Load environment variables from .env file FIRST (before importing anything else)
# This is like require('dotenv').config() in Node.js
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

# Import all routers (like require('./routes/...') in Node.js)
from routers.knowledge_tracing import router as knowledge_tracing_router
from routers.recommendation import router as recommendation_router
from routers.tutor import router as tutor_router
from routers.plan import router as plan_router
from routers.intelligence import router as intelligence_router
from core.knowledge_graph import build_skill_graph


# ── Startup/Shutdown lifecycle ────────────────────────────────────────────────
# This runs code BEFORE the server starts accepting requests (like app.listen callback in Node.js)
# We use it to pre-build the knowledge graph so it's ready when requests come in
@asynccontextmanager
async def lifespan(app: FastAPI):
    # ── STARTUP ──────────────────────────────────────────────────────────────
    print("🚀 EduPath AI Service starting up...")
    print("📊 Building knowledge graph from database...")
    
    try:
        build_skill_graph()
        print("✅ Knowledge graph ready")
    except Exception as e:
        print(f"⚠️ Could not build knowledge graph on startup: {e}")
        print("   Graph will be built on first request instead")
    
    print("✅ AI Service ready to accept requests")
    
    yield  # The app runs here (between startup and shutdown)
    
    # ── SHUTDOWN ─────────────────────────────────────────────────────────────
    print("👋 AI Service shutting down...")


# ── Create FastAPI app ────────────────────────────────────────────────────────
# FastAPI is like Express — it handles routing, middleware, and request/response
app = FastAPI(
    title="EduPath AI Service",
    description="AI microservice for Bayesian Knowledge Tracing, recommendations, and tutoring",
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS Middleware ───────────────────────────────────────────────────────────
# Allow requests from any origin (like cors({ origin: '*' }) in Express)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],        # Allow GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],        # Allow all headers
)

# ── Register Routers ──────────────────────────────────────────────────────────
# Like app.use('/api/...', router) in Express
# We don't add a prefix here because the routes already have their paths defined
app.include_router(knowledge_tracing_router)
app.include_router(recommendation_router)
app.include_router(tutor_router)
app.include_router(plan_router)
app.include_router(intelligence_router)  # /intelligence/*

# ── Health Check Endpoint ─────────────────────────────────────────────────────
# GET /health — used by Node.js backend to verify this service is running
@app.get("/health")
async def health_check():
    """Simple health check endpoint."""
    return {
        "status": "ok",
        "service": "edupath-ai-service",
        "version": "1.0.0",
    }

# ── Root Endpoint ─────────────────────────────────────────────────────────────
@app.get("/")
async def root():
    """Root endpoint — shows available routes."""
    return {
        "message": "EduPath AI Service is running",
        "endpoints": {
            "health": "GET /health",
            "update_mastery": "POST /mastery/update",
            "recommend": "POST /recommend",
            "knowledge_graph": "GET /knowledge-graph/{student_id}",
            "tutor": "POST /tutor/query",
            "plan_generate": "POST /plan/generate",
            "docs": "GET /docs",
        }
    }
