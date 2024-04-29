import * as Mongoose from "mongoose";

interface IPollModel extends Mongoose.Document {
    // Something here 
    createdBy:  Mongoose.Schema.Types.ObjectId;
}

export { IPollModel };