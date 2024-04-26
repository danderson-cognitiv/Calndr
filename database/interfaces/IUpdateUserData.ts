import * as Mongoose from "mongoose";

interface IUpdateUserData {
    name?: string;
    email?: string;
    password?: string;
    f_name?: string;
    l_name?: string;
    events_visible?: boolean;
    friends?: Array<{
        userId: Mongoose.Types.ObjectId;
        name: string;
    }>;
}
export { IUpdateUserData };
