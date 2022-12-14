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
exports.PasswordReset = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// @schema: E-mail Verification Model
const PasswordResetSchema = new mongoose_1.default.Schema({
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    token: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    expiresAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
});
PasswordResetSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let ROUNDS = 10;
        if (!this.isModified("password")) {
            return next();
        }
        this.token = (yield bcryptjs_1.default.hash(this.token, ROUNDS));
        return next();
    });
});
PasswordResetSchema.methods.compareResetToken = function (enteredToken) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(enteredToken, this.token);
    });
};
const PasswordReset = mongoose_1.default.model("PasswordReset", PasswordResetSchema);
exports.PasswordReset = PasswordReset;
