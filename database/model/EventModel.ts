import * as Mongoose from "mongoose";
import { IEventModel } from '../interfaces/IEventModel';

class EventModel {
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
                name: { type: String, required: true },
                startTime: { type: Date, required: true },
                endTime: { type: Date, required: true },
                location: { type: String, required: true },
                description: { type: String, required: true },
                createdBy: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' }
            }, {collection: 'events'}
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            Mongoose.set('debug', true);

            this.model = Mongoose.model<IEventModel>("Event", this.schema);
        }
        catch (e) {
            console.error(e);
        }
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