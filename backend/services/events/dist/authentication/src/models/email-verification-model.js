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
exports.EmailVerification = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// @schema: E-mail Verification Model
const EmailVerificationSchema = new mongoose_1.default.Schema({
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    token: {
        type: String,
        required: [true, "Please provide a valid token"]
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
EmailVerificationSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('token')) {
            return next();
        }
        // Hash the token
        this.token = yield bcryptjs_1.default.hash(this.token, 10);
        return next();
    });
});
EmailVerificationSchema.methods.compareVerificationTokens = function (enteredToken) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(enteredToken, this.token);
    });
};
const EmailVerification = mongoose_1.default.model("EmailVerification", EmailVerificationSchema);
exports.EmailVerification = EmailVerification;
//# sourceMappingURL=email-verification-model.js.map