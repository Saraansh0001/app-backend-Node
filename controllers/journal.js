const JournalEntry = require('../models/JournalEntry');

exports.getJournalEntries = async (req, res) => {
    try {
        const entries = await JournalEntry.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createJournalEntry = async (req, res) => {
    try {
        const { date, mood, content } = req.body;
        if (!date || !mood || !content) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const entry = new JournalEntry({
            userId: req.user.id,
            date,
            mood,
            content
        });

        const savedEntry = await entry.save();
        res.status(201).json(savedEntry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
