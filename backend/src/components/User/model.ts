import mongoose, { Schema, Document } from 'mongoose';

enum Profiles {
    ADMIN = 'admin',
    USER = 'user',
}

interface IUser extends Document {
    name: string;
    password: string;
    email: string;
    profile: Profiles;
}

const UserSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profile: {
        type: String,
        enum: Object.values(Profiles),
        default: Profiles.USER,
    },
});

export default mongoose.model<IUser>('User', UserSchema);
