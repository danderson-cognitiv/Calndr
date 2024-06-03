import * as Mongoose from "mongoose";

interface IUserEventModel extends Mongoose.Document {
    _id: any,
    event: Mongoose.Schema.Types.ObjectId;
    user: string;
    reminderTime: Date;
    rsvp: boolean;
}

export { IUserEventModel };
