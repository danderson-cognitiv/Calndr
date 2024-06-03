import * as Mongoose from "mongoose";

interface IUserModel extends Mongoose.Document {
    _id: string,
    username: string;
    email: string;
    fName: string;
    lName: string;
    eventsVisible: boolean;
    friends: Mongoose.Schema.Types.ObjectId[];
}

export { IUserModel };
