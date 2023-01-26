"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Roles a user can take
var UserRoles;
(function (UserRoles) {
    UserRoles["Admin"] = "Admin";
    UserRoles["User"] = "User";
    UserRoles["Moderator"] = "Moderator";
    UserRoles["Organiser"] = "Organiser";
})(UserRoles || (UserRoles = {}));
var AccountType;
(function (AccountType) {
    AccountType["Basic"] = "Basic";
    AccountType["Standard"] = "Standard";
    AccountType["Premium"] = "Premium";
    AccountType["Platinum"] = "Platinum";
})(AccountType || (AccountType = {}));
// Working on the auth feature branch
const UserSchema = new mongoose_1.default.Schema({
    forename: {
        type: String,
        trim: true,
        required: [true, "Please provide your forename"],
        maxlength: [10, "Forename cannot exceed 10 characters"],
        minlength: [3, "Forename cannot be less than 3 characters"]
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
    address: {
        type: String
    },
    // User's e-mail address
    email: {
        type: String,
        required: [true, "Please specify a valid e-mail address"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    // The user's password
    password: {
        type: String,
        trim: true,
        required: [true, "Please provide a valid password"]
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"]
    },
    role: {
        type: String,
        enum: [UserRoles.Admin, UserRoles.Moderator, UserRoles.Organiser, UserRoles.User],
        required: [true, "Please specify the role of the user"],
        default: UserRoles.User
    },
    ticketsOwned: {
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
    isActive: {
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
}, { timestamps: true, toJSON: { virtuals: true } });
// @description: Before saving a user to the database, hash their password
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let ROUNDS = 10;
        if (!this.isModified("password")) {
            return next();
        }
        this.password = yield bcryptjs_1.default.hash(this.password, ROUNDS);
        this.passwordConfirm = yield bcryptjs_1.default.hash(this.passwordConfirm, ROUNDS);
        return next();
    });
});
UserSchema.methods.comparePasswords = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = this.password;
        return yield bcryptjs_1.default.compare(password, hashedPassword);
    });
};
UserSchema.methods.getAuthenticationToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_EXPIRES_IN });
};
const User = mongoose_1.default.model("User", UserSchema);
exports.User = User;
