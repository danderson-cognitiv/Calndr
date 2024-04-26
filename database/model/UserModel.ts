import * as Mongoose from "mongoose";
import {IUserModel} from '../interfaces/IUserModel';
import {IUpdateUserData} from '../interfaces/IUpdateUserData';
import {IFriendModel} from '../interfaces/IFriendModel';

const FriendSchema = new Mongoose.Schema({
    userId: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true }
});

class UserModel {
    public schema:any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        
        this.schema = new Mongoose.Schema(
            {
                name: String,
                email: String,
                password: String,
                f_name: String,
                l_name: String,
                events_visible: Boolean,
                friends: [FriendSchema]
            }, {collection: 'users'}
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            Mongoose.set('debug', true);

            this.model = Mongoose.model<IUserModel>("Users", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async getUserByName(name:string): Promise<IUserModel | null> {
        var query = this.model.findOne({'name': name});
        try {
            
            return await query.exec();
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }

    public async getFriendsByUserId(userId:string):Promise<IFriendModel | null>{
        var query = this.model.findOne({_id: new Mongoose.Types.ObjectId(userId)}).select('friends');
        try {
            const result = await query.exec()
            return result.friends
        }
        catch (e) {
            console.error(e);
            return null
        }
    }
    

    public async createUser(userData: {
        name: string,
        email: string,
        password: string,
        f_name: string,
        l_name: string,
        events_visible: boolean,
        friends: { userId: Mongoose.Types.ObjectId, name: string }[]
    }): Promise<Mongoose.Document | null> {
        try {
            const user = new this.model(userData);
            await user.save();
            console.log('User created successfully');
            return user;
        } catch (e) {
            console.error('Error creating user:', e);
            return null;
        }
    }

    public async updateUser(userId: Mongoose.Types.ObjectId, updates: IUpdateUserData): Promise<UserModel | null> {
        try {
            // Option 1: Update and return the updated document
            const updatedUser = await this.model.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true });

            // Option 2: Just update the document without returning it
            // await this.model.updateOne({ _id: userId }, { $set: updates });

            if (updatedUser) {
                console.log('User updated successfully');
                return updatedUser;
            } else {
                console.log('User not found');
                return null;
            }
        } catch (e) {
            console.error('Error updating user:', e);
            return null;
        }
    }

}
export {UserModel};