<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1100px;margin:0 auto;">

<div style="text-align:center;padding:32px 0 20px;">
  <h1 style="font-size:2.4em;color:#d2a8ff;margin:0 0 8px;">🧠 EduPath AI — Core Algorithms</h1>
  <p style="color:#8b949e;font-size:1.1em;margin:0 0 16px;">Bayesian Knowledge Tracing · Knowledge Graph · Recommendation Engine · Plan Generator</p>
  <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
    <span style="background:#6e40c9;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">BKT</span>
    <span style="background:#1f6feb;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">NetworkX DAG</span>
    <span style="background:#238636;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">Topological Sort</span>
    <span style="background:#b08800;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">Weighted Scoring</span>
  </div>
</div>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- BKT Flow SVG -->
<h2 style="color:#79c0ff;font-size:1.5em;">📐 BKT Update Flow</h2>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 200" style="width:100%;max-width:820px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="bkta" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#d2a8ff"/>
    </marker>
  </defs>
  <text x="410" y="22" text-anchor="middle" fill="#d2a8ff" font-size="13" font-family="monospace" font-weight="bold">Bayesian Knowledge Tracing — Update Cycle</text>
  <!-- Boxes -->
  <rect x="20" y="50" width="130" height="50" rx="6" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="85" y="72" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace" font-weight="bold">Student Answer</text>
  <text x="85" y="88" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">correct / incorrect</text>
  <line x1="150" y1="75" x2="185" y2="75" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#bkta)"/>
  <rect x="185" y="50" width="140" height="50" rx="6" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="255" y="68" text-anchor="middle" fill="#d2a8ff" font-size="10" font-family="monospace" font-weight="bold">Prior P(L₀)</text>
  <text x="255" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Fetch from MongoDB</text>
  <text x="255" y="96" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">StudentMastery.mastery_score</text>
  <line x1="325" y1="75" x2="360" y2="75" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#bkta)"/>
  <rect x="360" y="50" width="160" height="50" rx="6" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="440" y="68" text-anchor="middle" fill="#d2a8ff" font-size="10" font-family="monospace" font-weight="bold">Bayesian Update</text>
  <text x="440" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">P(L|correct) or P(L|wrong)</text>
  <text x="440" y="96" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">using slip + guess params</text>
  <line x1="520" y1="75" x2="555" y2="75" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#bkta)"/>
  <rect x="555" y="50" width="130" height="50" rx="6" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="620" y="68" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace" font-weight="bold">Transit Update</text>
  <text x="620" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">P(L_new) = P(L) + (1-P(L))</text>
  <text x="620" y="96" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">× P(transit)</text>
  <line x1="685" y1="75" x2="720" y2="75" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#bkta)"/>
  <rect x="720" y="50" width="80" height="50" rx="6" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="760" y="72" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace" font-weight="bold">Write DB</text>
  <text x="760" y="88" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">mastery_score</text>
  <!-- Parameters label -->
  <text x="410" y="145" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Parameters per skill: P(transit) = 0.1 · P(slip) = 0.1 · P(guess) = 0.2 · P(L₀) = 0.1</text>
  <text x="410" y="163" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Mastery threshold: 0.95 → skill marked as mastered · Updates run per answer in assessment loop</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- Knowledge Graph SVG -->
