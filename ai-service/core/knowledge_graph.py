# knowledge_graph.py — Skill Knowledge Graph using NetworkX
#
# NetworkX is a Python library for working with graphs (nodes + edges).
# Think of it like a directed graph where:
#   - Each NODE is a skill (e.g., "Algebra", "ML Fundamentals")
#   - Each EDGE means "you need to learn A before B" (prerequisite relationship)
#
# Example: Algebra → Statistics → ML Fundamentals
# This means: learn Algebra first, then Statistics, then ML Fundamentals

import os
import networkx as nx  # Graph library (like a specialized data structure library)
from pymongo import MongoClient
from bson import ObjectId  # MongoDB uses ObjectId for _id fields

# ── Global cached graph ───────────────────────────────────────────────────────
# This variable holds the graph in memory after startup.
# We build it once and reuse it (like a module-level cache in Node.js).
skill_graph = None

# ── MongoDB connection ────────────────────────────────────────────────────────
def get_db():
    """
    Connect to MongoDB and return the database object.
    Like: const db = mongoose.connection.db in Node.js
    """
    client = MongoClient(os.getenv("MONGODB_URI"))
    return client["edupath"]  # database name


def build_skill_graph():
    """
    Fetch all skills from MongoDB and build a directed graph.
    
    This runs ONCE at startup and caches the result in the global 'skill_graph' variable.
    
    The graph looks like:
        algebra_id ──→ statistics_id
        algebra_id ──→ linear_algebra_id
        statistics_id ──→ ml_fundamentals_id
        python_basics_id ──→ ml_fundamentals_id
    
    Returns:
        A NetworkX DiGraph (directed graph) object
    """
    global skill_graph
    
    try:
        db = get_db()
        # Fetch all skill documents from MongoDB
        skills = list(db["skillnodes"].find({}))
        
        print(f"📊 Building knowledge graph with {len(skills)} skills...")
        
        # Create a new directed graph (DiGraph = edges have direction, like arrows)
        G = nx.DiGraph()
        
        # Add each skill as a node with its metadata stored as attributes
        for skill in skills:
            skill_id = str(skill["_id"])  # Convert ObjectId to string
            G.add_node(
                skill_id,
                name=skill.get("name", "Unknown"),
                subject=skill.get("subject", "General"),
                difficulty=skill.get("difficulty", 1),
            )
        
        # Add edges for prerequisites (prerequisite → skill)
        # This means: "you must master the prerequisite before unlocking this skill"
        for skill in skills:
            skill_id = str(skill["_id"])
            prerequisites = skill.get("prerequisites", [])
            
            for prereq_id in prerequisites:
                prereq_str = str(prereq_id)
                # Only add edge if both nodes exist in the graph
                if G.has_node(prereq_str):
                    G.add_edge(prereq_str, skill_id)  # prereq → skill
        
        skill_graph = G
        print(f"✅ Knowledge graph built: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges")
        return G
        
    except Exception as e:
        print(f"❌ Failed to build knowledge graph: {e}")
        # Return an empty graph so the app doesn't crash
        skill_graph = nx.DiGraph()
        return skill_graph


