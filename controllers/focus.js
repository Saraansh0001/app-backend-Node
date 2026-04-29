const FocusSession = require('../models/FocusSession');
const User = require('../models/User');

exports.getFocusSessions = async (req, res) => {
    try {
        const sessions = await FocusSession.find({ userId: req.user.id });
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createFocusSession = async (req, res) => {
    try {
        const { title, durationMinutes } = req.body;
        if (!title || durationMinutes === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const xpEarned = durationMinutes * 5;

        const session = new FocusSession({
            userId: req.user.id,
            title,
            durationMinutes,
            xpEarned
        });

        const savedSession = await session.save();

        // Add XP to user
        await User.findByIdAndUpdate(req.user.id, { $inc: { xp: xpEarned } });

        res.status(201).json(savedSession);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
