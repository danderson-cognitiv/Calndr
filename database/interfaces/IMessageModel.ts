import * as Mongoose from "mongoose";

interface IMessageModel extends Mongoose.Document {
    userEvent: Mongoose.Schema.Types.ObjectId;
    content: String;
    sentAt: Date;
}

export { IMessageModel };
