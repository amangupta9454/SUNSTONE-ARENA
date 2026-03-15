const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

// Helper: generate a JWT token for a user
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ─── REGISTER ─────────────────────────────────────────────────────────────────
// POST /api/auth/register
// Body: { name, email, password, role? }
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  }

  // Check if email already exists
  const existing = await Student.findOne({ email });
  if (existing) {
    return res.status(409).json({ success: false, message: 'Email already registered.' });
  }

  // Hash the password (10 salt rounds is the standard)
  const password_hash = await bcrypt.hash(password, 10);

  const student = await Student.create({
    name,
    email,
    password_hash,
    role: role || 'student',
  });

  const token = generateToken(student);

  console.log(`✅ New user registered: ${email} (${student.role})`);

  res.status(201).json({
    success: true,
    token,
    user: {
      id: student._id,
      name: student.name,
      email: student.email,
      role: student.role,
    },
  });
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
// POST /api/auth/login
// Body: { email, password }
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  // Find user by email
  const student = await Student.findOne({ email });
  if (!student) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  // Compare the provided password against the stored hash
  const isMatch = await bcrypt.compare(password, student.password_hash);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const token = generateToken(student);

  console.log(`✅ User logged in: ${email}`);

  res.json({
    success: true,
    token,
    user: {
      id: student._id,
      name: student.name,
      email: student.email,
      role: student.role,
      career_goal: student.career_goal,
      learning_style: student.learning_style,
    },
  });
};

module.exports = { register, login };
