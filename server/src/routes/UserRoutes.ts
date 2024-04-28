import express from 'express';
import * as Mongoose from "mongoose";
import { DatabaseModels } from '../../../database/DatabaseModels';
import { UserModel } from '../../../database/model/UserModel';

const userRouter = express.Router();

// Export a function that accepts the mongoDBConnection string
export default function createUserRoutes() {
    const userModel = DatabaseModels.userModel;

    userRouter.get('/user/:userId', async (req, res) => {
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

    userRouter.get('/user', async (req, res) => {
        console.log('Query all users');
        try {
            const user = await userModel.getUsers();
            res.json(user);

        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });


    userRouter.get('/user/:userId/friends', async (req, res) => {
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

    userRouter.post('/user', async (req, res) => {
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

    userRouter.put('/user/:userId', async (req, res) => {
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
