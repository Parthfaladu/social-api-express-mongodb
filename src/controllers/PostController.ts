import mongoose from'mongoose';
import { Request, Response } from 'express';
import Post, {IPost} from '../models/Post';
import Like from '../models/Like';
import Comment from '../models/Comment';

export const createPost = async (req: Request, res: Response) => {
try {
    const newPost = await new Post({
        description: req.body.description,
        user: (req as any).user?.id,
    });
    const post: IPost = await newPost.save() as IPost;
    res.status(201).json(post);
} catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
        res.status(422).json({ message: 'Validation error', details: error.errors });
    } else {
        res.status(500).json({ message: 'Internal server error' });
    }
}
};

export const posts = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.body;
        const posts = await Post.find({}, null, { skip:  page > 1 ? ((page - 1) * limit) + 1 : (page - 1) * limit }).populate({path: 'user'}).exec();

        const postWithLikesAndComments = await Promise.all(posts.map(async (post) => {
            const likes = await Like.countDocuments({ post: post._id });
            const comments = await Comment.find({ post: post._id }).populate({path: 'user'}).exec();

            return {...post.toObject(), likes, comments };
        }));

        res.status(200).json(postWithLikesAndComments);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const likePost = async (req: Request, res: Response) => {
    try {
        const newLike = await new Like({
            post: req.params.id,
            user: (req as any).user.id,
        });

        await newLike.save();

        res.status(200).json('Liked post!');
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const unlikePost = async (req: Request, res: Response) => {
    try {
        await Like.findOneAndDelete({ post: req.params.id, user: (req as any).user.id });
        res.status(200).json('Unliked post!');
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const commentOnPost = async (req: Request, res: Response) => {
    try {
        const newComment = await new Comment({
            comment: req.body.comment,
            post: req.params.id,
            user: (req as any).user?.id,
        });
        const comment = await newComment.save();
        res.status(200).json(comment);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(422).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};