require('dotenv').config();
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
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
    isNewUser: boolean;
    photo: string;
    createdAt: Date;
    address: string;
    pastEventsHeld: number;
    upcomingEvents: number;
    isActive: boolean;
    isLocked: boolean;
    isVerified: boolean;
    isLoggedIn: boolean;
    isValid: boolean;
    virtualCredits: number;
    reputationPoints: number;
    premiumAccount: boolean;

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
    role: string; // Role of the user
    accountActive: boolean; // Account active or not
    accountVerified: boolean; // Accoutn verified or not
    accountLocked: boolean; // True or false if the account is locked or not
    address: string;
    photo: string; // User avatar
    isNewUser: boolean;
    createdAt: Date;
    pastEventsHeld: number;
    postCode: string;
    upcomingEvents: number;
    virtualCredits: number;
    reputationPoints: number;
    isActive: boolean;
    isLocked: boolean;
    isVerified: boolean;
    isLoggedIn: boolean;
    isValid: boolean;
    premiumAccount: boolean;

    comparePasswords: (enteredPassword: string) => Promise<boolean>;
    getAuthenticationToken: () => Promise<void>;

}

// Roles a user can take
enum UserRoles {
    Admin = "Admin", User = "User", Moderator = "Moderator", Organiser = "Organiser"
}

const UserSchema = new mongoose.Schema({

    forename: { // User's forename
        type: String,
        trim: true,
        required: [true, "Please provide your forename"],
        min: [5, "Forename cannot exceed 10 characters"],
        max: [3, "Forename cannot be less than 3 characters"]
    },

    surname: { // Users surname
        type: String,
        required: [true, "Please provide your surname"],
        minlength: [5, "Your surname must be at least 5 characters"],
        maxlength: [10, "Your surname cannot exceed 10 characters"]
    },
    
    // username of the user
    username: {
        type: String,
        required: true,
        minlength: [5, "Username must be at least 5 characters long"],
        maxlength: [10, "Username must be at least 10 characters long"],
        trim: true
    },

    // User's e-mail address
    email: {
        type: String,
        required: [true, "Please specify a valid e-mail address"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    photo: { // Photo for the user
        type: String, // Type is string
        default: 'no-photo.jpg'
    },

    // The user's password
    password: {
        type: String,
        trim: true,
        required: [true, "Please provide a valid password"]
    },

    passwordConfirm: { // Confirm the user password
        type: String,
        required: [true, "Please confirm your password"]
    },

    role: {
        type: String,
        enum: [UserRoles.Admin, UserRoles.Moderator, UserRoles.Organiser, UserRoles.User],
        default: UserRoles.User
    },

    ticketsOwned: { // The number of tickets the user owns (This number increments after the user books a ticket and sends ether to the organiser's wallet )
        type: Number,
        default: 0
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

    isNewUser: {
        type: Boolean,
        default: false
    },

    isActive: { // User account active
        type: Boolean,
        default: false
    },

    isValid: {
        type: Boolean,
        default: false
    },

    isLoggedIn: {
        type: Boolean,
        default: false
    }

}, {timestamps: true, toJSON: {virtuals: true}});

// @description: Before saving a user to the database, hash their password
UserSchema.pre('save', async function(next: () => void) {

    let SALT_ROUNDS = 10;

    if(!this.isModified("password")) {
      return next();
    }

   this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
   this.passwordConfirm = await bcrypt.hash(this.passwordConfirm, SALT_ROUNDS);

   return next();
})

UserSchema.methods.comparePasswords = async function(password: string): Promise<boolean> {
    const hashedPassword: string = (this as unknown as UserDocument).password!;
    return await bcrypt.compare(password, hashedPassword);
}

UserSchema.methods.getAuthenticationToken = function() {
   return jwt.sign({id: this._id}, process.env.AUTH_SERVICE_JWT_TOKEN!, {expiresIn: process.env.AUTH_SERVICE_JWT_EXPIRES_IN});
}

const User = mongoose.model<UserDocument>("User", UserSchema);
export {User} // Export user model