import * as Mongoose from "mongoose";

interface IPollModel extends Mongoose.Document {
    event: Mongoose.Schema.Types.ObjectId;
    pollName: String;
    createdAt: Date;
    createdBy: Mongoose.Schema.Types.ObjectId;
}

export { IPollModel };