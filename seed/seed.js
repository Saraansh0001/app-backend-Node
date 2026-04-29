require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const { challenges, demoUsers } = require('./seedData');

const seedDatabase = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        // Seed Challenges
        const challengeCount = await Challenge.countDocuments();
        if (challengeCount === 0) {
            console.log('Seeding challenges...');
            await Challenge.insertMany(challenges);
            console.log(`Inserted ${challenges.length} challenges.`);
        } else {
            console.log('Challenges already exist. Skipping.');
        }

        // Seed Demo Users
        let usersInserted = 0;
        console.log('Seeding demo users...');
        const salt = await bcrypt.genSalt(10);
        
        for (const userData of demoUsers) {
            const existingUser = await User.findOne({ email: userData.email });
            if (!existingUser) {
                const hashedPassword = await bcrypt.hash(userData.password, salt);
                
                const newUser = new User({
                    name: userData.name,
                    email: userData.email,
                    password: hashedPassword,
                    xp: userData.xp,
                    streak: userData.streak,
                    longestStreak: userData.longestStreak
                });
                
                await newUser.save();
                usersInserted++;
            }
        }
        
        if (usersInserted > 0) {
            console.log(`Inserted ${usersInserted} demo users.`);
        } else {
            console.log('Demo users already exist. Skipping.');
        }

    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
        process.exit(0);
    }
};

seedDatabase();
