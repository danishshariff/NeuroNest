import express from 'express';
import { User } from '../models/user.js';
import AchievementManager from '../utils/achievements/AchievementManager.js';

const router = express.Router();

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

router.get('/', isAuthenticated, async (req, res) => {
    const user = await User.findById(req.session.user._id);
    const achievementManager = new AchievementManager();
    const achievements = user.achievements.map(id => achievementManager.getAchievementById(id)).filter(Boolean);
    res.render('profile', { user, achievements });
});

export default router; 