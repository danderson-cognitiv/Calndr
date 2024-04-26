import * as Mongoose from "mongoose";

interface IUserModel extends Mongoose.Document {
    name: string;
    email: string;
    password: string;
    f_name: string;
    l_name: string;
    events_visible: boolean;
    friends: Mongoose.Types.ObjectId[];
}

export { IUserModel };
