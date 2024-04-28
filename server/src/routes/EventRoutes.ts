import express from 'express';
import { DatabaseModels } from '../../../database/DatabaseModels';

const eventRouter = express.Router();

// Export a function that accepts the mongoDBConnection string
export default function createEventRoutes() {
    const eventModel = DatabaseModels.eventModel

    eventRouter.get('/event/:eventId', async (req, res) => {
        var eventId = req.params.eventId;
        console.log('Query events by eventId: ' + eventId);
        try {
            const event = await eventModel.getEventById(eventId);
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

    eventRouter.post('/event', async (req, res) => {
        var payload = req.body;
        try {
            const event = await eventModel.createEvent(payload);
            if (event) {
                res.json(event);
            } else {
                res.status(404).json({ message: "Failed" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    eventRouter.put('/event/:eventId', async (req, res) => {
        var eventId = req.params.eventId;
        var payload = req.body;
        try {
            const event = await eventModel.updateEvent(eventId, payload);
            if (event) {
                res.json(event);
            } else {
                res.status(404).json({ message: "Failed" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    eventRouter.delete('/event/:eventId', async (req, res) => {
        var eventId = req.params.eventId;
        try {
            await eventModel.deleteEvent(eventId);
            res.status(200).json({ message: 'Event deleted successfully' });
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return eventRouter;
}
