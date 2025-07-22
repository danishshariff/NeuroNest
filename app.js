// Load environment variables FIRST
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// Debug: Check if environment variables are loaded
console.log('Environment check:');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Loaded' : 'Missing');
console.log('SESSION_SECRET:', process.env.SESSION_SECRET ? 'Loaded' : 'Missing');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Loaded' : 'Missing');
console.log('PORT:', process.env.PORT || 'Using default');

// Now import everything else
import express from "express";
import session from "express-session";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";
import resourcesRoutes from "./routes/resources.js";
import moodRoutes from "./routes/mood.js";
import breathingRoutes from "./routes/breathing.js";
import emergencyRoutes from "./routes/emergency.js";
import communityRoutes from "./routes/community.js";
import aboutRoutes from "./routes/about.js";
import profileRoutes from "./routes/profile.js";
import { User } from "./models/user.js";
import AchievementManager from "./utils/achievements/AchievementManager.js";

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Add JSON middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: process.env.SESSION_SECRET, // use a secure value in production
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // set to true only if using HTTPS
    })
);

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", chatRoutes);
app.use("/auth", authRoutes);
app.use("/resources", resourcesRoutes);
app.use("/mood-tracker", moodRoutes);
app.use("/breathing", breathingRoutes);
app.use("/emergency", emergencyRoutes);
app.use("/community", communityRoutes);
app.use("/about",aboutRoutes);
app.use("/profile", profileRoutes);

// Dashboard route
app.get("/dashboard", async (req, res) => {
    // Check if user is logged in
    if (!req.session.user) {
        return res.redirect("/auth/login");
    }
    // Fetch user with achievements
    const user = await User.findById(req.session.user._id);
    const achievementManager = new AchievementManager();
    const achievements = user.achievements.map(id => achievementManager.getAchievementById(id)).filter(Boolean);
    res.render("dashboard", { user, achievements });
});

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/auth/register", (reqcl, res) => {
    res.render("index");
});

import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;
console.log('MONGO_URI:', process.env.MONGO_URI);
// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
