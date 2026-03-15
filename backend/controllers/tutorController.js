const axios = require('axios');

// ─── AI TUTOR QUERY (Streaming) ───────────────────────────────────────────────
// POST /api/tutor/query
// Body: { question, topic, mastery_score, student_id? }
// This proxies the request to the Python AI service and streams the response
// back to the client in real-time (like ChatGPT streaming)
const query = async (req, res) => {
  const { question, topic, mastery_score } = req.body;
  const student_id = req.user.id;

  if (!question || !topic) {
    return res.status(400).json({ success: false, message: 'question and topic are required.' });
  }

  console.log(`🤖 Tutor query from student ${student_id}: "${question}" on topic "${topic}"`);

  try {
    // Set headers for streaming — this tells the browser to expect a stream
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Accel-Buffering', 'no'); // disables nginx buffering if behind a proxy

    // Make a streaming request to the Python AI service
    const aiResponse = await axios.post(
      `${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/tutor/query`,
      { question, topic, mastery_score: mastery_score || 0.3, student_id },
      { responseType: 'stream' } // tell axios to return a stream, not a full response
    );

    // Pipe the Python service's stream directly to our client
    // As Python sends chunks of text, they flow through to the browser
    aiResponse.data.pipe(res);

    // When the stream ends, close the response
    aiResponse.data.on('end', () => {
      console.log(`✅ Tutor stream completed for student ${student_id}`);
      res.end();
    });

    // Handle stream errors
    aiResponse.data.on('error', (err) => {
      console.error('❌ Tutor stream error:', err.message);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: 'Stream error from AI service.' });
      }
    });
  } catch (err) {
    console.error('❌ Tutor controller error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'AI tutor service unavailable.' });
    }
  }
};

module.exports = { query };
