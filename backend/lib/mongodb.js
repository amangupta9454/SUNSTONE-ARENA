const mongoose = require('mongoose');

// Cache the connection across serverless function invocations.
// On Vercel, the Node process is reused between requests in the same container,
// so we store the connection on the global object to avoid reconnecting every time.
let cached = global._mongooseCache;

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
  // Already connected — reuse it
  if (cached.conn) {
    return cached.conn;
  }

  // Connection in progress — wait for it
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        // These options prevent connection pool exhaustion on serverless
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        bufferCommands: false,
      })
      .then((m) => {
        console.log('✅ MongoDB connected');
        return m;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
