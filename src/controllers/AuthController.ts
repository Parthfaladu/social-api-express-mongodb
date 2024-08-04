import { Request, Response } from 'express';
import mongoose from'mongoose';
import User, {IUser} from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync((req.body.password).toString(), salt);

        const newUser = await new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword
        });

    
        const user:IUser = await newUser.save() as IUser;

        res.status(200).json(user);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec();

        if(user && bcrypt.compareSync((req.body.password).toString(), user.password)) {
            const token = jwt.sign({id: user._id, password: user.password, email: user.email}, 'shhhhh');
            res.status(200).json(token);
        }
        res.status(400).json('Invalid credentials');
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}