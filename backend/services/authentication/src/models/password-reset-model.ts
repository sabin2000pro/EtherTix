import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'

interface IPasswordReset {
    owner: mongoose.Schema.Types.ObjectId,
    token: string;
    createdAt: Date;
    expiresAt: Date;
}

// @schema: E-mail Verification Model
const PasswordResetSchema = new mongoose.Schema<IPasswordReset>({
    owner: {

    },

    token: {

    }
})

export default PasswordResetSchema;