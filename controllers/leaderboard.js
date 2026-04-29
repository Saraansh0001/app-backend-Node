const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
    try {
        const users = await User.find()
            .sort({ xp: -1 })
            .limit(20)
            .select('name xp streak');
            
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
