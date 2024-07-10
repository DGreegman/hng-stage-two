import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user.interface';

const user_sechema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, '{PATH}  is required']
        },
        lastName: {
            type: String,
            required: [true, '{PATH}  is required']
        },
        email: {
            type: String,
            required: [true, '{PATH}  is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, '{PATH}  is required']
        },
        phone: {
            type: String,
            required: [true, '{PATH}  is required'],
            unique: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const User = mongoose.model<IUser>('User', user_sechema);
export default User
