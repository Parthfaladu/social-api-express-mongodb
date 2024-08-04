import {Schema, model, Document} from 'mongoose';

export interface IFriend extends Document {
    status: number;
    friend: string;
    user: string;
}

const friendSchema = new Schema<IFriend>({
    status: {
        type: Number,
        required: true,
        default: 0
    },
    friend: { type: Schema.Types.ObjectId, ref: 'users' },
    user: { type: Schema.Types.ObjectId, ref: 'users' }
});

export default model<IFriend>('friends', friendSchema);