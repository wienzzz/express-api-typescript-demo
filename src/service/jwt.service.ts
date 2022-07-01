import 'dotenv/config';
import jwt from 'jsonwebtoken';
// get config vars

// access config var
export function generateAccessToken(data: any, expired: number = 1800) {
    return jwt.sign(data, <string>process.env.JWT_TOKEN, { expiresIn: expired+'s' });
}