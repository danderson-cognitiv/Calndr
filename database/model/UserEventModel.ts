import * as Mongoose from "mongoose";
import { IUserEventModel } from '../interfaces/IUserEventModel';

class UserEventModel {
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
                reminderTime: { type: Date, required: true },
                rsvp: { type: Boolean, required: true },
                event: { type: Mongoose.Schema.Types.ObjectId, ref: 'Event' },
                user: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' }
            }, {collection: 'userEvents'}
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            Mongoose.set('debug', true);

            this.model = Mongoose.model<IUserEventModel>("UserEvent", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async getUserEventById(userEventId:string): Promise<IUserEventModel | null> {
        try {
            return await this.model
            .findById(userEventId)
            .populate('event', 'name startTime endTime location description')
            .populate('user', 'fName lName');
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }
    
    public async createUserEvent(userEventData: Partial<IUserEventModel>): Promise<IUserEventModel | null> {
        try {
            const event = new this.model(userEventData);
            await event.save();
            console.log('User Event created successfully');
            return event;
        } catch (error) {
            console.error('Error creating user event:', error);
            return null;
        }
    }
    
    public async deleteUserEvent(userEventId: string): Promise<boolean> {
        try {
            var result = await this.model.findByIdAndDelete(userEventId).exec();
            return !!result;
        } catch (error) {
            console.error('Error deleting user event:', error);
            return false;
        }
    }
    
    public async updateUserEvent(userEventId: string, userEventData: Partial<IUserEventModel>): Promise<IUserEventModel | null> {
        try {
            const userEvent = await this.model.findByIdAndUpdate(userEventId, userEventData, { new: true }).exec();
            return userEvent;
        } catch (error) {
            console.error('Error updating user event:', error);
            return null;
        }
    }
}

export { UserEventModel };