const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    participants: { type: Number, default: 0 },
    duration: { type: String, required: true },
    progress: { type: Number, default: 0 },
    type: { type: String, required: true },
    color: { type: String, required: true },
    joinedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Challenge', challengeSchema);
