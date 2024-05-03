import express from 'express';
import * as Mongoose from "mongoose";
import { DatabaseModels } from '../../../database/DatabaseModels';
import { PollModel } from '../../../database/model/PollModel';

const pollRouter = express.Router();

// Export a function that accepts the mongoDBConnection string
export default function createPollRoutes() {
    const pollModel = DatabaseModels.PollModel;

    pollRouter.get('/poll/:pollId', async (req, res) => {
        var pollId = req.params.pollId;
        console.log('Query polls by pollId: ' + pollId);
        try {
            const poll = await pollModel.getPollById(pollId);
            if (poll) {
                res.json(poll);
            } else {
                res.status(404).json({ message: "Poll not found" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    pollRouter.get('/poll', async (req, res) => {
        console.log('Query all polls');
        try {
            console.log(pollModel);
            const poll = await pollModel.getPolls();
            res.json(poll);

        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });


    // userRouter.get('/user/:userId/friends', async (req, res) => {
    //     var userId = req.params.userId;
    //     console.log('Query friends for userId ' + userId);
    //     try {
    //         const friends = await userModel.getFriendsByUserId(userId);
    //         res.json(friends);

    //     } catch (error) {
    //         console.error('Error accessing database:', error);
    //         res.status(500).json({ error: 'Internal server error' });
    //     }
    // });

    pollRouter.post('/poll', async (req, res) => {
        var payload = req.body;
        try {
            const poll = await pollModel.createPoll(payload);
            if (poll) {
                res.json(poll);
            } else {
                res.status(404).json({ message: "Failed" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    pollRouter.put('/poll/:pollId', async (req, res) => {
        var pollId = req.params.pollId;
        var payload = req.body;
        try {
            const poll = await pollModel.updatePoll(pollId, payload);
            if (poll) {
                res.json(poll);
            } else {
                res.status(404).json({ message: "Failed" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return pollRouter;
}