<h2 style="color:#79c0ff;font-size:1.5em;">🕸️ Knowledge Graph Structure</h2>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 220" style="width:100%;max-width:820px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="kga" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
  </defs>
  <text x="410" y="22" text-anchor="middle" fill="#d2a8ff" font-size="13" font-family="monospace" font-weight="bold">Knowledge Graph — Skill DAG with Mastery States</text>
  <!-- Root node -->
  <circle cx="100" cy="110" r="28" fill="#161b22" stroke="#8b949e" stroke-width="2"/>
  <text x="100" y="107" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Variables</text>
  <text x="100" y="120" text-anchor="middle" fill="#8b949e" font-size="8" font-family="monospace">🔒 locked</text>
  <!-- Level 2 -->
  <circle cx="240" cy="70" r="28" fill="#161b22" stroke="#58a6ff" stroke-width="2"/>
  <text x="240" y="67" text-anchor="middle" fill="#58a6ff" font-size="9" font-family="monospace">Loops</text>
  <text x="240" y="80" text-anchor="middle" fill="#58a6ff" font-size="8" font-family="monospace">🔵 unlocked</text>
  <circle cx="240" cy="150" r="28" fill="#161b22" stroke="#ffa657" stroke-width="2"/>
  <text x="240" y="147" text-anchor="middle" fill="#ffa657" font-size="9" font-family="monospace">Functions</text>
  <text x="240" y="160" text-anchor="middle" fill="#ffa657" font-size="8" font-family="monospace">🟡 in-progress</text>
  <!-- Arrows from root -->
  <line x1="128" y1="95" x2="212" y2="78" stroke="#8b949e" stroke-width="1.5" marker-end="url(#kga)"/>
  <line x1="128" y1="125" x2="212" y2="142" stroke="#8b949e" stroke-width="1.5" marker-end="url(#kga)"/>
  <!-- Level 3 -->
  <circle cx="400" cy="70" r="28" fill="#161b22" stroke="#3fb950" stroke-width="2"/>
  <text x="400" y="67" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">Arrays</text>
  <text x="400" y="80" text-anchor="middle" fill="#3fb950" font-size="8" font-family="monospace">🟢 mastered</text>
  <circle cx="400" cy="150" r="28" fill="#161b22" stroke="#58a6ff" stroke-width="2"/>
  <text x="400" y="147" text-anchor="middle" fill="#58a6ff" font-size="9" font-family="monospace">OOP</text>
  <text x="400" y="160" text-anchor="middle" fill="#58a6ff" font-size="8" font-family="monospace">🔵 unlocked</text>
  <line x1="268" y1="70" x2="372" y2="70" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#kga)"/>
  <line x1="268" y1="150" x2="372" y2="150" stroke="#ffa657" stroke-width="1.5" marker-end="url(#kga)"/>
  <!-- Level 4 -->
  <circle cx="560" cy="110" r="28" fill="#161b22" stroke="#8b949e" stroke-width="2"/>
  <text x="560" y="107" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Algorithms</text>
  <text x="560" y="120" text-anchor="middle" fill="#8b949e" font-size="8" font-family="monospace">🔒 locked</text>
  <line x1="428" y1="85" x2="532" y2="100" stroke="#3fb950" stroke-width="1.5" marker-end="url(#kga)"/>
  <line x1="428" y1="140" x2="532" y2="120" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#kga)"/>
  <!-- Legend -->
  <circle cx="640" cy="80" r="8" fill="#161b22" stroke="#8b949e" stroke-width="1.5"/>
  <text x="655" y="84" fill="#8b949e" font-size="9" font-family="monospace">Locked (prereq not met)</text>
  <circle cx="640" cy="105" r="8" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="655" y="109" fill="#58a6ff" font-size="9" font-family="monospace">Unlocked (ready to study)</text>
  <circle cx="640" cy="130" r="8" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="655" y="134" fill="#ffa657" font-size="9" font-family="monospace">In-Progress (mastery &lt; 0.95)</text>
  <circle cx="640" cy="155" r="8" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="655" y="159" fill="#3fb950" font-size="9" font-family="monospace">Mastered (mastery ≥ 0.95)</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- Files -->
<h2 style="color:#79c0ff;font-size:1.5em;">📁 Files</h2>

<table style="border-collapse:collapse;width:100%;margin:8px 0;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">File</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Algorithm</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Key Functions</th></tr>
<tr>
  <td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">bkt_model.py</td>
  <td style="border:1px solid #30363d;padding:10px;">Bayesian Knowledge Tracing</td>
  <td style="border:1px solid #30363d;padding:10px;font-family:monospace;font-size:0.85em;">update_mastery(student_id, answers[]) → mastery_map</td>
</tr>
<tr>
  <td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">knowledge_graph.py</td>
  <td style="border:1px solid #30363d;padding:10px;">NetworkX DAG + React Flow conversion</td>
  <td style="border:1px solid #30363d;padding:10px;font-family:monospace;font-size:0.85em;">build_graph() → cache · get_graph(student_id) → {nodes, edges}</td>
</tr>
<tr>
  <td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">recommendation_engine.py</td>
  <td style="border:1px solid #30363d;padding:10px;">Weighted scoring + career alignment</td>
  <td style="border:1px solid #30363d;padding:10px;font-family:monospace;font-size:0.85em;">recommend(student_id, mastery_map, career_goal, n=3)</td>
</tr>
<tr>
  <td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">plan_generator.py</td>
  <td style="border:1px solid #30363d;padding:10px;">Topological sort + gap analysis + scheduling</td>
  <td style="border:1px solid #30363d;padding:10px;font-family:monospace;font-size:0.85em;">generate_plan(student_id, mastery_map, career_goal) → {weeks[]}</td>
</tr>
</table>

<h2 style="color:#79c0ff;font-size:1.5em;margin-top:32px;">📐 BKT Parameters</h2>

<table style="border-collapse:collapse;width:100%;margin:8px 0;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Parameter</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Symbol</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Default</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Meaning</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Initial knowledge</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">P(L₀)</td><td style="border:1px solid #30363d;padding:10px;">0.10</td><td style="border:1px solid #30363d;padding:10px;">Probability student already knows skill before any evidence</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Transit</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">P(T)</td><td style="border:1px solid #30363d;padding:10px;">0.10</td><td style="border:1px solid #30363d;padding:10px;">Probability of learning skill from one opportunity</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Slip</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">P(S)</td><td style="border:1px solid #30363d;padding:10px;">0.10</td><td style="border:1px solid #30363d;padding:10px;">Probability of wrong answer despite knowing skill</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Guess</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">P(G)</td><td style="border:1px solid #30363d;padding:10px;">0.20</td><td style="border:1px solid #30363d;padding:10px;">Probability of correct answer without knowing skill</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Mastery threshold</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">θ</td><td style="border:1px solid #30363d;padding:10px;">0.95</td><td style="border:1px solid #30363d;padding:10px;">P(L) above this → skill marked mastered, node turns green</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">
<p style="color:#8b949e;text-align:center;font-size:0.9em;">EduPath AI Core — BKT · NetworkX · Recommendation · Plan Generation</p>

</body>
