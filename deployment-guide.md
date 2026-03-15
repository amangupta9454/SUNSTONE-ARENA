<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1200px;margin:0 auto;">

<h1 style="font-size:2.4em;color:#58a6ff;border-bottom:3px solid #21262d;padding-bottom:16px;">📦 Deployment Guide</h1>
<p style="color:#8b949e;">EduPath AI | Version 1.0 | March 2026 | Complete step-by-step production deployment</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Prerequisites</h2>
<ul>
<li>Node.js 18+ installed locally</li>
<li>Python 3.10+ installed locally</li>
<li>Git installed</li>
<li>GitHub account with the repository</li>
<li>MongoDB Atlas account (free at mongodb.com/atlas)</li>
<li>Render.com account (free at render.com)</li>
<li>Vercel account (free at vercel.com) OR Netlify account</li>
<li>Google AI Studio account for Gemini API key (aistudio.google.com)</li>
<li>Gmail account for email notifications</li>
</ul>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Step 1 — Set Up MongoDB Atlas</h2>

<p><b>1.1 Create a cluster</b></p>
<ol>
<li>Go to <a href="https://cloud.mongodb.com" style="color:#58a6ff;">cloud.mongodb.com</a> and sign in</li>
<li>Click <b>Create</b> → Select <b>M0 Free</b> tier</li>
<li>Choose a cloud provider (AWS recommended) and region closest to your users</li>
<li>Name your cluster (e.g., <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">edupath-cluster</code>)</li>
<li>Click <b>Create Cluster</b> — takes ~3 minutes</li>
</ol>

<p><b>1.2 Create a database user</b></p>
<ol>
<li>In the left sidebar, click <b>Database Access</b></li>
<li>Click <b>Add New Database User</b></li>
<li>Choose <b>Password</b> authentication</li>
<li>Set username: <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">edupath-admin</code> and a strong password</li>
<li>Set role to <b>Atlas Admin</b> (or <b>readWriteAnyDatabase</b> for production)</li>
<li>Click <b>Add User</b></li>
</ol>

<p><b>1.3 Configure network access</b></p>
<ol>
<li>In the left sidebar, click <b>Network Access</b></li>
<li>Click <b>Add IP Address</b></li>
<li>For development: click <b>Allow Access from Anywhere</b> (0.0.0.0/0)</li>
<li>For production: add Render.com's IP ranges specifically</li>
<li>Click <b>Confirm</b></li>
</ol>

<p><b>1.4 Get the connection string</b></p>
<ol>
<li>Click <b>Connect</b> on your cluster</li>
<li>Choose <b>Connect your application</b></li>
<li>Select <b>Node.js</b> driver, version 5.x or later</li>
<li>Copy the connection string — it looks like:</li>
</ol>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">mongodb+srv://edupath-admin:&lt;password&gt;@edupath-cluster.xxxxx.mongodb.net/edupath?retryWrites=true&w=majority</pre>

<p><b>1.5 Seed the database</b></p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;"># From the backend directory
cd BACKEND/edupath-ai/backend
MONGODB_URI="your_connection_string" node seed.js</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Step 2 — Deploy the Node.js Backend on Render.com</h2>

<p><b>2.1 Create a new Web Service</b></p>
<ol>
<li>Go to <a href="https://render.com" style="color:#58a6ff;">render.com</a> and sign in</li>
<li>Click <b>New +</b> → <b>Web Service</b></li>
<li>Connect your GitHub account and select your repository</li>
<li>Configure the service:</li>
</ol>

<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Setting</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Value</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Name</td><td style="border:1px solid #30363d;padding:10px;">edupath-backend</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Root Directory</td><td style="border:1px solid #30363d;padding:10px;">BACKEND/edupath-ai/backend</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Runtime</td><td style="border:1px solid #30363d;padding:10px;">Node</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Build Command</td><td style="border:1px solid #30363d;padding:10px;">npm install</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Start Command</td><td style="border:1px solid #30363d;padding:10px;">node server.js</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Instance Type</td><td style="border:1px solid #30363d;padding:10px;">Free (or Starter for production)</td></tr>
</table>

<p><b>2.2 Add environment variables</b></p>
<p>In the Render service settings, add these environment variables:</p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">MONGODB_URI        = mongodb+srv://edupath-admin:&lt;pass&gt;@cluster.mongodb.net/edupath
PORT               = 5000
JWT_SECRET         = &lt;generate a 32+ char random string&gt;
FRONTEND_URL       = https://your-app.vercel.app
AI_SERVICE_URL     = https://edupath-ai.onrender.com
EMAIL_USER         = youremail@gmail.com
EMAIL_PASS         = &lt;gmail app password&gt;</pre>

<p><b>2.3 Deploy</b></p>
<ol>
<li>Click <b>Create Web Service</b></li>
<li>Render will build and deploy automatically</li>
<li>Wait for the deploy to complete (~3 minutes)</li>
<li>Test: <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">curl https://edupath-backend.onrender.com/health</code></li>
</ol>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Step 3 — Deploy the Python AI Service on Render.com</h2>

<p><b>3.1 Create another Web Service</b></p>
<ol>
<li>Click <b>New +</b> → <b>Web Service</b></li>
<li>Select the same repository</li>
</ol>

<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Setting</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Value</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Name</td><td style="border:1px solid #30363d;padding:10px;">edupath-ai-service</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Root Directory</td><td style="border:1px solid #30363d;padding:10px;">BACKEND/edupath-ai/ai-service</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Runtime</td><td style="border:1px solid #30363d;padding:10px;">Python 3</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Build Command</td><td style="border:1px solid #30363d;padding:10px;">pip install -r requirements.txt</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Start Command</td><td style="border:1px solid #30363d;padding:10px;">uvicorn main:app --host 0.0.0.0 --port 8000</td></tr>
</table>

<p><b>3.2 Add environment variables</b></p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">MONGODB_URI     = mongodb+srv://edupath-admin:&lt;pass&gt;@cluster.mongodb.net/edupath
GEMINI_API_KEY  = &lt;your Google Gemini API key from aistudio.google.com&gt;</pre>

<p><b>3.3 Get Gemini API Key</b></p>
<ol>
<li>Go to <a href="https://aistudio.google.com" style="color:#58a6ff;">aistudio.google.com</a></li>
<li>Click <b>Get API Key</b> → <b>Create API Key</b></li>
<li>Copy the key and add it to Render environment variables</li>
</ol>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Step 4 — Deploy the Frontend on Vercel</h2>

<p><b>4.1 Import project</b></p>
<ol>
<li>Go to <a href="https://vercel.com" style="color:#58a6ff;">vercel.com</a> and sign in</li>
<li>Click <b>Add New Project</b></li>
<li>Import your GitHub repository</li>
<li>Configure the project:</li>
</ol>

<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Setting</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Value</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Framework Preset</td><td style="border:1px solid #30363d;padding:10px;">Vite</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Root Directory</td><td style="border:1px solid #30363d;padding:10px;">BACKEND/edupath-ai/frontend</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Build Command</td><td style="border:1px solid #30363d;padding:10px;">npm run build</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Output Directory</td><td style="border:1px solid #30363d;padding:10px;">dist</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Install Command</td><td style="border:1px solid #30363d;padding:10px;">npm install</td></tr>
</table>

<p><b>4.2 Add environment variables in Vercel</b></p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">VITE_API_URL = https://edupath-backend.onrender.com</pre>

<p><b>4.3 Configure SPA routing</b></p>
<p>Create <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">BACKEND/edupath-ai/frontend/vercel.json</code>:</p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}</pre>

<p><b>4.4 Deploy</b></p>
<ol>
<li>Click <b>Deploy</b></li>
<li>Vercel builds and deploys in ~2 minutes</li>
<li>Your app is live at <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">https://your-project.vercel.app</code></li>
</ol>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Step 5 — Alternative: Deploy Frontend on Netlify</h2>

<p><b>5.1 Connect repository</b></p>
<ol>
<li>Go to <a href="https://netlify.com" style="color:#58a6ff;">netlify.com</a> → <b>Add new site</b> → <b>Import an existing project</b></li>
<li>Connect GitHub and select your repository</li>
</ol>

<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Setting</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Value</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Base directory</td><td style="border:1px solid #30363d;padding:10px;">BACKEND/edupath-ai/frontend</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Build command</td><td style="border:1px solid #30363d;padding:10px;">npm run build</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Publish directory</td><td style="border:1px solid #30363d;padding:10px;">dist</td></tr>
</table>

<p><b>5.2 SPA routing for Netlify</b></p>
<p>Create <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">BACKEND/edupath-ai/frontend/public/_redirects</code>:</p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">/*    /index.html   200</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Step 6 — Update CORS After Deployment</h2>
<p>After the frontend is deployed, update the backend's <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">FRONTEND_URL</code> environment variable in Render.com to your actual Vercel/Netlify URL:</p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">FRONTEND_URL = https://your-actual-app.vercel.app</pre>
<p>Then trigger a manual redeploy of the backend service in Render.com.</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Step 7 — Connect a Custom Domain (Optional)</h2>

<p><b>On Vercel:</b></p>
<ol>
<li>Go to your project → <b>Settings</b> → <b>Domains</b></li>
<li>Add your domain (e.g., <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">app.edupath.ai</code>)</li>
<li>Add the CNAME record shown to your DNS provider</li>
<li>Vercel auto-provisions an SSL certificate via Let's Encrypt</li>
</ol>

<p><b>On Render.com (backend):</b></p>
<ol>
<li>Go to your service → <b>Settings</b> → <b>Custom Domains</b></li>
<li>Add <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">api.edupath.ai</code></li>
<li>Add the CNAME record to your DNS provider</li>
<li>Update <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">VITE_API_URL</code> in Vercel to <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">https://api.edupath.ai</code></li>
</ol>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Step 8 — Gmail App Password Setup</h2>
<ol>
<li>Go to your Google Account → <b>Security</b></li>
<li>Enable <b>2-Step Verification</b> if not already enabled</li>
<li>Go to <b>App passwords</b> (search in Google Account settings)</li>
<li>Select app: <b>Mail</b>, device: <b>Other</b> → name it "EduPath AI"</li>
<li>Copy the 16-character app password</li>
<li>Use this as <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">EMAIL_PASS</code> in Render.com — NOT your Gmail login password</li>
</ol>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Deployment Checklist</h2>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Task</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Status</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">MongoDB Atlas cluster created and user configured</td><td style="border:1px solid #30363d;padding:10px;">☐</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Database seeded with skill nodes</td><td style="border:1px solid #30363d;padding:10px;">☐</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Node.js backend deployed on Render.com</td><td style="border:1px solid #30363d;padding:10px;">☐</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Python AI service deployed on Render.com</td><td style="border:1px solid #30363d;padding:10px;">☐</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Frontend deployed on Vercel/Netlify</td><td style="border:1px solid #30363d;padding:10px;">☐</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">FRONTEND_URL updated in backend env vars</td><td style="border:1px solid #30363d;padding:10px;">☐</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">VITE_API_URL set in frontend env vars</td><td style="border:1px solid #30363d;padding:10px;">☐</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Gemini API key configured</td><td style="border:1px solid #30363d;padding:10px;">☐</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Health checks passing on all services</td><td style="border:1px solid #30363d;padding:10px;">☐</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Test registration and login flow end-to-end</td><td style="border:1px solid #30363d;padding:10px;">☐</td></tr>
</table>

</body>
