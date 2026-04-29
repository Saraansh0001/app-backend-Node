const Habit = require('../models/Habit');
const FocusSession = require('../models/FocusSession');
const User = require('../models/User');

exports.getStats = async (req, res) => {
    try {
        const userId = req.user.id;

        const now = new Date();
        const startOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        const endOfToday = new Date(startOfToday);
        endOfToday.setUTCDate(startOfToday.getUTCDate() + 1);

        const [user, totalHabits, completedToday, focusSessions, allUsersDesc] = await Promise.all([
            User.findById(userId),
            Habit.countDocuments({ userId, archived: false }),
            Habit.countDocuments({
                userId,
                completed: true,
                completedDate: { $gte: startOfToday, $lt: endOfToday }
            }),
            FocusSession.find({ userId }),
            User.find().sort({ xp: -1 }).select('_id')
        ]);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const totalFocusMinutes = focusSessions.reduce((acc, session) => acc + session.durationMinutes, 0);
        
        const rank = allUsersDesc.findIndex(u => u._id.toString() === userId) + 1;

        res.json({
            totalHabits,
            completedToday,
            currentStreak: user.streak,
            longestStreak: user.longestStreak,
            totalFocusMinutes,
            totalXp: user.xp,
            rank: rank > 0 ? rank : null
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
