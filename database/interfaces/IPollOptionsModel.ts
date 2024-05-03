import * as Mongoose from "mongoose";
import internal from "stream";

interface IPollOptionsModel extends Mongoose.Document {
    pollId: Mongoose.Schema.Types.ObjectId;
    option: String;
    votes: number; 
}

export { IPollOptionsModel };