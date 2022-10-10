import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

interface IPasswordReset {
    owner: mongoose.Schema.Types.ObjectId,
    token: string;
    createdAt: Date;
    expiresAt: Date;
}

interface PasswordResetDocument extends mongoose.Model<IPasswordReset> {
    owner: mongoose.Schema.Types.ObjectId,
    token: string;
    createdAt: Date;
    expiresAt: Date;
}

// @schema: E-mail Verification Model
const PasswordResetSchema = new mongoose.Schema<PasswordResetDocument>({

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

PasswordResetSchema.pre('save', async function(next) {

    let ROUNDS = 10;

    if(!this.isModified("password")) {
        return next();
    }

    this.token = await bcrypt.hash(this.token, ROUNDS) as any;

    return next();
})

PasswordResetSchema.methods.compareResetToken = async function(enteredToken: string): Promise<boolean> {
    return await bcrypt.compare(enteredToken, this.token);
}

const PasswordReset = mongoose.model<PasswordResetDocument>("PasswordReset", PasswordResetSchema);
export {PasswordReset};

