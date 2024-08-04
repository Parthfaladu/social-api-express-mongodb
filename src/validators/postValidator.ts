import mongoose from'mongoose';
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const postCreateSchema = yup.object().shape({
    description: yup.string().required()
});

const paginationSchema = yup.object().shape({
    page: yup.number().integer().min(1),
    limit: yup.number().integer().min(1).max(100)
});

const commentOnPostSchema = yup.object().shape({
    comment: yup.string().required()
});

export const postCreateValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await postCreateSchema.validate(req.body);
        next();
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError || error instanceof yup.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const paginationValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await paginationSchema.validate(req.query);
        next();
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError || error instanceof yup.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const commentOnPostValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await commentOnPostSchema.validate(req.body);
        next();
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError || error instanceof yup.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
