  NeuroHabit is a full-stack MERN application designed to leverage behavioral psychology to build lasting habits. Unlike 
standard to-do lists, NeuroHabit uses gamification, streak mechanics, and data visualization to trigger "Loss Aversion" and 
"Positive Reinforcement," ensuring high user consistency.
  Built with a "Neuro-Dark" Glassmorphism aesthetic, it features a responsive dashboard that tracks daily velocity,
consistency heatmaps, and lifetime progression ranks.

Tech Stack
Frontend: React.js (Vite), Redux Toolkit (State Management), Tailwind CSS (Styling), Framer Motion (Animations), Recharts (Data Viz).

Backend: Node.js, Express.js (REST API).

Database: MongoDB Atlas (Cloud NoSQL).

Authentication: JWT (JSON Web Tokens) with secure HTTP headers.

Tools: Axios (API Requests), Git/GitHub.

Key Features:

1. Behavioral Gamification

Streak System: "Loss Aversion" hook to prevent breaking the chain.

Rank System: XP-based progression (Novice → Pro → Master → Titan) with visual progress bars.

Celebration Mode: Full-screen confetti and "Perfect Day" glowing animations when 100% of tasks are completed.

2. Advanced Data Visualization

Consistency Heatmap: A GitHub/LeetCode-style grid showing habit density over the last 30 days.

Daily Velocity Ring: Real-time animated SVG ring showing daily completion %.

Smart Insights: Automated stats calculating average completion rates.

3. Modern "Glass" UI/UX

Profile Personalization: Base64 image encoding for profile picture uploads.

Responsive Design: Fully fluid layout that adapts from Mobile (Stack) to Desktop (Grid).

Motivational Priming: Random Stoic quotes generator and goal-priming headers.

4. Full-Stack Security

Custom Auth Middleware: Protects private routes using JWT verification.

Secure Storage: Passwords hashed via Bcrypt; tokens managed in LocalStorage.

Psychological Hooks Implemented:

Loss Aversion: The "Streak Fire" icon motivates users not to break a continuous chain.

Identity Priming: Displaying the user's "Main Goal" prominently reinforces their desired identity.

Variable Reward: Random motivational quotes and unlocking new badges provide dopamine hits.

Visual Progress: The "Heatmap" provides a visual history of effort, encouraging "Don't Break the Chain" behavior.

How to Run Locally

Clone the Repo:
git clone https://github.com/YourUsername/NeuroHabit.git
Install Dependencies:
# Root
npm install
# Client
cd client && npm install
# Server
cd ../server && npm install
Setup Environment: Create a .env file in /server with your MONGO_URI and JWT_SECRET.

Run the App:
# Run both Frontend and Backend
npm run dev