import * as Mongoose from "mongoose";
import { IEventModel } from "./IEventModel";

interface IUserEventModel extends Mongoose.Document {
    event: IEventModel;
    user: Mongoose.Schema.Types.ObjectId;
    reminderTime: Date;
    rsvp: boolean;
}

export { IUserEventModel };
