import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
interface ITwoFactorVerification {
    owner: mongoose.Schema.Types.ObjectId,
    mfaToken: string;
    createdAt: Date;
    expiresAt: Date;

    compareVerificationTokens: (enteredToken: string) => Promise<boolean>
}

interface TwoFactorVerificationDocument extends mongoose.Model<ITwoFactorVerification> {
    owner: mongoose.Schema.Types.ObjectId,
    mfaToken: string; // Verification Token
    createdAt: Date;
    expiresAt: Date;

    compareVerificationTokens: (enteredToken: string) => Promise<boolean>
}

// @schema: E-mail Verification Model
const TwoFactorVerificationSchema = new mongoose.Schema<TwoFactorVerificationDocument>({

    owner: { // Owner of the verification token
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    mfaToken: { // the token itself
        type: String,
        required: [true, "Please provide a valid MFA Token"]
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    expiresAt: {
        type: Date,
        default: Date.now()
    }

}, {
    timestamps: true
})

TwoFactorVerificationSchema.pre('save', async function(next) {

    if(!this.isModified('mfaToken')) {
        return next();
    }

    // Hash the token
    this.mfaToken = await bcrypt.hash(this.mfaToken, 10);
    return next();
})

TwoFactorVerificationSchema.methods.compareVerificationTokens = async function(enteredToken: string): Promise<boolean> {
    return await bcrypt.compare(enteredToken, this.mfaToken);
}

const TwoFactorVerification = mongoose.model<TwoFactorVerificationDocument>("TwoFactorVerification", TwoFactorVerificationSchema);
export {TwoFactorVerification}