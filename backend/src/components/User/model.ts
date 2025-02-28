import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    password: string;
    email: string;
}

const UserSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);
