import * as Mongoose from "mongoose";

interface IEventModel extends Mongoose.Document {
    _id: any,
    name: string;
    startTime: Date;
    endTime: Date;
    location: string;
    description: string;
    createdBy:  Mongoose.Schema.Types.ObjectId;
}

export { IEventModel };
