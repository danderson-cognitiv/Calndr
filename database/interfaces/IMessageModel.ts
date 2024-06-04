import * as Mongoose from "mongoose";

interface IMessageModel extends Mongoose.Document {
    _id: any,
    userEvent: Mongoose.Schema.Types.ObjectId;
    content: String;
    sentAt: Date;
}

export { IMessageModel };
