import * as Mongoose from "mongoose";
import { IUserEventModel } from '../interfaces/IUserEventModel';
import { IUserEventViewModel } from '../views/IUserEventViewModel'

class UserEventModel {
    public schema:any;
    public model:any;

    public static getModel(mongoose: Mongoose.Mongoose) : UserEventModel {
        return new UserEventModel(mongoose);
    }

    private constructor(mongoose: Mongoose.Mongoose) {
        this.createSchema();
        this.createModel(mongoose);
    }

    private createSchema() {
        this.schema = new Mongoose.Schema(
            {
                reminderTime: { type: Date, required: true },
                rsvp: { type: Boolean, required: true },
                event: { type: Mongoose.Schema.Types.ObjectId, ref: 'Event' },
                user: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' }
            }, {collection: 'userEvents'}
        );    
    }

    private async createModel(mongoose: Mongoose.Mongoose) {
        this.model = mongoose.model<IUserEventModel>('UserEvent', this.schema);
    }

    public async getUserEventById(userEventId:string): Promise<IUserEventViewModel | null> {
        try {
            return await this.model
            .findById(userEventId)
            .populate('event', 'name startTime endTime location description')
            .populate('user', 'fName lName username');
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

    public async getUserEventsByUserId(userId: string): Promise<IUserEventModel[]> {
        try {
            console.log('querying userEvents by user')
            return await this.model.find({ user: userId })            
                                    .populate('event', 'name startTime endTime location description')
                                    .populate('user', 'fName lName');
        } catch (error) {
            console.error('Error getting user events for userId: ' + userId, error);
            return [];
        }
    }

    public async getUserEventsByUserIds(userIds: string[]): Promise<IUserEventModel[]> {
        try {
            console.log('querying userEvents by users', userIds)
            const result = await this.model.find().where('user').in(userIds)
                .populate('event', 'name startTime endTime location description')
                .populate('user', 'fName lName');
            return result;
        } catch (error) {
            console.error('Error getting user events for userId: ' + userIds, error);
            return [];
        }
    }

    public async getUserEventsByUserIdAndEventId(userId: string, eventId: string): Promise<IUserEventModel | null>  {
        try {
            console.log('querying userEvents by user and event')
            return await this.model.findOne({ user: userId, event: eventId })            
                                    .populate('event', 'name startTime endTime location description')
                                    .populate('user', 'username fName lName');
        } catch (error) {
            console.error('Error getting user events for userId: ' + userId + ' and eventId: ' + eventId, error);
            return null;
        }
    }


    public async getSharedEvents(userId: string, friendUserId: string): Promise<IUserEventModel[] | null> {
        try {
            const friendEvents: IUserEventModel[] = await this.model.find({ user: friendUserId }).select('event -_id');
            console.log('Checking if userId ' + userId + ' has user events that match event ids ' + friendEvents)
            const friendEventIds = friendEvents.map(doc => doc.event);  // Extract just the event ObjectId from each document

        
            const sharedEvents: IUserEventModel[] = await this.model.find({
                user: userId,
                event: { $in: friendEventIds }
            });

            const sharedEventIds = sharedEvents.map(doc => doc.event);  // Extract just the event ObjectId from each document

            const sharedFriendUserEvents: IUserEventModel[] = await this.model.find({
                user: friendUserId,
                event: { $in: sharedEventIds }
            })
            .populate('event', 'name startTime endTime location description')
            .populate('user', 'fName lName');

            return sharedFriendUserEvents;
        } catch (error) {
            console.error('Error getting shared events:', error);
            return [];
        }
    }

    public async getUserEventsForEvent(eventId: string) : Promise<IUserEventModel[] | null > {
        try {

            const userEvents = await this.model.find({
                event:  eventId
            }).populate('user', 'username fName lName');
            return userEvents;
        } catch (error) {
            console.error('Error getting shared events:', error);
            return [];
        }

    }

}

export { UserEventModel };