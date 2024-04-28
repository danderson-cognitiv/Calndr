import * as Mongoose from 'mongoose';
import { UserModel } from './model/UserModel';
import { UserEventModel } from './model/UserEventModel';
import { EventModel } from './model/EventModel';
import { MessageModel } from './model/MessageModel';
import { PhotoModel } from './model/PhotoModel';


export class DatabaseModels {
    private static connection: Mongoose.Connection;

    public static async initialize(DB_CONNECTION_STRING: string): Promise<void> {
        if (!DatabaseModels.connection) {
            await Mongoose.connect(DB_CONNECTION_STRING);
            DatabaseModels.connection = Mongoose.connection;
        }
    }

    public static get userModel(): UserModel {
        return UserModel.getModel(Mongoose);
    }

    public static get eventModel(): EventModel {
        return EventModel.getModel(Mongoose);
    }

    public static get userEventModel(): UserEventModel {
        return UserEventModel.getModel(Mongoose);
    }

    public static get messageModel(): MessageModel {
        return MessageModel.getModel(Mongoose);
    }

    public static get photoModel(): PhotoModel {
        return PhotoModel.getModel(Mongoose);
    }
}
