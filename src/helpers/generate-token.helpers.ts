import { Response } from 'express'
import jwt from 'jsonwebtoken';

const generate_token = (res:Response, user_id:string) => {
    const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
    const thirty_days = 30 * 24 * 60 * 60 * 1000
    // const now = new Date();
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: thirty_days, // 30 days
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict'
    });
    return token;
};

export default generate_token;
