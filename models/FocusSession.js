const mongoose = require('mongoose');

const focusSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    xpEarned: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FocusSession', focusSessionSchema);
