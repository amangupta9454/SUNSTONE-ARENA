const jwt = require('jsonwebtoken');

// This middleware runs before any protected route handler.
// It reads the Authorization header, verifies the JWT token,
// and attaches the decoded user payload to req.user.
const authMiddleware = (req, res, next) => {
  try {
    // The header looks like: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided. Access denied.' });
    }

    // Split "Bearer <token>" and grab just the token part
    const token = authHeader.split(' ')[1];

    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload (id, email, role) to the request object
    req.user = decoded;

    console.log(`🔐 Auth: user ${decoded.id} (${decoded.role}) accessing ${req.method} ${req.path}`);

    next(); // pass control to the next middleware or route handler
  } catch (err) {
    console.error('❌ Auth middleware error:', err.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
