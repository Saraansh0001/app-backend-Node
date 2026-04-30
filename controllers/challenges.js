const Challenge = require('../models/Challenge');

exports.getChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.json(challenges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.joinChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

        if (!challenge.joinedUsers.includes(req.user.id)) {
            challenge.joinedUsers.push(req.user.id);
            challenge.participants += 1;
            await challenge.save();
        }

        res.json(challenge);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createChallenge = async (req, res) => {
    try {
        const { title, duration, type, color } = req.body;
        
        if (!title || !duration || !type || !color) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const challenge = new Challenge({
            title,
            duration,
            type,
            color,
            participants: 1,
            progress: 0,
            joinedUsers: [req.user.id] // Auto-join creator
        });

        const savedChallenge = await challenge.save();
        res.status(201).json(savedChallenge);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
