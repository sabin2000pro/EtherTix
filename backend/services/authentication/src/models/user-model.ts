import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

interface UserDocument {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    role: string;

    comparePasswords: (enteredPassword: string) => boolean;
    getAuthenticationToken: () => void;
}

// Working on the auth feature branch
const UserSchema = new mongoose.Schema<UserDocument>({
    
    username: {
        type: String,
        required: true,
        minlength: [5, "Username must be at least 5 characters long"],
        maxlength: [20, "Username must be at least 20 characters long"]
    },

    email: {
        type: String,
        required: true
    }
})

export default UserSchema;//test