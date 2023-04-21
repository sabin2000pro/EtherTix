import mongoose from 'mongoose';

export interface IPasswordReset {
    owner: mongoose.Schema.Types.ObjectId,
    token: string;
    createdAt: Date;
    expiresAt: Date;
}

export interface PasswordResetDocument extends mongoose.Model<IPasswordReset> {
    owner: mongoose.Schema.Types.ObjectId,
    token: string;
    createdAt: Date;
    expiresAt: Date;
}
