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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../../config.env' });
// Working on the auth feature branch
const UserSchema = new mongoose_1.default.Schema({
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
    address: {
        type: String
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
    }
}, { timestamps: true });
// @description: Before saving a user to the database, hash their password
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
        return next();
    });
});
UserSchema.methods.comparePasswords = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = this.password;
        return yield bcryptjs_1.default.compare(password, hashedPassword);
    });
};
// Sign JWT Token and retrieve it
UserSchema.methods.getAuthenticationToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_EXPIRES_IN });
};
const User = mongoose_1.default.model("User", UserSchema);
exports.User = User;
//# sourceMappingURL=user-model.js.map