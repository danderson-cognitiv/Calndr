import * as Mongoose from "mongoose";

interface IEventModel extends Mongoose.Document {
    name: string;
    start_time: Date;
    end_time: Date;
    location: string;
    description: string;
    created_by:  Mongoose.Schema.Types.ObjectId;
}

export { IEventModel };
