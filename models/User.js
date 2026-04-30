const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastCompletedDate: { type: Date, default: null },
    longestStreak: { type: Number, default: 0 },
    avatarUrl: { type: String, default: "" },
    rank: { type: String, default: "Warrior 🎖️" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
