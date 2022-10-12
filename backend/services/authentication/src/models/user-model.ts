import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config({path: '../../config.env'});

interface IUserAttributes {
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
    address: string;
    pastEventsHeld: number;
    upcomingEvents: number;
    isActive: boolean;
    isLocked: boolean;
    isVerified: boolean;

    comparePasswords: (enteredPassword: string) => Promise<boolean>;
    getAuthenticationToken: () => Promise<void>;
}

interface UserDocument extends mongoose.Model<IUserAttributes> { // User Document holding all of the information regarding a user
    forename: string;
    surname: string; // Users surname
    username: string; // Username of the user
    email: string; // The user's e-mail address
    password: string;
    passwordConfirm: string; // Password Confirmation
    role: string;
    accountActive: boolean;
    accountVerified: boolean;
    accountLocked: boolean; // True or false if the account is locked or not
    address: string;
    photo: string;
    createdAt: Date;

    pastEventsHeld: number;
    upcomingEvents: number;

    isActive: boolean;
    isLocked: boolean;
    isVerified: boolean;

    comparePasswords: (enteredPassword: string) => Promise<boolean>;
    getAuthenticationToken: () => Promise<void>;
}

// Working on the auth feature branch
const UserSchema = new mongoose.Schema({

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
        enum: ["admin", "moderator", "organiser", "user"],
        default: "user"
    },

    pastEventsHeld: {
        type: Number,
        default: 0,
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isLocked: { 
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

// @description: Before saving a user to the database, hash their password
UserSchema.pre('save', async function(next: () => void) {

   if(!this.isModified("password")) {
     return next();
   }

   this.password = await bcrypt.hash(this.password, 10);

   return next();
})

UserSchema.methods.comparePasswords = async function(password: string): Promise<boolean> {
    const hashedPassword: string = (this as unknown as UserDocument).password!;
    return await bcrypt.compare(password, hashedPassword);
}

 // Sign JWT Token and retrieve it
UserSchema.methods.getAuthenticationToken = function() {
   return jwt.sign({id: this._id}, process.env.JWT_TOKEN!, {expiresIn: process.env.JWT_EXPIRES_IN!});
}

const User = mongoose.model<UserDocument>("User", UserSchema);
export {User}