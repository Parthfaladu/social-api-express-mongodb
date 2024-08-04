import { Document, Schema, model } from 'mongoose';

export interface IPost extends Document {
    description: string;
    user: string;
}

const PostSchema = new Schema<IPost>({
    description: {
        type: String,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
}, {
    timestamps: true,
});

export default model<IPost>('posts', PostSchema);