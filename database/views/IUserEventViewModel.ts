import * as Mongoose from "mongoose";
import { IEventModel } from "../interfaces/IEventModel";
import { IUserModel } from "../interfaces/IUserModel";

interface IUserEventViewModel extends Mongoose.Document {
    event: IEventModel;
    user: IUserModel;
    reminderTime: Date;
    rsvp: boolean;
}

export { IUserEventViewModel };