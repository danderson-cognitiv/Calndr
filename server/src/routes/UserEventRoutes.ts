import express from 'express';
import { UserEventModel } from '../../../database/model/UserEventModel';

const userEventRouter = express.Router();

// Export a function that accepts the mongoDBConnection string
export default function createEventRoutes(mongoDBConnection: string) {
    const userEventModel = new UserEventModel(mongoDBConnection);

    userEventRouter.get('/user_event/:userEventId', async (req, res) => {
        var eventId = req.params.userEventId;
        console.log('Query events by eventId: ' + eventId);
        try {
            const event = await userEventModel.getUserEventById(eventId);
            if (event) {
                res.json(event);
            } else {
                res.status(404).json({ message: "event not found" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    userEventRouter.post('/user_event', async (req, res) => {
        var payload = req.body;
        try {
            const userEvent = await userEventModel.createUserEvent(payload);
            if (userEvent) {
                res.json(userEvent);
            } else {
                res.status(404).json({ message: "Failed" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    userEventRouter.put('/user_event/:userEventId', async (req, res) => {
        var userEventId = req.params.userEventId;
        var payload = req.body;
        try {
            const newevent = await userEventModel.updateUserEvent(userEventId, payload);
            if (newevent) {
                res.json(newevent);
            } else {
                res.status(404).json({ message: "Failed" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    userEventRouter.delete('/user_event/:userEventId', async (req, res) => {
        var userEventId = req.params.userEventId;
        try {
            await userEventModel.deleteUserEvent(userEventId);
            
            res.status(200).json({ message: 'User Event deleted successfully' });

        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return userEventRouter;
}
