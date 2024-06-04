import express from 'express';
import * as Mongoose from "mongoose";
import { DatabaseModels } from '../../../database/DatabaseModels';
import { AuthUtils } from './AuthUtils';

const userRouter = express.Router();

// Export a function that accepts the mongoDBConnection string
export default function createUserRoutes() {
    const userModel = DatabaseModels.UserModel;

    userRouter.get('/user/:userId', AuthUtils.validateAuth, async (req, res) => {
        var userId = req.params.userId;
        console.log('Query users by userId: ' + userId);
        try {
            const user = await userModel.getUserById(userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    userRouter.get('/user/name/:username', AuthUtils.validateAuth, async (req, res) => {
        var username = req.params.username;
        console.log('Query users by username: ' + username);
        try {
            const user = await userModel.getUserByName(username);
            if (user) {
                res.json(user);                
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    userRouter.get('/user', AuthUtils.validateAuth, async (req, res) => {
        console.log('Query all users');
        try {
            console.log(userModel);
            const user = await userModel.getUsers();
            res.json(user);

        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });


    userRouter.get('/user/:userId/friends', AuthUtils.validateAuth, async (req, res) => {
        var userId = req.params.userId;
        console.log('Query friends for userId ' + userId);
        try {
            const friends = await userModel.getFriendsByUserId(userId);
            res.json(friends);

        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    userRouter.post('/user', AuthUtils.validateAuth, async (req, res) => {
        var payload = req.body;
        try {
            const user = await userModel.createUser(payload);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "Failed" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    userRouter.put('/user/:userId', AuthUtils.validateAuth, async (req, res) => {
        var userId = req.params.userId;
        var payload = req.body;
        try {
            const user = await userModel.updateUser(userId, payload);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "Failed" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return userRouter;
}
