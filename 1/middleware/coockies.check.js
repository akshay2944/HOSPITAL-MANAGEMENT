import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
export const checkCookies = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};  
