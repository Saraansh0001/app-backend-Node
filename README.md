# Habit Tracker Backend

A basic Node.js and Express backend for the Habit-Tracker-App. Features include user authentication, habit management, focus sessions, challenges, journal entries, and a leaderboard system. 

## Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)
- JWT & bcryptjs
- dotenv
- cors

## Setup Instructions

1. Clone or download this repository.
2. Run `npm install` to install all dependencies.
3. Create a `.env` file in the root directory based on `.env.example`:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/habit_tracker
   JWT_SECRET=your_jwt_secret_here
   ```
4. Ensure you have MongoDB running locally (or provide a MongoDB Atlas URI in `.env`).
5. After first connecting to MongoDB, run `npm run seed` once to populate 8 global challenges and 10 demo users for the leaderboard.

## Running the Server

- **Development mode:** `npm run dev` (uses nodemon)
- **Production mode:** `npm start` (uses node)

## API Endpoints

**Base URL:** `/api`

### Auth (`/api/auth`)
- `POST /register`: Register a new user
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`
  - **Note:** New users automatically receive 3 starter habits on registration.
- `POST /login`: Log in to an existing account
  - Body: `{ "email": "john@example.com", "password": "password123" }`

**Note:** All the endpoints below require a valid JWT token in the `Authorization` header as `Bearer <token>`.

### Habits (`/api/habits`)
- `GET /`: Get all habits for the logged-in user
- `POST /`: Create a new habit
  - Body: `{ "title": "Read 10 pages", "category": "Learning", "difficulty": "Medium", "color": "#ff0000" }`
- `PUT /:id`: Update an existing habit (e.g., archive it)
  - Body: `{ "title": "Read 20 pages", "category": "Learning", "difficulty": "Medium", "color": "#ff0000", "archived": false }`
- `DELETE /:id`: Delete a habit
- `PUT /:id/complete`: Complete a habit and gain 10 XP
  - **Response:** `{ "habit": { ...updated habit... }, "user": { "xp": 10, "streak": 1, "longestStreak": 1 } }`

### Focus Sessions (`/api/focus`)
- `GET /`: Get all focus sessions for the logged-in user
- `POST /`: Create a new focus session (gains 5 XP per minute)
  - Body: `{ "title": "Deep Work", "durationMinutes": 60 }`

### Challenges (`/api/challenges`)
- `GET /`: Get all challenges
- `POST /:id/join`: Join a specific challenge

### Journal (`/api/journal`)
- `GET /`: Get all journal entries for the logged-in user
- `POST /`: Create a new journal entry
  - Body: `{ "date": "2023-10-27", "mood": "Happy", "content": "Had a great day today!" }`

### Leaderboard (`/api/leaderboard`)
- `GET /`: Get top 20 users sorted by XP descending (returns name, xp, streak)

### Profile (`/api/profile`)
- `GET /`: Get the current logged-in user's profile information
- `PUT /`: Update the current logged-in user's profile
  - Body: `{ "name": "New Name", "avatarUrl": "https://example.com/avatar.jpg" }` (both fields optional)

### Stats (`/api/stats`)
- `GET /`: Get the current logged-in user's aggregated statistics (totalHabits, completedToday, currentStreak, longestStreak, totalFocusMinutes, totalXp, rank)
