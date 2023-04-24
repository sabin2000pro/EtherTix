require('dotenv').config();
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserDocument } from "../interfaces/user-interface";

const passwordRegex = /^(?=.*[!@#$%^&*])/; // Regex to check for special characters

// Roles a user can take
enum UserRoles {
    Admin = "Admin", User = "User", Moderator = "Moderator", Organiser = "Organiser"
}

const UserSchema = new mongoose.Schema({

    forename: { // User's forename
        type: String,
        trim: true,
        minlength: [3, "Forename must be a minimum of 3 characters"],
        maxlength: [15, "Forename cannot exceed 12 characters"],
        required: [true, "Please provide your forename"]
    },

    surname: { // Users surname
        type: String,
        minlength: [5, "Surname must be a minimum of 5 characters"],
        maxlength: [12, "Surname cannot exceed 12 characters"],
        required: [true, "Please provide your surname"]
    },
    
    // username of the user
    username: {
        type: String,
        minlength: [6, "Username must have at least 6 characters"],
        maxlength: [12, "Username cannot exceed 12 characters"],
        required: [true, "Please provide a valid username"],
        trim: true
    },

    // User's e-mail address
    email: {
        type: String,
        minlength: [8, "E-mail Address must be at least 8 characters long"],
        maxlemngth: [15, "E-mail address cannot exceed 15 characters"],
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

        minlength: [6, "Password must have at least 6 characters"],
        required: [true, "Please provide a valid password"],

        validate: {

            validator: (password) => {
                return passwordRegex.test(password)
            },

            message: "Password must contain at least 1 special character for additional strength"
        }
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

    pastEventsHeld: { // The number of past events this user has held
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