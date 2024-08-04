import mongoose from 'mongoose';
import {Request, Response} from 'express';
import Friend, {IFriend} from '../models/Friend';
import User from '../models/User';
import { IToken, verifyToken } from '../services/user';

export const searchFriend = async (req: Request, res: Response) => {
    try {
        const searchQuery = req.query.search;
        let regex = new RegExp('', 'i'); // Default to an empty regex

        if (typeof searchQuery === 'string') {
            regex = new RegExp(searchQuery, 'i');
        }

        const user = verifyToken(req.header('Authorization')) as IToken;
        
        const users = await User.find({ _id: { $ne: user.id }, $or: [
            { first_name: regex },
            { last_name: regex }
        ]}).exec();
        res.status(200).json(users);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const sendFriendRequest = async (req: Request, res: Response) => {
    try {
        const newFriend = await new Friend({
            friend: req.params.id,
            user: (req as any).user.id
        });
        const friend: IFriend = await newFriend.save() as IFriend;
        res.status(201).json(friend);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
    try {
        await Friend.findOneAndUpdate({friend: req.params.id, user: (req as any).user.id}, {status: 1});
        res.status(201).json('Successfully accepted friend request');
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const declineOrRemoveFriend = async (req: Request, res: Response) => {
    try {
        await Friend.findOneAndDelete({friend: req.params.id, user: (req as any).user.id});
        res.status(201).json('Successfully declined friend request');
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};