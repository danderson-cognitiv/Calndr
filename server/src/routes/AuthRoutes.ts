import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import { AuthUtils } from './AuthUtils';

dotenv.config();

const authRouter = express.Router();

export default function createAuthRoutes() {
    authRouter.get('/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] })
    );

    authRouter.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: process.env.CLIENT_URL }),
        (req, res) => {
            if (req.user) {
                res.redirect(`${process.env.CLIENT_URL}`);
            } else {
                res.redirect(`${process.env.CLIENT_URL}/login`);
            }
        }
    );

    authRouter.get('/auth/user', AuthUtils.validateAuth, (req, res) => {
        res.json(req.user);
    });

    authRouter.post('/auth/logout', AuthUtils.validateAuth, (req, res) => {
        req.logout(err => {
            if (err) {
                return res.status(500).send('Failed to logout');
            }
            res.status(200).send('Logged out');
        });
    });

    return authRouter;
}
