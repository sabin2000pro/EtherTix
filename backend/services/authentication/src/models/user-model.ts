import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface UserDocument {
    forename: string;
    surname: string;
    username: string;
    email: string; // The user's e-mail address
    password: string;
    passwordConfirm: string;
    role: string;
    accountActive: boolean;
    accountVerified: boolean;
    accountLocked: boolean;

    photo: string;
    createdAt: Date;

    comparePasswords: (enteredPassword: string) => Promise<boolean>;
    getAuthenticationToken: () => Promise<void>;
}

// Working on the auth feature branch
const UserSchema = new mongoose.Schema<UserDocument>({

    forename: {
        type: String,
        required: [true, "Please provide your forename"]
    },

    surname: {
        type: String,
        required: [true, "Please provide your surname"]
    },
    
    // username of the user
    username: {
        type: String,
        required: true,
        minlength: [5, "Username must be at least 5 characters long"],
        maxlength: [20, "Username must be at least 20 characters long"],
        trim: true
    },

    // User's e-mail address
    email: {
        type: String,
        required: true,
        unique: true
    },

    photo: {
        type: String,
        required: [true, "Please upload a valid user avatar"],
        default: 'no-photo.jpg'
    },

    // The user's password
    password: {
        type: String,
        required: [true, "Please provide a valid password"]
    },

    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"]
    },

    role: {
        type: String,
        required: [true, "Please provide a valid role for the user"],
        enum: ["admin", "moderator", "organiser"],
        default: "user"
    }

}, {timestamps: true});

// @description: Before saving a user to the database, hash their password
UserSchema.pre('save', async function(next) {
    
   if(!this.isModified("password")) {
     return next();
   }

   this.password = await bcrypt.hash(this.password, 10);

   return next();
})

UserSchema.methods.comparePasswords = async function(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(this.password, enteredPassword);
}

UserSchema.methods.getAuthenticationToken = function() {
    // Sign JWT token
}

export default UserSchema; // Export the user schema