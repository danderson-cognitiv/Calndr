import * as Mongoose from "mongoose";

interface IPhotoModel extends Mongoose.Document {
    _id: any,
    message: Mongoose.Schema.Types.ObjectId;
    path: String;
}

export { IPhotoModel };
