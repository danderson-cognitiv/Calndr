import express from 'express';
import { DatabaseModels } from '../../../database/DatabaseModels';

const messageRouter = express.Router();

// Export a function that accepts the mongoDBConnection string
export default function createMessageRoutes() {
    const messageModel = DatabaseModels.MessageModel;

    messageRouter.get('/message/:messageId', async (req, res) => {
        var messageId = req.params.messageId;
        console.log('Query message by messageId: ' + messageId);
        try {
            const message = await messageModel.getMessageById(messageId);
            if (message) {
                res.json(message);
            } else {
                res.status(404).json({ message: "message not found" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    messageRouter.get('/message', async (req, res) => {
        try {
            const message = await messageModel.getMessages();
            if (message) {
                res.json(message);
            } else {
                res.status(404).json({ message: "message not found" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    messageRouter.get('/message/event/:eventId', async (req, res) => {
        var eventId = req.params.eventId;
        console.log('Query message by eventId: ' + eventId);
        try {
            const messages = await messageModel.getMessagesByEventIdInOrder(eventId);
            if (messages) {
                res.json(messages);
            } else {
                res.status(404).json({ message: "message not found" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    messageRouter.post('/message', async (req, res) => {
        var payload = req.body;
        try {
            const message = await messageModel.createMessaage(payload);
            if (message) {
                res.json(message);
            } else {
                res.status(404).json({ message: "Failed" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    messageRouter.put('/message/:messageId', async (req, res) => {
        var messageId = req.params.messageId;
        var payload = req.body;
        try {
            const message = await messageModel.updateMessaage(messageId, payload);
            if (message) {
                res.json(message);
            } else {
                res.status(404).json({ message: "Failed" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    messageRouter.delete('/message/:messageId', async (req, res) => {
        var messageId = req.params.messageId;
        try {
            await messageModel.deleteMessaage(messageId);
            res.status(200).json({ message: 'Message deleted successfully' });
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });


    return messageRouter;
}
