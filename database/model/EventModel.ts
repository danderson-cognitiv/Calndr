import * as Mongoose from "mongoose";
import { IEventModel } from '../interfaces/IEventModel';

class EventModel {
    public schema:any;
    public model:any;

    public static getModel(mongoose: Mongoose.Mongoose) : EventModel {
        return new EventModel(mongoose);
    }

    private constructor(mongoose: Mongoose.Mongoose) {
        this.createSchema();
        this.createModel(mongoose);
    }

    private createSchema() {
        this.schema = new Mongoose.Schema(
            {
                name: { type: String, required: true },
                startTime: { type: Date, required: true },
                endTime: { type: Date, required: true },
                location: { type: String, required: true },
                description: { type: String, required: true },
                createdBy: { type: String, ref: 'User' }
            }, {collection: 'events'}
        );    
    }

    private async createModel(mongoose: Mongoose.Mongoose) {
        this.model = mongoose.model<IEventModel>('Event', this.schema);
    }

    public async getEventById(eventId:string): Promise<IEventModel | null> {
        try {
            return await this.model
            .findById(eventId)
            .populate('createdBy', 'fName lName');
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }
    
    public async createEvent(eventData: Partial<IEventModel>): Promise<IEventModel | null> {
        try {
            const event = new this.model(eventData);
            await event.save();
            console.log('Event created successfully');
            return event;
        } catch (error) {
            console.error('Error creating event:', error);
            return null;
        }
    }
    
    public async deleteEvent(eventId: string): Promise<boolean> {
        try {
            var result = await this.model.findByIdAndDelete(eventId).exec();
            return !!result;
        } catch (error) {
            console.error('Error deleting event:', error);
            return false;
        }
    }
    
    public async updateEvent(eventId: string, eventData: Partial<IEventModel>): Promise<IEventModel | null> {
        try {
            const event = await this.model.findByIdAndUpdate(eventId, eventData, { new: true }).exec();
            return event;
        } catch (error) {
            console.error('Error updating event:', error);
            return null;
        }
    }
}

export { EventModel };