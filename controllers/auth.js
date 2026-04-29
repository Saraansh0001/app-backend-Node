const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Habit = require('../models/Habit');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        await Habit.insertMany([
            { userId: savedUser._id, title: "Morning Meditation", category: "Mindfulness", difficulty: "Easy", color: "#6B3FD4" },
            { userId: savedUser._id, title: "Read 30 Minutes", category: "Productivity", difficulty: "Medium", color: "#38BDF8" },
            { userId: savedUser._id, title: "Drink 2L Water", category: "Health", difficulty: "Easy", color: "#10B981" }
        ]);
        
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
        
        res.status(201).json({
            token,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                xp: savedUser.xp,
                streak: savedUser.streak
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                xp: user.xp,
                streak: user.streak
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
