import * as Mongoose from 'mongoose';
import mongoose from 'mongoose';
import { UserModel } from './model/UserModel';
import { UserEventModel } from './model/UserEventModel';
import { EventModel } from './model/EventModel';
import { MessageModel } from './model/MessageModel';
import { PhotoModel } from './model/PhotoModel';


export class DatabaseModels {
    private static connection: Mongoose.Connection;
    private static userModel: UserModel;
    private static eventModel: EventModel;
    private static userEventModel: UserEventModel;
    private static messageModel: MessageModel;
    private static photoModel: PhotoModel;


    public static async initialize(DB_CONNECTION_STRING: string): Promise<void> {
        if (!this.connection) {
            await Mongoose.connect(DB_CONNECTION_STRING);
            this.connection = Mongoose.connection;
            this.userModel = UserModel.getModel(Mongoose);
            this.eventModel = EventModel.getModel(Mongoose);
            this.userEventModel = UserEventModel.getModel(Mongoose);
            this.messageModel = MessageModel.getModel(Mongoose);
            this.photoModel = PhotoModel.getModel(Mongoose);
            console.log('db models done')
        }
    }

    public static async close(): Promise<void> {
        if (this.connection) {
            this.connection.close;
        }
    }

    public static get UserModel(): UserModel {
        return this.userModel;
    }

    public static get EventModel(): EventModel {
        return this.eventModel;
    }

    public static get UserEventModel(): UserEventModel {
        return this.userEventModel;
    }

    public static get MessageModel(): MessageModel {
        return this.messageModel;
    }

    public static get PhotoModel(): PhotoModel {
        return this.photoModel;
    }
}
