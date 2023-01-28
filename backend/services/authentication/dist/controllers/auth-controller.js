"use strict";
//
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
exports.fetchTotalUsers = exports.unlockUserAccount = exports.lockUserAccount = exports.deleteAllUsers = exports.deleteUserByID = exports.editUserByID = exports.createNewUser = exports.fetchUserByID = exports.fetchAllUsers = exports.getAllUserPremiumAccounts = exports.uploadUserProfilePicture = exports.deactivateUserAccount = exports.updateUserProfile = exports.updateUserPassword = exports.sendResetPasswordTokenStatus = exports.getCurrentUser = exports.resetPassword = exports.forgotPassword = exports.logoutUser = exports.resendTwoFactorLoginCode = exports.verifyLoginToken = exports.loginUser = exports.resendEmailVerificationCode = exports.verifyEmailAddress = exports.registerUser = void 0;
// Authors: Sabin Constantin Lungu, Andrei Vasiliu, Andrew Crook
// Copyright (c) 2023 - EtherTix (All Rights Reserved)
//
const error_handler_1 = require("./../middleware/error-handler");
const send_email_1 = require("./../utils/send-email");
const user_model_1 = require("../models/user-model");
const email_verification_model_1 = require("../models/email-verification-model");
const password_reset_model_1 = require("../models/password-reset-model");
const http_status_codes_1 = require("http-status-codes");
const generate_otp_1 = require("../utils/generate-otp");
const error_handler_2 = require("../middleware/error-handler");
const generate_mfa_1 = require("../utils/generate-mfa");
const mongoose_1 = require("mongoose");
const two_factor_model_1 = require("../models/two-factor-model");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const generateResetPasswordToken_1 = require("../utils/generateResetPasswordToken");
const path_1 = __importDefault(require("path"));
// @description: Sends the verify confirmation e-mail to the user after registering an account
// @parameters: Transporter Object, User Object, Randomly Generated User OTP
// @returns: void
// @public: True (No Authorization Required)
const sendConfirmationEmail = (transporter, newUser, userOTP) => {
    return transporter.sendMail({
        from: 'verification@ethertix.com',
        to: newUser.email,
        subject: 'E-mail Verification',
        html: `
        
        <p>Your verification OTP</p>
        <h1> ${userOTP}</h1>

        `
    });
};
// @description: Register New User Account
// @parameters: request: Request Object, response: Response Object, next: Next Function
// @returns: Server Response Promise
// @public: True (No Authorization Token Required)
exports.registerUser = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forename = request.body.forename;
        const surname = request.body.surname;
        const username = request.body.username;
        const email = request.body.email;
        const password = request.body.password;
        const passwordConfirm = request.body.passwordConfirm;
        const role = request.body.role;
        if (!forename) {
            return next(new error_handler_1.NotFoundError("Forename is missing. Please try enter again", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (!surname) {
            return next(new error_handler_1.NotFoundError("Surname is missing. Please try enter again", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (!email) {
            return next(new error_handler_2.BadRequestError("No E-mail provided. Please check your entries", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (password !== passwordConfirm) {
            return next(new error_handler_2.BadRequestError(`Password confirmation error. Please check passwords`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const existingUser = yield user_model_1.User.findOne({ email }); // Find an existing user
        if (existingUser) {
            return next(new error_handler_2.BadRequestError("User already exists", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const user = yield user_model_1.User.create({ forename, surname, username, email, role, password, passwordConfirm });
        const token = user.getAuthenticationToken();
        if (!token) {
            return next(new error_handler_2.JwtTokenError("JWT Token invalid. Please ensure it is valid", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const currentUser = user._id; // Get the current user's ID
        user.isNewUser = true; // User is new after registered
        yield user.save();
        const userOTP = (0, generate_otp_1.generateOTPVerificationToken)(); // Function that generates the OTP token
        const verificationToken = new email_verification_model_1.EmailVerification({ owner: currentUser, token: userOTP });
        yield verificationToken.save();
        const transporter = (0, send_email_1.emailTransporter)();
        sendConfirmationEmail(transporter, user, userOTP);
        const userOTPVerification = new email_verification_model_1.EmailVerification({ owner: user._id, token: userOTP });
        yield userOTPVerification.save(); // Save the User OTP token to the database after creating a new instance of OTP
        return sendTokenResponse(request, user, http_status_codes_1.StatusCodes.CREATED, response);
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: error.message, success: false });
        }
    }
}));
// @description: Send The JWT Token Response
// @parameters: request: Request Object, response: Response Object, next: Next Function, user: User Object, statusCode: Status Code of The request
// @returns: Server Response Promise Including the User Object and Token
// @access: Public (NO Bearer Token Required)
const sendTokenResponse = (request, user, statusCode, response) => {
    const token = user.getAuthenticationToken();
    request.session = { token }; // Store the token in the session
    return response.status(statusCode).json({ user, token });
};
// @description: Verify User E-mail Address
// @parameters: request: Request Object, response: Response Object, next: Next Function
// @returns: Server Response Promise w/ Status Code 200
// @public: True (No Authorization Token Required)
exports.verifyEmailAddress = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, OTP } = request.body;
        const user = yield user_model_1.User.findById(userId);
        // Check for invalid User ID
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            return next(new error_handler_1.NotFoundError("User ID not found. Please check your entry again.", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        // Check for missing OTP
        if (!OTP) {
            return next(new error_handler_1.NotFoundError("OTP Entered not found. Please check your entry", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        if (!user) {
            return next(new error_handler_2.BadRequestError(`No user found with that ID`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        // If the user is already verified
        if (user.isVerified) {
            return next(new error_handler_2.BadRequestError(`User account is already verified`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (user.isActive) { // If the user account is already active before verifying their e-mail address, send back error
            return next(new error_handler_1.AccountVerifiedError(`User account is already active`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const token = yield email_verification_model_1.EmailVerification.findOne({ owner: userId }); // Find a verification token
        if (!token) {
            return next(new error_handler_2.BadRequestError(`OTP Verification token is not found. Please try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const otpTokensMatch = yield token.compareVerificationTokens(OTP); // Check if they match
        if (!otpTokensMatch) {
            return next(new error_handler_2.BadRequestError(`The token you entered does not match the one in the database.`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (otpTokensMatch) { // If the OTP Tokens Match
            user.isVerified = true; // Set theu ser is Verified field to true
            user.accountActive = true;
            yield user.save();
            yield email_verification_model_1.EmailVerification.findByIdAndDelete(token._id); // Find the token and delete it
            const transporter = (0, send_email_1.emailTransporter)();
            // Send welcome e-mail
            transporter.sendMail({
                from: 'welcome@ethertix.com',
                to: user.email,
                subject: 'E-mail Confirmation Success',
                html: `
                    
                    <h1> Welcome to Ether Tix. Thank you for confirming your e-mail address.</h1>
                    `
            });
            const jwtToken = user.getAuthenticationToken();
            request.session = { token: jwtToken } || undefined; // Get the authentication JWT token
            return response.status(http_status_codes_1.StatusCodes.CREATED).json({ user, message: "E-mail Address verified" });
        }
    }
    catch (error) {
        if (error) {
            return next(new error_handler_2.BadRequestError(error, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
}));
// @description: Resend the E-mail Verification code to the user if not received
// @parameters: request: Request Object, response: Response Object, next: Next Function
// @returns: Server Response Promise
// @public: True (No Authorization Token Required)
exports.resendEmailVerificationCode = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, OTP } = request.body;
        const currentUser = yield user_model_1.User.findById(userId);
        if (!currentUser) { // If we have no current user
            return next(new error_handler_2.BadRequestError("Current user does not exist. Check user again", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            return next(new error_handler_2.BadRequestError("Owner ID invalid. Check again", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (!OTP) {
            return next(new error_handler_1.NotFoundError("OTP Not found. Please check again", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        const token = yield email_verification_model_1.EmailVerification.findOne({ owner: userId }); // Find associating user token
        if (!token) {
            return next(new error_handler_2.BadRequestError("User verification token not found", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        // Fetch the generated token
        const otpToken = (0, generate_otp_1.generateOTPVerificationToken)();
        if (!otpToken) {
            return next(new error_handler_2.BadRequestError("OTP Token generated is invalid.", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const newToken = new email_verification_model_1.EmailVerification({ owner: currentUser, token: otpToken }); // Create a new instance of the token
        yield newToken.save(); // Save the new token
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "E-mail Verification Re-sent" });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_2.BadRequestError(error, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
}));
const sendLoginMfa = (transporter, user, userMfa) => {
    return transporter.sendMail({
        from: 'mfa@ethertix.com',
        to: user.email,
        subject: 'Login MFA Verification',
        html: `
        
        <p>Your MFA code</p>
        <h1> ${userMfa}</h1>
        `
    });
};
// @description: Login User
// @parameters: request: Request Object, response: Response Object, next: Next Function
// @returns: Server Response Promise w/ Status Code 200
// @public: True (No Authorization Token Required)
exports.loginUser = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return next(new error_handler_2.BadRequestError(`Missing e-mail address or password. Check entries`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            return next(new error_handler_2.BadRequestError(`Could not find that user`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (user.isLocked) {
            return next(new error_handler_2.BadRequestError("Cannot login. Your account is locked", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        // Compare user passwords before logging in
        const matchPasswords = yield user.comparePasswords(password);
        if (!matchPasswords) {
            return next(new error_handler_2.BadRequestError(`Passwords do not match. Please try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        // Generate new JWT and store in in the session
        const token = user.getAuthenticationToken();
        const userMfa = (0, generate_mfa_1.generateMfaToken)();
        const transporter = (0, send_email_1.emailTransporter)();
        sendLoginMfa(transporter, user, userMfa);
        const loginMfa = new two_factor_model_1.TwoFactorVerification({ owner: user, mfaToken: userMfa });
        yield loginMfa.save();
        // Check for a valid MFA
        if (!userMfa) {
            return next(new error_handler_2.BadRequestError("User MFA not valid. Try again", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        request.session = { jwt: token }; // Store the token in the session as a cookie
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, token, user });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, stack: error.stack });
        }
    }
}));
const verifyLoginToken = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, multiFactorToken } = request.body;
        const user = yield user_model_1.User.findById(userId);
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            return next(new error_handler_2.BadRequestError(`This user ID is not valid. Please try again`, http_status_codes_1.StatusCodes.UNAUTHORIZED));
        }
        if (!multiFactorToken) {
            user.isActive = false; // User is not active yet
            return next(new error_handler_2.BadRequestError("Please provide your MFA token", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const factorToken = yield two_factor_model_1.TwoFactorVerification.findOne({ owner: userId });
        if (!factorToken) {
            return next(new error_handler_2.BadRequestError(`The 2FA token associated to the user is invalid `, http_status_codes_1.StatusCodes.UNAUTHORIZED));
        }
        // Check to see if the tokens match
        const mfaTokensMatch = yield factorToken.compareVerificationTokens(multiFactorToken);
        if (!mfaTokensMatch) { // If tokens don't match
            user.isActive = (!user.isActive); // User is not active
            user.isVerified = (!user.isVerified); // User is not verified
            return next(new error_handler_2.BadRequestError("The MFA token you entered is invalid. Try again", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const newToken = new two_factor_model_1.TwoFactorVerification({ owner: user, mfaToken: multiFactorToken }); // Create a new instance of the token
        yield newToken.save(); // Save the new token
        user.isVerified = true; // User account is now verified
        user.isActive = true; // And user account is active
        return response.status(http_status_codes_1.StatusCodes.OK).json({ user, message: "Your account is active" });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: error.message, stack: error.stack });
        }
    }
});
exports.verifyLoginToken = verifyLoginToken;
const resendTwoFactorLoginCode = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, mfaCode } = request.body; // 1. Extract user id and the MFA code from the request body
        const currentUser = yield user_model_1.User.findById(userId); // 2. Find the current user
        // 3. Check if the User ID is valid
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            return next(new error_handler_1.NotFoundError("User ID is invalid. Please check again", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        if (!mfaCode) {
            return next(new error_handler_1.NotFoundError("No MFA found. Please try again.", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        // 5. Fetch Generated Two Factor code
        const mfaToken = (0, generate_mfa_1.generateMfaToken)();
        const resentToken = yield two_factor_model_1.TwoFactorVerification.findOne({ owner: userId }); // Find the resent token by the owner ID
        if (!resentToken) {
            return next(new error_handler_1.NotFoundError("MFA Token could not be found", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        const resentTokensMatch = yield resentToken.compareVerificationTokens(mfaToken);
        // Check if the resent token matches the one in the database or not
        if (!resentTokensMatch) {
            return next(new error_handler_2.BadRequestError("Tokens do not match. Please try again later.", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        currentUser.isVerified = true; // User account is now verified
        currentUser.isActive = true; // And user account is active
        resentToken.mfaToken = undefined; // Clear the generated token from the database
        yield currentUser.save();
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Two Factor Verification Code Resent", sentAt: new Date(Date.now()) });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
        }
    }
});
exports.resendTwoFactorLoginCode = resendTwoFactorLoginCode;
const logoutUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.session !== undefined) {
            request.session = null; // Clear the session object
        }
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: {}, message: "You have logged out" });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, stack: error.stack });
        }
    }
});
exports.logoutUser = logoutUser;
const forgotPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.body;
        const user = yield user_model_1.User.findOne({ email });
        // Check if we have an e-mail in the body of the request
        if (!email) {
            return next(new error_handler_2.BadRequestError(`User with that e-mail not found`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (!user) {
            return next(new error_handler_1.NotFoundError("No user found with that e-mail address", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        const userHasResetToken = yield password_reset_model_1.PasswordReset.findOne({ owner: user._id });
        if (userHasResetToken) {
            return next(new error_handler_2.BadRequestError("User already has the password reset token", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const token = (0, generateResetPasswordToken_1.generateRandomResetPasswordToken)();
        if (token === undefined) { // If no token exists
            return next(new error_handler_2.BadRequestError("Reset Password Token is invalid", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const resetPasswordToken = yield password_reset_model_1.PasswordReset.create({ owner: user._id, resetToken: token }); // Create an instance of the Password Reset model
        yield resetPasswordToken.save();
        const resetPasswordURL = `http://localhost:3000/auth/api/reset-password?token=${token}&id=${user._id}`; // Create the reset password URL
        sendPasswordResetEmail(user, resetPasswordURL);
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Reset Password E-mail Sent", });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: error.message, stack: error.stack });
        }
    }
});
exports.forgotPassword = forgotPassword;
const sendPasswordResetEmail = (user, resetPasswordURL) => {
    const transporter = (0, send_email_1.emailTransporter)();
    transporter.sendMail({
        from: 'resetpassword@ethertix.com',
        to: user.email,
        subject: 'Reset Password',
        html: `
            
            <h1> ${resetPasswordURL}</h1>
            `
    });
};
exports.resetPassword = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentPassword = request.body.currentPassword;
        const newPassword = request.body.newPassword;
        const resetToken = request.params.resetToken;
        // Validate Fields
        if (!currentPassword) {
            return next(new error_handler_2.BadRequestError("Current password missing. Please try again", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (!newPassword) {
            return next(new error_handler_2.BadRequestError("Please specify the new password", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const user = yield user_model_1.User.findOne({ owner: request.user._id, token: resetToken });
        if (!user) {
            return next(new error_handler_2.BadRequestError("No user found", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const userPasswordsMatch = yield user.comparePasswords(currentPassword); // Check if passwords match before resetting password
        if (!userPasswordsMatch) {
            return next(new error_handler_2.BadRequestError("Current Password Invalid", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        user.password = newPassword;
        user.passwordConfirm = undefined;
        yield user.save(); // Save new user after reset the password
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Password Reset Successfully" });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_2.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
}));
exports.getCurrentUser = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = request.user;
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, user });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_2.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
}));
const sendResetPasswordTokenStatus = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ isValid: true });
});
exports.sendResetPasswordTokenStatus = sendResetPasswordTokenStatus;
exports.updateUserPassword = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentPassword = request.body.currentPassword;
        const newPassword = request.body.newPassword;
        if (!newPassword) {
            return next(new error_handler_2.BadRequestError("Please provide your new password", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const user = yield user_model_1.User.findById(request.user._id);
        if (!user) {
            return next(new error_handler_2.BadRequestError("No user found", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const currentPasswordMatch = user.comparePasswords(currentPassword);
        if (!currentPasswordMatch) { // If passwords do not match
            return next(new error_handler_2.BadRequestError("Current password is invalid.", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        user.password = request.body.newPassword;
        yield user.save(); // Save new user
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "User Password Updated" });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_2.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
}));
const updateUserProfile = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fieldsToUpdate = { email: request.body.email, username: request.body.username, role: request.body.role };
        const updatedUserProfile = yield user_model_1.User.findByIdAndUpdate(request.params.id, fieldsToUpdate, { new: true, runValidators: true });
        yield updatedUserProfile.save();
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Update User Password Here" });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, stack: error.stack });
        }
    }
});
exports.updateUserProfile = updateUserProfile;
const deactivateUserAccount = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = request.body;
    const user = yield user_model_1.User.findById(userId);
    // If no user exists
    if (!user) {
        return next(new error_handler_1.NotFoundError("No user found with that ID", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    if ((!user.isValid) || (!user.isActive)) {
        return next(new error_handler_2.BadRequestError("User account is already inactive", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (user.isActive && user.isValid) { // If the current user account is active and the user account is valid
        // Change the is active and is valid fields to false
        user.isActive = (!user.isActive);
        user.isValid = (!user.isValid);
        yield user.save();
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "User Account Deactivated", status: user.isValid, sentAt: new Date(Date.now().toFixed()) });
});
exports.deactivateUserAccount = deactivateUserAccount;
exports.uploadUserProfilePicture = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.method === 'PUT') {
            const userId = request.params.userId;
            const file = request.files.file;
            const currentUser = yield user_model_1.User.findById(userId); // Find the current user
            if (!currentUser) {
                return next(new error_handler_1.NotFoundError("User Not found with that ID", http_status_codes_1.StatusCodes.NOT_FOUND));
            }
            if (!request.files) {
                return next(new error_handler_2.BadRequestError(`Please upload a valid avatar for the user`, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            // 1. Ensure that the file is an actual image
            if (!file.mimetype.startsWith("image")) {
                return next(new error_handler_2.BadRequestError("Please make sure the uploaded file is an image", http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            // Validate File size. Check if file size exceeds the maximum size
            if (file.size > process.env.MAX_FILE_UPLOAD_SIZE) {
                return next(new error_handler_1.FileTooLargeError("File Size Too Large - Please check file size again", http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            // Create custom filename
            file.name = `photo_${currentUser._id}${path_1.default.parse(file.name).ext}`;
            file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    return next(new error_handler_2.BadRequestError("Problem with file upload", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
                }
                yield user_model_1.User.findByIdAndUpdate(request.params.id, { photo: file.name }); // Update the NFT by its ID and add the respective file
                return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "User Avatar Uploaded", sentAt: new Date(Date.now()) });
            }));
        }
    }
    catch (error) {
        if (error) {
            return next(new error_handler_2.BadRequestError(error, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
}));
exports.getAllUserPremiumAccounts = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const premiumUsers = yield user_model_1.User.find({ premium: true });
        if (!premiumUsers) {
            return next(new error_handler_2.BadRequestError("No premium users found", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: premiumUsers });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, stack: error.stack });
        }
    }
}));
// ADMIN CONTROLLERS
exports.fetchAllUsers = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find();
        if (!users) {
            return next(new error_handler_2.BadRequestError("No users found in the database", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, users });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, stack: error.stack });
        }
    }
}));
exports.fetchUserByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.params.userId;
        const user = yield user_model_1.User.findById(userId);
        if (!userId) {
            return next(new error_handler_2.BadRequestError("User ID not found. Please check your query params", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, user });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, stack: error.stack });
        }
    }
}));
exports.createNewUser = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = request.body;
        const user = yield user_model_1.User.create(body);
        return response.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, data: user });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, stack: error.stack });
        }
    }
}));
const editUserByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.params.userId;
        if (!userId) {
            return next(new error_handler_2.BadRequestError("User ID not found. Please check your query params", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        let user = yield user_model_1.User.findById(userId);
        if (!user) {
            return next(new error_handler_1.NotFoundError("User not found", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        user = yield user_model_1.User.findByIdAndUpdate(userId, request.body, { new: true, runValidators: true });
        yield user.save();
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: user });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, stack: error.stack });
        }
    }
});
exports.editUserByID = editUserByID;
const deleteUserByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.params.userId;
        if (!userId) {
            return next(new error_handler_2.BadRequestError(`User with that ID not found`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        yield user_model_1.User.findByIdAndDelete(userId);
        return response.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ success: true, message: "User Deleted", data: null });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, stack: error.stack });
        }
    }
});
exports.deleteUserByID = deleteUserByID;
const deleteAllUsers = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.method === 'DELETE') {
            yield user_model_1.User.deleteMany();
            return response.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ success: true, data: {} });
        }
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, stack: error.stack });
        }
    }
});
exports.deleteAllUsers = deleteAllUsers;
const lockUserAccount = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.user.id;
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            return next(new error_handler_2.BadRequestError("That user is not found not found. Please check your query params", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "User Account Locked" });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, stack: error.stack });
        }
    }
});
exports.lockUserAccount = lockUserAccount;
exports.unlockUserAccount = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the user by their ID
        const user = yield user_model_1.User.findById(request.params.id);
        if (!user) {
            return response.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: 'User not found with that ID' });
        }
        if (user.isLocked) {
            user.isLocked = false; // If the user is currently locked, set the isLocked flag to false
            yield user.save();
            return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "User account unlocked", isLocked: user.isLocked });
        }
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, stack: error.stack });
        }
    }
}));
exports.fetchTotalUsers = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalUsers = yield user_model_1.User.countDocuments({});
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, count: totalUsers });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, stack: error.stack });
        }
    }
}));
