import mongoose from'mongoose';
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required() 
});

const registerSchema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
});

export const loginValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await loginSchema.validate(req.body);
        next();
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError || error instanceof yup.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const registerValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await registerSchema.validate(req.body);
        next();
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError || error instanceof yup.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}