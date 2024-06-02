import express from 'express';
import { DatabaseModels } from '../../../database/DatabaseModels';
import { AuthUtils } from './AuthUtils';

const photoRouter = express.Router();

// Export a function that accepts the mongoDBConnection string
export default function createPhotoRoutes() {
    const photoModel = DatabaseModels.PhotoModel;

    photoRouter.get('/photo/:photoId', AuthUtils.validateAuth, async (req, res) => {
        var photoId = req.params.photoId;
        console.log('Query photo by photoId: ' + photoId);
        try {
            const photo = await photoModel.getPhotoById(photoId);
            if (photo) {
                res.json(photo);
            } else {
                res.status(404).json({ message: "photo not found" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    photoRouter.post('/photo', AuthUtils.validateAuth, async (req, res) => {
        var payload = req.body;
        try {
            const photo = await photoModel.createPhoto(payload);
            if (photo) {
                res.json(photo);
            } else {
                res.status(404).json({ message: "Failed" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    photoRouter.put('/photo/:photoId', AuthUtils.validateAuth, async (req, res) => {
        var photoId = req.params.photoId;
        var payload = req.body;
        try {
            const photo = await photoModel.updateMessaage(photoId, payload);
            if (photo) {
                res.json(photo);
            } else {
                res.status(404).json({ message: "Failed" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    photoRouter.delete('/photo/:photoId', AuthUtils.validateAuth, async (req, res) => {
        var photoId = req.params.photoId;
        try {
            await photoModel.deletePhoto(photoId);
            res.status(200).json({ message: 'photo deleted successfully' });
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return photoRouter;
}
