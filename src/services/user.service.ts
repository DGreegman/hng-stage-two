import bcrypt from 'bcryptjs';
import IUser from '../interfaces/user.interface';
import IOrg from '../interfaces/org.interface';
import User from '../models/user.model';


class USer_Service {
    async register_user_service(data: IUser): Promise<IUser> {
        const { firstName, lastName, email, password, phone } = data
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password:hashedPassword, phone });
        return user.save();
    }

    async find_user_by_email(email: string) {
        return User.findOne({ email });
    }
    async login_user_service(email: string, password: string) {
        const user = await this.find_user_by_email(email);
        if (!user) throw new Error('User not found');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');
        return user;
    }
}