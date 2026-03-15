// supabaseClient.js — kept for structural compatibility
// Since we switched to MongoDB, the actual DB connection is in server.js via mongoose.
// This file exports the mongoose connection for any service that needs direct DB access.

const mongoose = require('mongoose');

// Export the mongoose connection object
// Usage: const { connection } = require('./supabaseClient');
module.exports = mongoose;
