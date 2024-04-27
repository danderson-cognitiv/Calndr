import * as Mongoose from "mongoose";
import { IPhotoModel } from '../interfaces/IPhotoModel';

class PhotoModel {
    public schema:any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                path: { type: String, required: true },
                message: { type: Mongoose.Schema.Types.ObjectId, ref: 'Message' }
            }, {collection: 'photos'}
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            Mongoose.set('debug', true);

            this.model = Mongoose.model<IPhotoModel>("photo", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async getPhotoById(photoId:string): Promise<IPhotoModel | null> {
        try {
            return await this.model
            .findById(photoId);
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }
    
    public async createPhoto(photoData: Partial<IPhotoModel>): Promise<IPhotoModel | null> {
        try {
            const photo = new this.model(photoData);
            await photo.save();
            console.log('Photo created successfully');
            return photo;
        } catch (error) {
            console.error('Error creating photo:', error);
            return null;
        }
    }
    
    public async deletePhoto(photoId: string): Promise<boolean> {
        try {
            var result = await this.model.findByIdAndDelete(photoId).exec();
            return !!result;
        } catch (error) {
            console.error('Error deleting photo:', error);
            return false;
        }
    }
    
    public async updateMessaage(photoId: string, photoData: Partial<IPhotoModel>): Promise<IPhotoModel | null> {
        try {
            const photo = await this.model.findByIdAndUpdate(photoId, photoData, { new: true }).exec();
            return photo;
        } catch (error) {
            console.error('Error updating photo:', error);
            return null;
        }
    }
}

export { PhotoModel };