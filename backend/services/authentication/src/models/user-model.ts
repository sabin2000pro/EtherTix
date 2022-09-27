import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

interface UserDocument {
    username: string;
    email: string;
    password: string;
    role: string;

    comparePasswords: (enteredPassword: string) => boolean;
    getAuthenticationToken: () => void;
}

// Working on the auth feature branch
const UserSchema = new mongoose.Schema<UserDocument>({
    username: {
        type: String,
        required: true
    }
})

export default UserSchema;