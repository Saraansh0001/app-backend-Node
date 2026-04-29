require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const habitsRoutes = require('./routes/habits');
const focusRoutes = require('./routes/focus');
const challengesRoutes = require('./routes/challenges');
const journalRoutes = require('./routes/journal');
const leaderboardRoutes = require('./routes/leaderboard');
const profileRoutes = require('./routes/profile');
const statsRoutes = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitsRoutes);
app.use('/api/focus', focusRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/stats', statsRoutes);

// ==========================================
// 🔌 DATABASE CONNECTION
// ==========================================
// This is where we connect to MongoDB. 
// It uses the MONGO_URI from your .env file.
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('✅ MongoDB connected successfully');
})
.catch(err => {
    console.log('❌ MongoDB connection error:', err);
    console.log('👉 Tip: Check if your MongoDB URI in the .env file is correct!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
