import { Request, Response, NextFunction } from 'express';
import user_service from '../services/user.service';
import org_service from '../services/org.service';
import IUser from '../interfaces/user.interface';
import IOrg from '../interfaces/org.interface';
import generate_token from '../helpers/generate-token.helpers';

class User_Controller {
    async register(req: Request, res: Response) {
        const user_data: IUser = req.body;
        const org_data: IOrg = req.body;

        try {
            const email_exists = await user_service.find_user_by_email(user_data.email);
            if (email_exists) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const new_user = await user_service.register_user_service(user_data);
            org_data.name = new_user.firstName + "'s Organization";
            org_data.description = `Organization created by ${new_user.firstName} ${new_user.lastName}`;
            const new_org = await org_service.create_org_service(org_data);
            console.log(new_org);
            const token = generate_token(res, new_user._id as string);
            res.status(201).json({
                status: 'success',
                message: 'User and User Organization registered successfully',
                data: {
                    accessToken: token,
                    user_id: new_user._id,
                    firstname: new_user.firstName,
                    lastname: new_user.lastName,
                    email: new_user.email,
                    phone: new_user.phone
                }
            });
        } catch (e: any) {
            if (e.name === 'ValidationError') {
                if (e.errors['firstName']) {
                    return res.status(406).json({
                        errors: [
                            {
                                field: 'firstName',
                                message: e.errors['firstName'].message
                            }
                        ]
                    });
                }
                if (e.errors['lastName']) {
                    return res.status(406).json({
                        errors: [
                            {
                                field: 'lastName',
                                message: e.errors['lastName'].message
                            }
                        ]
                    });
                }
                if (e.errors['email']) {
                    return res.status(422).json({
                        errors: [
                            {
                                field: 'email',
                                message: e.errors['email'].message
                            }
                        ]
                    });
                }
                if (e.errors['password']) {
                    return res.status(422).json({
                        errors: [
                            {
                                field: 'password',
                                message: e.errors['password'].message
                            }
                        ]
                    });
                }
                if (e.errors['phone']) {
                    return res.status(422).json({
                        errors: [
                            {
                                field: 'password',
                                message: e.errors['password'].message
                            }
                        ]
                    });
                }
            }
            res.status(401).json({
                status: 'Bad request',
                message: 'Registeration UnSuccessful',
                statusCode: 401
            });
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const user = await user_service.login_user_service(email, password);
            // const id:unknown = user._id
            const token: any = generate_token(res, user._id as string);
            res.json({
                status: 'success',
                message: 'User logged in successfully',

                data: {
                    accessToken: token,
                    user: {
                        email: user.email,
                        firstname: user.firstName,
                        lastname: user.lastName,
                        phone: user.phone,
                        user_id: user._id
                    }
                }
            });
        } catch (e: any) {
            res.status(401).json({
                status: 'Bad request',
                message: 'Authentication failed',
                statusCode: 401
            });
        }
    }
}

export default new User_Controller();
