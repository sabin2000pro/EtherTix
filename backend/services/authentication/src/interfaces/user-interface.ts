import mongoose from 'mongoose';

export interface IUserAttributes {
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

export interface UserDocument extends mongoose.Model<IUserAttributes> { // User Document holding all of the information regarding a user
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
