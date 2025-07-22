import express from "express";
import Message from "../models/message.js";
import AchievementManager from '../utils/achievements/AchievementManager.js';
import { User } from '../models/user.js';

const router = express.Router();

// Middleware to ensure authentication
const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect("/auth/login");
    }
    next();
};

router.get("/chat", requireAuth, async (req, res) => {
    try {
        // Retrieve messages for the logged-in user, sorted by creation time
        const messages = await Message.find({ user: req.session.userId })
            .sort({ createdAt: 1 })
            .lean();

        res.render("chat", {
            messages,
            user: req.session.user, // Optional: if you want to display user info
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.render("chat", { messages: [] });
    }
});

let getGeminiResponse = null;
async function getGeminiHelper() {
    if (!getGeminiResponse) {
        const { default: geminiResponse } = await import("../utils/gemini-helper.js");
        getGeminiResponse = geminiResponse;
    }
    return getGeminiResponse;
}

router.post("/chat", requireAuth, async (req, res) => {
    const userInput = req.body.userInput?.trim();

    if (!userInput) {
        return res.status(400).json({
            error: "Please type a message before sending.",
            sender: "bot",
        });
    }

    try {
        // Save user message to DB
        const userMessage = await Message.create({
            content: userInput,
            sender: "user",
            user: req.session.userId,
        });

        // Use gemini-helper only after env is loaded
        const geminiResponse = await getGeminiHelper();
        if (!geminiResponse) {
            return res.status(500).json({
                error: "AI service is currently unavailable. Please try again later.",
                sender: "bot",
            });
        }

        // Get chat history for this user
        const chatHistory = await Message.find({ user: req.session.userId })
            .sort({ createdAt: 1 })
            .lean();

        // Convert chat history to Gemini format
        const geminiHistory = chatHistory.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Generate response using Gemini AI
        const result = await geminiResponse(userInput, geminiHistory);
        const aiResponse = {
            message: result.responseText,
            isEmergency: false // You can add emergency detection logic here if needed
        };
        
        // Add a small delay to simulate thinking time
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Save bot response to DB
        const botMessage = await Message.create({
            content: aiResponse.message,
            sender: "bot",
            user: req.session.userId,
        });

        // --- Achievement logic for first_ai_chat ---
        const achievementManager = new AchievementManager();
        const userMessageCount = await Message.countDocuments({ user: req.session.userId, sender: 'user' });
        const user = await User.findById(req.session.userId);
        const context = {
            type: 'ai_chat',
            count: userMessageCount,
        };
        const newlyAwarded = await achievementManager.checkAndAward(user, context);
        // --- End achievement logic ---

        // Return both messages as JSON
        res.json({
            success: true,
            isEmergency: aiResponse.isEmergency,
            messages: [
                {
                    content: userMessage.content,
                    sender: userMessage.sender,
                    createdAt: userMessage.createdAt,
                },
                {
                    content: botMessage.content,
                    sender: botMessage.sender,
                    createdAt: botMessage.createdAt,
                },
            ],
            achievements: newlyAwarded,
        });
    } catch (error) {
        console.error("Chat error:", error);
        res.status(500).json({
            error: "An error occurred while processing your message.",
            sender: "bot",
        });
    }
});

router.post("/clear-chat", requireAuth, async (req, res) => {
    try {
        // Delete all messages for the current user
        await Message.deleteMany({ user: req.session.userId });
        // Clear chat history from database (Gemini doesn't maintain server-side sessions)
        // The chat history is managed through the database messages
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error clearing chat:", error);
        res.status(500).json({ success: false, error: "Failed to clear chat" });
    }
});

router.get("/bot-info", requireAuth, async (req, res) => {
    try {
        const geminiResponse = await getGeminiHelper();
        if (!geminiResponse) {
            return res.status(500).json({ success: false, error: "AI service unavailable" });
        }
        
        // Get message count for this user as session info
        const messageCount = await Message.countDocuments({ user: req.session.userId });
        
        const botInfo = {
            name: "MindfulBot",
            poweredBy: "Google Gemini AI",
            capabilities: [
                "Mental health support",
                "Conversation memory",
                "Crisis detection",
                "Personalized responses"
            ],
            sessionInfo: {
                messageCount: messageCount,
                status: "Active"
            }
        };
        res.json({ success: true, botInfo });
    } catch (error) {
        console.error("Error getting bot info:", error);
        res.status(500).json({ success: false, error: "Failed to get bot information" });
    }
});

export default router;
