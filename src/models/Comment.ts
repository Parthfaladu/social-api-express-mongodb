import {Schema, model} from'mongoose';

const CommentSchema = new Schema({
    comment: { 
        type: String,
        required: true
    },
    post: { type: Schema.Types.ObjectId, ref: 'posts' },
    user: { type: Schema.Types.ObjectId, ref: 'users' }
}, {
    timestamps: true,
});

export default model('comments', CommentSchema);