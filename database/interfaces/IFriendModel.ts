import * as Mongoose from "mongoose";
interface IFriendModel {
    userId: Mongoose.Types.ObjectId;
    name: string;
}
export { IFriendModel };
