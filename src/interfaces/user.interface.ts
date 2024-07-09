import { Document } from "mongoose";


interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
}

export default IUser;