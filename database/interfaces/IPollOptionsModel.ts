import * as Mongoose from "mongoose";

interface IPollOptionsModel extends Mongoose.Document {
    _id: any,
    pollId: Mongoose.Schema.Types.ObjectId;
    option: String;
    votes: bigint;
    createdBy:  Mongoose.Schema.Types.ObjectId;
}

export { IPollOptionsModel };