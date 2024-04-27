import * as Mongoose from "mongoose";

interface IPhotoModel extends Mongoose.Document {
    message: Mongoose.Schema.Types.ObjectId;
    path: String;
}

export { IPhotoModel };
