import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

interface IEmailVerification {

    owner: mongoose.Schema.Types.ObjectId,
    token: string;
    createdAt: Date;
    expiresAt: Date;

    compareVerificationTokens: (enteredToken: string) => Promise<boolean> // Function declaration that compares verification tokens of the user
}

interface EmailVerificationDocument extends mongoose.Model<IEmailVerification> {
    owner: mongoose.Schema.Types.ObjectId,
    token: string; // Verification Token

    createdAt: Date;
    expiresAt: Date;

    compareVerificationTokens: (enteredToken: string) => Promise<boolean>
}

// @schema: E-mail Verification Model
const EmailVerificationSchema = new mongoose.Schema<EmailVerificationDocument>({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    token: {
        type: String,
        required: [true, "Please provide a valid token"]
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

EmailVerificationSchema.pre('save', async function(next) {

    if(!this.isModified('token')) {
        return next();
    }

    // Hash the token
    this.token = await bcrypt.hash(this.token, 10);
    return next();
})

EmailVerificationSchema.methods.compareVerificationTokens = async function(enteredToken: string): Promise<boolean> {
    return await bcrypt.compare(enteredToken, this.token);
}

const EmailVerification = mongoose.model<EmailVerificationDocument>("EmailVerification", EmailVerificationSchema);
export {EmailVerification}