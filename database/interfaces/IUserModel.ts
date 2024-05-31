import * as Mongoose from "mongoose";

interface IUserModel extends Mongoose.Document {
    _id: any,
    username: string;
    email: string;
    password: string;
    fName: string;
    lName: string;
    eventsVisible: boolean;
    friends: Mongoose.Schema.Types.ObjectId[];
}

export { IUserModel };
