import * as Mongoose from "mongoose";

interface IPollModel extends Mongoose.Document {
    event: Mongoose.Schema.Types.ObjectId;
    question: String;
    createdAt: Date;
}

export { IPollModel };