def get_unlocked_skills(graph, mastery_dict: dict, threshold: float = 0.7) -> list:
    """
    Find all skills that the student has UNLOCKED but not yet mastered.
    
    A skill is "unlocked" when ALL its prerequisites have mastery >= threshold (default 0.7).
    A skill is excluded if the student has already mastered it (mastery >= threshold).
    
    Args:
        graph: The NetworkX DiGraph of skills
        mastery_dict: Dict mapping skill_id (string) → mastery_score (float)
                      Example: {"abc123": 0.8, "def456": 0.4}
        threshold: Mastery score needed to consider a skill "mastered" (default 0.7)
    
    Returns:
        List of skill_ids that are unlocked and not yet mastered
    
    JavaScript equivalent:
    const getUnlockedSkills = (graph, masteryDict, threshold = 0.7) => {
        return graph.nodes.filter(skillId => {
            const prereqs = graph.predecessors(skillId);
            const prereqsMet = prereqs.every(p => (masteryDict[p] || 0) >= threshold);
            const notMastered = (masteryDict[skillId] || 0) < threshold;
            return prereqsMet && notMastered;
        });
    }
    """
    unlocked = []
    
    for skill_id in graph.nodes():
        # Get all prerequisite skill IDs (nodes that point TO this skill)
        # In NetworkX, predecessors() gives you the "parents" in a directed graph
        prerequisites = list(graph.predecessors(skill_id))
        
        # Check if ALL prerequisites are mastered
        all_prereqs_met = all(
            mastery_dict.get(prereq_id, 0.0) >= threshold
            for prereq_id in prerequisites
        )
        
        # Check if this skill is NOT yet mastered
        not_yet_mastered = mastery_dict.get(skill_id, 0.0) < threshold
        
        # A skill with no prerequisites is always unlocked (it's a starting skill)
        if all_prereqs_met and not_yet_mastered:
            unlocked.append(skill_id)
    
    return unlocked


def get_graph_for_student(student_id: str, mastery_dict: dict) -> dict:
    """
    Build a React Flow-compatible graph JSON for a specific student.
    
    React Flow expects nodes and edges in this format:
    nodes: [{ id: "abc", data: { label: "Algebra" }, position: { x: 0, y: 0 } }]
    edges: [{ id: "e1", source: "abc", target: "def" }]
    
    We add mastery and status info to each node so the frontend can color them.
    
    Args:
        student_id: The student's MongoDB ID (for logging)
        mastery_dict: Dict mapping skill_id → mastery_score
    
    Returns:
        Dict with 'nodes' and 'edges' arrays ready for React Flow
    """
    global skill_graph
    
    # If graph hasn't been built yet, build it now
    if skill_graph is None or skill_graph.number_of_nodes() == 0:
        build_skill_graph()
    
    graph = skill_graph
    nodes = []
    edges = []
    
    # ── Build nodes ───────────────────────────────────────────────────────────
    # We arrange nodes in a simple grid layout (x, y positions)
    # In a real app, you'd use a proper layout algorithm
    node_list = list(graph.nodes(data=True))  # data=True includes the attributes we stored
    
    for i, (skill_id, attrs) in enumerate(node_list):
        mastery = mastery_dict.get(skill_id, 0.0)
        
        # Determine status based on mastery and prerequisites
        prerequisites = list(graph.predecessors(skill_id))
        prereqs_met = all(mastery_dict.get(p, 0.0) >= 0.7 for p in prerequisites)
        
        if mastery >= 0.7:
            status = "mastered"
        elif mastery > 0.3 and prereqs_met:
            status = "in_progress"
        elif prereqs_met:
            status = "unlocked"
        else:
            status = "locked"
        
        # React Flow node format
        nodes.append({
            "id": skill_id,
            "data": {
                "label": attrs.get("name", "Unknown"),
                "mastery": round(mastery, 3),
                "subject": attrs.get("subject", "General"),
                "difficulty": attrs.get("difficulty", 1),
                "status": status,
            },
            # Simple grid layout: 5 columns, rows of 200px height
            "position": {
                "x": (i % 5) * 220,
                "y": (i // 5) * 150,
            },
            "type": "default",
        })
    
    # ── Build edges ───────────────────────────────────────────────────────────
    for i, (source, target) in enumerate(graph.edges()):
        edges.append({
            "id": f"e{i}-{source[:6]}-{target[:6]}",
            "source": source,
            "target": target,
            "animated": mastery_dict.get(source, 0.0) >= 0.7,  # animate if prereq mastered
            "style": {"stroke": "#6366f1"},
        })
    
    print(f"🕸️ Graph for student {student_id}: {len(nodes)} nodes, {len(edges)} edges")
    
    return {"nodes": nodes, "edges": edges}
