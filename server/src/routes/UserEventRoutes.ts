import express from 'express';
import { DatabaseModels } from '../../../database/DatabaseModels';


const userEventRouter = express.Router();

// Export a function that accepts the mongoDBConnection string
export default function createEventRoutes() {
    const userEventModel = DatabaseModels.UserEventModel;
    const userModel = DatabaseModels.UserModel;


    userEventRouter.get('/user_event/:userEventId', async (req, res) => {
        var eventId = req.params.userEventId;
        console.log('Query events by userEventId: ' + eventId);
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

    userEventRouter.get('/user_event/user/:userId', async (req, res) => {
        const userId = req.params.userId;
        console.log(`Query user events by userId: ${userId}`);
        try {
            const userEvents = await userEventModel.getUserEventsByUserId(userId);
            return res.json(userEvents);

        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    userEventRouter.get('/user_event/user/:userId/friend/:friendUserId', async (req, res) => {
        const { userId, friendUserId } = req.params;
        console.log(`Query user events by userId: ${userId} and friendUserId: ${friendUserId}`);
        try {
            const friendUser = await userModel.getUserById(friendUserId);
            if (!friendUser) {
                return res.status(404).json({ message: "Friend user not found" });
            }
            if (friendUser.eventsVisible) {
                const friendEvents = await userEventModel.getUserEventsByUserId(friendUserId);
                return res.json(friendEvents);
            }

            return res.json(await userEventModel.getSharedEvents(userId, friendUserId));

        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    userEventRouter.get('/user_event/event/:eventId', async (req, res) => {
        const eventId = req.params.eventId;
        console.log(`Query user events by eventId: ${eventId}`);
        try {
            const userEvents = await userEventModel.getUserEventsForEvent(eventId);
            return res.json(userEvents);

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
