const TodoTask = require('../models/TodoTask');

// GET /api/todo — get all tasks for the logged-in student
exports.getTasks = async (req, res) => {
  const tasks = await TodoTask.find({ student_id: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, tasks });
};

// POST /api/todo — create a new task
exports.createTask = async (req, res) => {
  const { title, description, priority, due_date, skill_name } = req.body;
  if (!title) return res.status(400).json({ success: false, message: 'Title is required.' });

  const task = await TodoTask.create({
    student_id: req.user.id,
    title,
    description: description || '',
    priority: priority || 'medium',
    due_date: due_date || null,
    skill_name: skill_name || '',
    source: 'manual',
  });

  res.status(201).json({ success: true, task });
};

// PUT /api/todo/:id — update a task (title, description, priority, due_date, status)
exports.updateTask = async (req, res) => {
  const task = await TodoTask.findOne({ _id: req.params.id, student_id: req.user.id });
  if (!task) return res.status(404).json({ success: false, message: 'Task not found.' });

  const allowed = ['title', 'description', 'priority', 'due_date', 'status', 'skill_name'];
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) task[field] = req.body[field];
  });

  // If marking done, record completion time and award XP
  if (req.body.status === 'done' && task.completed_at === null) {
    task.completed_at = new Date();
  }

  await task.save();
  res.json({ success: true, task });
};

// DELETE /api/todo/:id — delete a task
exports.deleteTask = async (req, res) => {
  const task = await TodoTask.findOneAndDelete({ _id: req.params.id, student_id: req.user.id });
  if (!task) return res.status(404).json({ success: false, message: 'Task not found.' });
  res.json({ success: true, message: 'Task deleted.' });
};

// PATCH /api/todo/:id/toggle — toggle between todo and done
exports.toggleTask = async (req, res) => {
  const task = await TodoTask.findOne({ _id: req.params.id, student_id: req.user.id });
  if (!task) return res.status(404).json({ success: false, message: 'Task not found.' });

  task.status = task.status === 'done' ? 'todo' : 'done';
  task.completed_at = task.status === 'done' ? new Date() : null;
  await task.save();
  res.json({ success: true, task });
};
