import * as Mongoose from "mongoose";
import {IUserModel} from '../interfaces/IUserModel';
const { ObjectId } = require('mongoose').Types;


class UserModel {
    public schema:any;
    public model:any;

    public static getModel(mongoose: Mongoose.Mongoose) : UserModel {
        return new UserModel(mongoose);
    }
    
    private constructor(mongoose: Mongoose.Mongoose) {
        this.createSchema();
        this.createModel(mongoose);
    }

    private createSchema() {
        
        this.schema = new Mongoose.Schema({
            _id: String,
            username: String,
            email: String,
            password: String,
            fName: String,
            lName: String,
            eventsVisible: Boolean,
            friends: [{ type: String, ref: 'User' }] // Reference to User model
        }, {collection: 'users'}
        ); 
    }

    private async createModel(mongoose: Mongoose.Mongoose) {
        this.model = mongoose.model<IUserModel>('User', this.schema);
    }



    public async getUserById(userId:string): Promise<IUserModel | null> {
        try {
            const user = await this.model
            .findById(userId)
            .populate('friends', 'username email');
            return user;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }

    public async getUserByName(username:string): Promise<IUserModel | null> {
        try {
            const user = await this.model
            .findOne({username: username})
            .populate('friends', 'username email');
            console.log(user)
            return user;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }

    public async getUsers(): Promise<IUserModel[]> {
        try {
            const users = await this.model.find()
            return users;
        }
        catch(e) {
            console.error(e);
            return [];
        }
    }

    public async getFriendsByUserId(userId: string): Promise<IUserModel[]> {
        try {
            const user = await this.model.findById(userId).populate({
                path: 'friends',
                select: 'username email fName lName'
            });
    
            if (user && user.friends) {
                console.log('Friends found:', user.friends);
                return user.friends;
            } else {
                console.log('No friends found or user not found');
                return [];
            }
        } catch (e) {
            console.error('Error retrieving friends:', e);
            return [];
        }
    }
    
    public async createUser(userData: Partial<IUserModel>): Promise<IUserModel | null> {
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
            const updatedUser = await this.model.findByIdAndUpdate(userId, { $set: userData }, { new: true, runValidators: true });

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

    public async deleteUser(userId: string): Promise<boolean> {
        try {
            var result = await this.model.findByIdAndDelete(userId).exec();
            return !!result;
        } catch (error) {
            console.error('Error deleting user:', error);
            return false;
        }
    }

}
export {UserModel};