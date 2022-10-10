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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockUserAccount = exports.deactivateUserAccount = exports.resendTwoFactorLoginCode = exports.resendEmailVerificationCode = exports.updateUserProfile = exports.updateUserPassword = exports.verifyLoginToken = exports.verifyEmailAddress = exports.getCurrentUser = exports.resetPassword = exports.forgotPassword = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
var error_handler_1 = require("./../../../shared/error-handler");
var error_handler_2 = require("../../../shared/error-handler");
var user_model_1 = require("../models/user-model");
var email_verification_model_1 = require("../models/email-verification-model");
var http_status_codes_1 = require("http-status-codes");
var generate_otp_1 = require("../utils/generate-otp");
// @description: Register User API - Registers a new user on the platform
// @route: /api/v1/auth/register
// @http-method: POST
// @public: Yes (No Authorization Token Required)
var registerUser = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, passwordConfirm, existingUser, newUser, token, currentUser, userOTP, verificationToken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, email = _a.email, password = _a.password, passwordConfirm = _a.passwordConfirm;
                if (password !== passwordConfirm) {
                    return [2 /*return*/, next(new error_handler_2.BadRequestError("Password confirmation error. Please check passwords", http_status_codes_1.StatusCodes.BAD_REQUEST))];
                }
                return [4 /*yield*/, user_model_1.User.findOne({ email: email })]; // Find an existing user
            case 1:
                existingUser = _b.sent() // Find an existing user
                ;
                if (existingUser) {
                    return [2 /*return*/, next(new error_handler_2.BadRequestError("User already exists", http_status_codes_1.StatusCodes.BAD_REQUEST))];
                }
                return [4 /*yield*/, user_model_1.User.create(request.body)];
            case 2:
                newUser = _b.sent();
                token = newUser.getAuthenticationToken();
                if (!token) {
                    return [2 /*return*/, next(new error_handler_1.JwtTokenError("JWT Token invalid. Please ensure it is valid"))];
                }
                return [4 /*yield*/, newUser.save()];
            case 3:
                _b.sent();
                currentUser = newUser._id;
                userOTP = (0, generate_otp_1.generateOTPVerificationToken)();
                verificationToken = new email_verification_model_1.EmailVerification({ owner: currentUser, token: userOTP });
                return [4 /*yield*/, verificationToken.save()];
            case 4:
                _b.sent();
                // Send e-mail verification to user
                return [2 /*return*/, response.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, data: newUser, token: token })];
        }
    });
}); };
exports.registerUser = registerUser;
// @description: Login User API - Login User On Platform by storing the JWT cookie inside the current session
// @route: /api/v1/auth/register
// @http-method: POST
// @public: Yes (No Authorization Token Required)
var loginUser = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, matchPasswords, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    return [2 /*return*/, next(new error_handler_2.BadRequestError("Missing e-mail address or password. Check entries", http_status_codes_1.StatusCodes.BAD_REQUEST))];
                }
                return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, next(new error_handler_2.BadRequestError("Could not find that user", http_status_codes_1.StatusCodes.BAD_REQUEST))];
                }
                return [4 /*yield*/, user.comparePasswords(password)];
            case 2:
                matchPasswords = _b.sent();
                if (!matchPasswords) {
                    return [2 /*return*/, next(new error_handler_2.BadRequestError("Passwords do not match. Please try again", http_status_codes_1.StatusCodes.BAD_REQUEST))];
                }
                token = user.getAuthenticationToken();
                request.session = { jwt: token }; // Store the token in the session as a cookie
                return [2 /*return*/, response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, token: token })];
        }
    });
}); };
exports.loginUser = loginUser;
// @description: Logout User API - Logout User by clearing the cookie stored inside the session
// @route: /api/v1/auth/logout
// @http-method: GET
// @public: No (Authorization Token Required To Identify User)
var logoutUser = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (request.session !== undefined) {
            request.session = null;
        }
        return [2 /*return*/, response.status(200).json({ success: true, message: "Login User here" })];
    });
}); };
exports.logoutUser = logoutUser;
// @description: Forgot Password API - Users can submit a forgot password request to this API if they forget their password.
// @route: /api/v1/auth/forgot-password
// @http-method: POST
// @public: Yes (No Authorization Token Required)
var forgotPassword = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email;
    return __generator(this, function (_a) {
        email = request.body.email;
        return [2 /*return*/, response.status(200).json({ success: true, message: "Forgot Password" })];
    });
}); };
exports.forgotPassword = forgotPassword;
var resetPassword = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, response.status(200).json({ success: true, message: "Rest Password Here" })];
    });
}); };
exports.resetPassword = resetPassword;
var getCurrentUser = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, response.status(200).json({ success: true, message: "Current User here" })];
    });
}); };
exports.getCurrentUser = getCurrentUser;
var verifyEmailAddress = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, response.status(200).json({ success: true, message: "Login User here" })];
    });
}); };
exports.verifyEmailAddress = verifyEmailAddress;
var verifyLoginToken = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, response.status(200).json({ success: true, message: "Verify Login User here" })];
    });
}); };
exports.verifyLoginToken = verifyLoginToken;
var updateUserPassword = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, response.status(200).json({ success: true, message: "Update User Password Here" })];
    });
}); };
exports.updateUserPassword = updateUserPassword;
var updateUserProfile = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, response.status(200).json({ success: true, message: "Update User Password Here" })];
    });
}); };
exports.updateUserProfile = updateUserProfile;
var resendEmailVerificationCode = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, response.status(200).json({ success: true, message: "Resend E-mail Verification Code Here" })];
    });
}); };
exports.resendEmailVerificationCode = resendEmailVerificationCode;
var resendTwoFactorLoginCode = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, response.status(200).json({ success: true, message: "Resend Two Factor Code Here" })];
    });
}); };
exports.resendTwoFactorLoginCode = resendTwoFactorLoginCode;
var deactivateUserAccount = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, response.status(200).json({ success: true, message: "Resend Two Factor Code Here" })];
    });
}); };
exports.deactivateUserAccount = deactivateUserAccount;
var lockUserAccount = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, response.status(200).json({ success: true, message: "Lock User Account" })];
    });
}); };
exports.lockUserAccount = lockUserAccount;
