import * as Mongoose from "mongoose";

interface IUserModel extends Mongoose.Document {
    username: string;
    email: string;
    password: string;
    f_name: string;
    l_name: string;
    events_visible: boolean;
    friends: Mongoose.Schema.Types.ObjectId[];
}

export { IUserModel };
