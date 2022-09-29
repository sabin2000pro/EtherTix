import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'

interface IEmailVerification {
    owner: mongoose.Schema.Types.ObjectId,
    token: string;
    createdAt: Date;
    expiresAt: Date;

    compareEmailTokens: (enteredToken: string) => Promise<boolean>
}

interface EmailVerificationDocument extends mongoose.Model<IEmailVerification> {
    owner: mongoose.Schema.Types.ObjectId,
    token: string;
    createdAt: Date;
    expiresAt: Date;

    compareEmailTokens: (enteredToken: string) => Promise<boolean>
}

// @schema: E-mail Verification Model
const EmailVerificationSchema = new mongoose.Schema<IEmailVerification>({

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

})

export default EmailVerificationSchema;