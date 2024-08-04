import mongoose from'mongoose';

const LikeSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'posts' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
}, {
    timestamps: true,
});

export default mongoose.model('likes', LikeSchema);