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
        passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
        (req, res) => {
            res.redirect(`${process.env.CLIENT_URL}`);
        }
    );

    authRouter.get('/auth/user', AuthUtils.validateAuth, (req, res) => {
        res.json(req.user);
    });

    authRouter.post('/auth/logout', AuthUtils.validateAuth, (req, res) => {
        req.logout(err => {
            if (err) {
                console.error('Error during logout:', err);
                return res.status(500).send('Failed to logout');
            }
            console.log('User successfully logged out');
            res.status(200).send();
        });
    });

    return authRouter;
}
