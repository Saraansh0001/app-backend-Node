const Habit = require('../models/Habit');
const User = require('../models/User');

exports.getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user.id });
        res.json(habits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createHabit = async (req, res) => {
    try {
        const { title, category, difficulty, color } = req.body;
        if (!title || !category || !difficulty || !color) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const habit = new Habit({
            userId: req.user.id,
            title,
            category,
            difficulty,
            color
        });

        const savedHabit = await habit.save();
        res.status(201).json(savedHabit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateHabit = async (req, res) => {
    try {
        const { title, category, difficulty, color, archived } = req.body;
        const habit = await Habit.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { title, category, difficulty, color, archived },
            { new: true }
        );

        if (!habit) return res.status(404).json({ message: 'Habit not found' });
        res.json(habit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!habit) return res.status(404).json({ message: 'Habit not found' });
        res.json({ message: 'Habit deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.completeHabit = async (req, res) => {
    try {
        const habit = await Habit.findOne({ _id: req.params.id, userId: req.user.id });
        if (!habit) return res.status(404).json({ message: 'Habit not found' });

        if (!habit.completed) {
            habit.completed = true;
            habit.completedDate = new Date();
            await habit.save();

            // Add 10 XP to user
            await User.findByIdAndUpdate(req.user.id, { $inc: { xp: 10 } });
        }

        res.json(habit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
