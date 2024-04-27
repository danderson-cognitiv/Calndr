import * as Mongoose from "mongoose";
import {IUserModel} from '../interfaces/IUserModel';

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
        
        this.schema = new Mongoose.Schema({
            username: String,
            email: String,
            password: String,
            fName: String,
            lName: String,
            eventsVisible: Boolean,
            friends: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'User' }] // Reference to User model
        }, {collection: 'users'}
        ); 
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            Mongoose.set('debug', true);

            this.model = Mongoose.model<IUserModel>("User", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async getUserById(userId:string): Promise<IUserModel | null> {
        try {
            const user = await this.model
            .findById(userId)
            .populate('friends', 'username email');
            console.log(user)
            return user;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }
    
    public async createUser(userData: Partial<IUserModel>): Promise<Mongoose.Document | null> {
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

    public async updateUser(userId: string, userData: Partial<IUserModel>): Promise<UserModel | null> {
        try {
            // Option 1: Update and return the updated document
            const updatedUser = await this.model.findByIdAndUpdate(userId, { $set: userData }, { new: true, runValidators: true });

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