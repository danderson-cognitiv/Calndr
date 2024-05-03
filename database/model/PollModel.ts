import * as Mongoose from "mongoose";
import {IPollModel} from '../interfaces/IPollModel';

class PollModel {
    public schema:any;
    public model:any;

    public static getModel(mongoose: Mongoose.Mongoose) : PollModel {
        return new PollModel(mongoose);
    }
    
    private constructor(mongoose: Mongoose.Mongoose) {
        this.createSchema();
        this.createModel(mongoose);
    }

    private createSchema() {
        
        this.schema = new Mongoose.Schema({
            event: { type: Mongoose.Schema.Types.ObjectId },
            question: String, 
            createdAt: Date, 
        }, {collection: 'polls'}
        ); 
    }

    private async createModel(mongoose: Mongoose.Mongoose) {
        this.model = mongoose.model<IPollModel>('User', this.schema);
    }

    public async getPollById(pollId:string): Promise<IPollModel | null> {
        try {
            const poll = await this.model
            .findById(pollId)
            .populate('poll', 'question');
            console.log(poll)
            return poll;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }

    public async getPolls(): Promise<IPollModel[]> {
        try {
            const polls = await this.model.find()
            console.log(polls)
            return polls;
        }
        catch(e) {
            console.error(e);
            return [];
        }
    }

    public async getPollsByEventId(eventId: string): Promise<IPollModel[]> {
        try {
            const poll = await this.model.findById(eventId).populate({
                path: 'friends',
                select: 'username email fName lName'
            });
    
            if (event && event.polls) {
                console.log('Polls found:', event.polls);
                return event.polls;
            } else {
                console.log('No polls found or event not found');
                return [];
            }
        } catch (e) {
            console.error('Error retrieving polls:', e);
            return [];
        }
    }
    
    public async createPoll(pollData: Partial<IPollModel>): Promise<Mongoose.Document | null> {
        try {
            const poll = new this.model(pollData);
            await poll.save();
            console.log('Poll created successfully');
            return poll;
        } catch (e) {
            console.error('Error creating poll:', e);
            return null;
        }
    }

    public async updatePoll(pollId: string, userData: Partial<IPollModel>): Promise<PollModel | null> {
        try {
            // Option 1: Update and return the updated document
            const updatedPoll = await this.model.findByIdAndUpdate(pollId, { $set: pollId }, { new: true, runValidators: true });

            // Option 2: Just update the document without returning it
            // await this.model.updateOne({ _id: userId }, { $set: updates });

            if (updatedPoll) {
                console.log('Poll updated successfully');
                return updatedPoll;
            } else {
                console.log('Poll not found');
                return null;
            }
        } catch (e) {
            console.error('Error updating poll:', e);
            return null;
        }
    }

}
export {PollModel};