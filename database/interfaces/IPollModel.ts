import * as Mongoose from "mongoose";

interface IPollModel extends Mongoose.Document {
    _id: any,
    event: Mongoose.Schema.Types.ObjectId;
    pollName: String;
    createdAt: Date;
    createdBy: string;
}

export { IPollModel };