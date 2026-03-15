// Returns a middleware that checks if the logged-in user has the required role.
// Must be used AFTER authMiddleware.
const requireRole = (role) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  }

  if (req.user.role !== role) {
    console.warn(`⛔ Role check failed: user ${req.user.id} has role '${req.user.role}', expected '${role}'`);
    return res.status(403).json({ success: false, message: `Access denied. ${role}s only.` });
  }

  console.log(`✅ Role check passed: ${role} ${req.user.id}`);
  next();
};

module.exports = { requireRole };
