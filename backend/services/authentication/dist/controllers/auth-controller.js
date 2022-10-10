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
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockUserAccount = exports.deactivateUserAccount = exports.resendTwoFactorLoginCode = exports.resendEmailVerificationCode = exports.updateUserProfile = exports.updateUserPassword = exports.verifyLoginToken = exports.verifyEmailAddress = exports.getCurrentUser = exports.resetPassword = exports.forgotPassword = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../models/user-model");
const email_verification_model_1 = require("../models/email-verification-model");
const http_status_codes_1 = require("http-status-codes");
const generate_otp_1 = require("../utils/generate-otp");
const error_handler_1 = require("../middleware/error-handler");
// @description: Register User API - Registers a new user on the platform
// @route: /api/v1/auth/register
// @http-method: POST
// @public: Yes (No Authorization Token Required)
const registerUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, passwordConfirm } = request.body;
    if (password !== passwordConfirm) {
        return next(new error_handler_1.BadRequestError(`Password confirmation error. Please check passwords`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const existingUser = yield user_model_1.User.findOne({ email }); // Find an existing user
    if (existingUser) {
        return next(new error_handler_1.BadRequestError("User already exists", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const newUser = yield user_model_1.User.create(request.body);
    const token = newUser.getAuthenticationToken();
    if (!token) {
        return next(new error_handler_1.JwtTokenError("JWT Token invalid. Please ensure it is valid", 400));
    }
    yield newUser.save();
    const currentUser = newUser._id; // Get the current user's ID
    const userOTP = (0, generate_otp_1.generateOTPVerificationToken)();
    const verificationToken = new email_verification_model_1.EmailVerification({ owner: currentUser, token: userOTP });
    yield verificationToken.save();
    // Send e-mail verification to user
    return response.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, data: newUser, token });
});
exports.registerUser = registerUser;
// @description: Login User API - Login User On Platform by storing the JWT cookie inside the current session
// @route: /api/v1/auth/register
// @http-method: POST
// @public: Yes (No Authorization Token Required)
const loginUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    if (!email || !password) {
        return next(new error_handler_1.BadRequestError(`Missing e-mail address or password. Check entries`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        return next(new error_handler_1.BadRequestError(`Could not find that user`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Compare user passwords before logging in
    const matchPasswords = yield user.comparePasswords(password);
    if (!matchPasswords) {
        return next(new error_handler_1.BadRequestError(`Passwords do not match. Please try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Generate new JWT and store in in the session
    const token = user.getAuthenticationToken();
    request.session = { jwt: token }; // Store the token in the session as a cookie
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, token });
});
exports.loginUser = loginUser;
// @description: Logout User API - Logout User by clearing the cookie stored inside the session
// @route: /api/v1/auth/logout
// @http-method: GET
// @public: No (Authorization Token Required To Identify User)
const logoutUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.session !== undefined) {
        request.session = null;
    }
    return response.status(200).json({ success: true, message: "Login User here" });
});
exports.logoutUser = logoutUser;
// @description: Forgot Password API - Users can submit a forgot password request to this API if they forget their password.
// @route: /api/v1/auth/forgot-password
// @http-method: POST
// @public: Yes (No Authorization Token Required)
const forgotPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.body;
    return response.status(200).json({ success: true, message: "Forgot Password" });
});
exports.forgotPassword = forgotPassword;
const resetPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "Rest Password Here" });
});
exports.resetPassword = resetPassword;
const getCurrentUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "Current User here" });
});
exports.getCurrentUser = getCurrentUser;
const verifyEmailAddress = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "Login User here" });
});
exports.verifyEmailAddress = verifyEmailAddress;
const verifyLoginToken = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "Verify Login User here" });
});
exports.verifyLoginToken = verifyLoginToken;
const updateUserPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "Update User Password Here" });
});
exports.updateUserPassword = updateUserPassword;
const updateUserProfile = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "Update User Password Here" });
});
exports.updateUserProfile = updateUserProfile;
const resendEmailVerificationCode = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "Resend E-mail Verification Code Here" });
});
exports.resendEmailVerificationCode = resendEmailVerificationCode;
const resendTwoFactorLoginCode = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "Resend Two Factor Code Here" });
});
exports.resendTwoFactorLoginCode = resendTwoFactorLoginCode;
const deactivateUserAccount = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "Resend Two Factor Code Here" });
});
exports.deactivateUserAccount = deactivateUserAccount;
const lockUserAccount = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "Lock User Account" });
});
exports.lockUserAccount = lockUserAccount;
//# sourceMappingURL=auth-controller.js.map