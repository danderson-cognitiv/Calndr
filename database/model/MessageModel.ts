import * as Mongoose from "mongoose";
import { IMessageModel } from '../interfaces/IMessageModel';

class MessageModel {
    public schema:any;
    public model:any;

    public static getModel(mongoose: Mongoose.Mongoose) : MessageModel {
        return new MessageModel(mongoose);
    }

    private constructor(mongoose: Mongoose.Mongoose) {
        this.createSchema();
        this.createModel(mongoose);
    }

    private createSchema() {
        this.schema = new Mongoose.Schema(
            {
                content: { type: String, required: true },
                sentAt: { type: Date, required: true },
                userEvent: { type: Mongoose.Schema.Types.ObjectId, ref: 'UserEvent' }
            }, {collection: 'messages'}
        );    
    }

    public async createModel(mongoose: Mongoose.Mongoose) {
        this.model = mongoose.model<IMessageModel>('Message', this.schema);
    }
    public async getMessageById(messageId:string): Promise<IMessageModel | null> {
        try {
            return await this.model
            .findById(messageId)
            .populate({
                path: 'userEvent',
                select: 'event user',
                populate: [
                    {
                        path: 'user',
                        model: 'User',
                        select: 'username fName lName'
                    },
                    { 
                        path: 'event', 
                        model: 'Event'
                    }
                ]
            });
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }

    public async getMessages(): Promise<IMessageModel[] | null> {
        try {
            return await this.model
            .find()
            .populate({
                path: 'userEvent',
                select: 'event user',
                populate: [
                    {
                        path: 'user',
                        model: 'User',
                        select: 'username fName lName'
                    }
                ]
            });
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }

    public async getMessagesByEventIdInOrder(eventId: string): Promise<IMessageModel[] | null> {
        try {
            const messages = await this.model.aggregate([
                {
                    $lookup: {
                        from: 'userEvents', // Join 'messages' with 'userEvents'
                        localField: 'userEvent',
                        foreignField: '_id',
                        as: 'userEventDetails'
                    }
                },
                {
                    $unwind: '$userEventDetails' // Flatten the result
                },
                {
                    $lookup: {
                        from: 'users', // Further join 'userEvents' with 'users'
                        localField: 'userEventDetails.user',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                },
                {
                    $unwind: '$userDetails' // Flatten the result
                },
                {
                    $match: {
                        'userEventDetails.event': new Mongoose.Types.ObjectId(eventId) // Filter by eventId
                    }
                },
                {
                    $sort: { 'sentAt': 1 } // Sort by sent date
                },
                {
                    $project: { // Structure the output as needed
                        _id: 1,
                        content: 1,
                        sentAt: 1,
                        userEvent: {
                            _id: '$userEventDetails._id',
                            user: {
                                _id: '$userDetails._id',
                                username: '$userDetails.username',
                                fName: '$userDetails.fName',
                                lName: '$userDetails.lName'
                            }
                        }
                    }
                }
            ]);
    
            return messages;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
    
    public async createMessaage(messageData: Partial<IMessageModel>): Promise<IMessageModel | null> {
        try {
            const message = new this.model(messageData);
            await message.save();
            console.log('Message created successfully');
            return message;
        } catch (error) {
            console.error('Error creating event:', error);
            return null;
        }
    }
    
    public async deleteMessaage(messageId: string): Promise<boolean> {
        try {
            var result = await this.model.findByIdAndDelete(messageId).exec();
            return !!result;
        } catch (error) {
            console.error('Error deleting message:', error);
            return false;
        }
    }
    
    public async updateMessaage(messageId: string, messageData: Partial<IMessageModel>): Promise<IMessageModel | null> {
        try {
            const message = await this.model.findByIdAndUpdate(messageId, messageData, { new: true }).exec();
            return message;
        } catch (error) {
            console.error('Error updating event:', error);
            return null;
        }
    }
}

export { MessageModel };