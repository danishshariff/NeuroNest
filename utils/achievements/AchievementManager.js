import Achievement from './Achievement.js';

// Example achievements (add more as needed)
const ACHIEVEMENTS = [
    new Achievement(
        'first_mood_entry',
        'First Mood Entry',
        'Logged your mood for the first time!',
        '🌟'
    ),
    new Achievement(
        'community_post',
        'First Community Post',
        'Posted in the community for the first time!',
        '📝'
    ),
    new Achievement(
        'first_ai_chat',
        'First AI Chat',
        'Had your first chat with the AI companion!',
        '💬'
    ),
    new Achievement(
        'first_breathing_exercise',
        'Mindful Breather',
        'Completed your first breathing exercise!',
        '🌬️'
    ),
    new Achievement(
        'community_helper',
        'Community Helper',
        'Answered a question in the community!',
        '🤝'
    ),
    new Achievement(
        'login_streak_3',
        'Dedicated User',
        'Signed in for 3 days in a row!',
        '🔥'
    ),
    new Achievement(
        'mood_10',
        'Mood Milestone: 10',
        'Logged 10 mood entries! Keep it up!',
        '🔟'
    ),
    new Achievement(
        'mood_50',
        'Mood Milestone: 50',
        'Logged 50 mood entries! Amazing consistency!',
        '🏅'
    ),
    new Achievement(
        'mood_100',
        'Mood Milestone: 100',
        'Logged 100 mood entries! You are a mood tracking master!',
        '💯'
    ),
    new Achievement(
        'active_user_30',
        'Active User: 30 Days',
        'Logged in on 30 different days! True dedication!',
        '📅'
    ),
];

class AchievementManager {
    constructor(achievements = ACHIEVEMENTS) {
        this.achievements = achievements;
    }

    // Check and award achievements for a user
    async checkAndAward(user, context) {
        const newlyAwarded = [];
        for (const achievement of this.achievements) {
            if (!user.achievements.includes(achievement.id) && this._qualifies(achievement, user, context)) {
                user.achievements.push(achievement.id);
                newlyAwarded.push(achievement);
            }
        }
        if (newlyAwarded.length > 0) {
            await user.save();
        }
        return newlyAwarded;
    }

    // Logic to determine if a user qualifies for an achievement
    _qualifies(achievement, user, context) {
        // Logic is based on the 'context' passed when an action occurs
        switch (achievement.id) {
            case 'first_mood_entry':
                return context.type === 'mood_entry' && context.count === 1;
            case 'mood_10':
                return context.type === 'mood_entry' && context.count === 10;
            case 'mood_50':
                return context.type === 'mood_entry' && context.count === 50;
            case 'mood_100':
                return context.type === 'mood_entry' && context.count === 100;
            case 'community_post':
                return context.type === 'community_post' && context.count === 1;
            case 'first_ai_chat':
                return context.type === 'ai_chat' && context.count === 1;
            case 'first_breathing_exercise':
                return context.type === 'breathing_exercise' && context.completed;
            case 'community_helper':
                return context.type === 'community_answer' && context.count === 1;
            case 'login_streak_3':
                return context.type === 'login' && context.streak >= 3;
            case 'active_user_30':
                return context.type === 'login' && context.uniqueDays >= 30;
            default:
                return false;
        }
    }

    // Get achievement details by ID
    getAchievementById(id) {
        return this.achievements.find(a => a.id === id);
    }
}

export default AchievementManager; 