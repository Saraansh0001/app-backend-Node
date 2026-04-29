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
