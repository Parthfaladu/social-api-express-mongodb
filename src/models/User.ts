import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 255
    },
    first_name: {
        type: String,
        required: true,
        max: 255
    },
    last_name: {
        type: String,
        required: true,
        max: 255
    }
}, {
    timestamps: true,
});

export default model<IUser>('users', UserSchema);