const challenges = [
    { title: "30-Day Meditation", participants: 128, duration: "18d left", progress: 0, type: "Meditation", color: "#6B3FD4" },
    { title: "Morning Workout", participants: 85, duration: "6d left", progress: 0, type: "Workout", color: "#6B3FD4" },
    { title: "No Social Media", participants: 234, duration: "7 days", progress: 0, type: "Social", color: "#38BDF8" },
    { title: "Reading Marathon", participants: 156, duration: "14 days", progress: 0, type: "Reading", color: "#34D399" },
    { title: "Hydration Challenge", participants: 312, duration: "30 days", progress: 0, type: "Health", color: "#818CF8" },
    { title: "Sleep by 10 PM", participants: 189, duration: "21 days", progress: 0, type: "Sleep", color: "#F59E0B" },
    { title: "Cold Shower Streak", participants: 92, duration: "10 days", progress: 0, type: "Health", color: "#06B6D4" },
    { title: "Gratitude Journal", participants: 167, duration: "14 days", progress: 0, type: "Mindfulness", color: "#EC4899" }
];

const demoUsers = [
    { name: "Aarav Sharma", xp: 3500, streak: 28, longestStreak: 28 },
    { name: "Priya Patel", xp: 2980, streak: 21, longestStreak: 21 },
    { name: "Rohan Mehta", xp: 2450, streak: 19, longestStreak: 19 },
    { name: "Ananya Singh", xp: 2210, streak: 14, longestStreak: 14 },
    { name: "Vikram Reddy", xp: 1890, streak: 12, longestStreak: 12 },
    { name: "Sneha Iyer", xp: 1670, streak: 9, longestStreak: 9 },
    { name: "Karan Kapoor", xp: 1420, streak: 7, longestStreak: 7 },
    { name: "Diya Gupta", xp: 1180, streak: 5, longestStreak: 5 },
    { name: "Arjun Nair", xp: 950, streak: 3, longestStreak: 3 },
    { name: "Riya Joshi", xp: 720, streak: 2, longestStreak: 2 }
].map(u => ({
    ...u,
    email: `${u.name.toLowerCase().split(' ')[0]}.${u.name.toLowerCase().split(' ')[1]}@demo.com`,
    password: "demo1234"
}));

module.exports = {
    challenges,
    demoUsers
};
