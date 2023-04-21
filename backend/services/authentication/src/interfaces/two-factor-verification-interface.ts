import mongoose from 'mongoose';

export interface ITwoFactorVerification {
    owner: mongoose.Schema.Types.ObjectId,
    mfaToken: string;
    createdAt: Date;
    expiresAt: Date;
    sentAt: Date;

    compareVerificationTokens: (enteredToken: string) => Promise<boolean>
}

export interface TwoFactorVerificationDocument extends mongoose.Model<ITwoFactorVerification> {
    owner: mongoose.Schema.Types.ObjectId,
    mfaToken: string; // Verification Token
    createdAt: Date;
    expiresAt: Date;
    sentAt: Date;

    compareVerificationTokens: (enteredToken: string) => Promise<boolean>
}
