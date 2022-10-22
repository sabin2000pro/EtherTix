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
exports.uploadUserProfilePicture = exports.lockUserAccount = exports.deactivateUserAccount = exports.updateUserProfile = exports.updateUserPassword = exports.getCurrentUser = exports.resetPassword = exports.forgotPassword = exports.logoutUser = exports.resendTwoFactorLoginCode = exports.verifyLoginToken = exports.loginUser = exports.resendEmailVerificationCode = exports.verifyEmailAddress = exports.registerUser = void 0;
const error_handler_1 = require("./../middleware/error-handler");
const send_email_1 = require("./../utils/send-email");
const user_model_1 = require("../models/user-model");
const email_verification_model_1 = require("../models/email-verification-model");
const http_status_codes_1 = require("http-status-codes");
const generate_otp_1 = require("../utils/generate-otp");
const error_handler_2 = require("../middleware/error-handler");
const generate_mfa_1 = require("../utils/generate-mfa");
const mongoose_1 = require("mongoose");
const two_factor_model_1 = require("../models/two-factor-model");
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
/**
 *
 * @param Request: Request Object stores the request information
 * @param Response: Server Responds with a status code
 * @param Next: Calls the next function in the middleware chain
 * @AccessLevel - Public
 * @Returns - 200 Server Response
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */
const registerUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, passwordConfirm } = request.body;
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
        const newUser = yield user_model_1.User.create(request.body);
        const token = newUser.getAuthenticationToken();
        if (!token) {
            return next(new error_handler_2.JwtTokenError("JWT Token invalid. Please ensure it is valid", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        yield newUser.save();
        const currentUser = newUser._id; // Get the current user's ID
        const userOTP = (0, generate_otp_1.generateOTPVerificationToken)();
        const verificationToken = new email_verification_model_1.EmailVerification({ owner: currentUser, token: userOTP });
        yield verificationToken.save();
        // Send e-mail verification to user
        const transporter = (0, send_email_1.emailTransporter)();
        sendConfirmationEmail(transporter, newUser, userOTP);
        const userOTPVerification = new email_verification_model_1.EmailVerification({ owner: newUser._id, token: userOTP });
        yield userOTPVerification.save();
        return sendTokenResponse(request, newUser, http_status_codes_1.StatusCodes.CREATED, response);
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message, success: false });
        }
    }
});
exports.registerUser = registerUser;
/**
 *
 * @param Request: Request Object stores the request information
 * @param Response: Server Responds with a status code
 * @param Next: Calls the next function in the middleware chain
 * @description - Verifies the User's E-mail Address after registering an account
 * @Returns - 200 OK Status Server Response
 * @PreCondition - The User Provides their OTP in the input field (frontend)
 * @PostCondition - Server responds with a 200 OK status code and sets the is verified variable to true
 */
const verifyEmailAddress = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (user.isVerified) {
            return next(new error_handler_2.BadRequestError(`User account is already verified`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (user.isActive) {
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
        user.isVerified = true;
        user.accountActive = false;
        if (user.isVerified) {
            return next(new error_handler_2.BadRequestError("Your e-mail address is already confirmed.", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
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
        return response.status(http_status_codes_1.StatusCodes.CREATED).json({ userData: { id: user._id, username: user.username, email: user.email, token: jwtToken, isVerified: user.isVerified }, message: "E-mail Address verified" });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_2.BadRequestError(error, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.verifyEmailAddress = verifyEmailAddress;
const resendEmailVerificationCode = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerId, OTP } = request.body;
        if (!(0, mongoose_1.isValidObjectId)(ownerId)) {
            return next(new error_handler_2.BadRequestError("Owner ID invalid. Check again", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Resend E-mail Verification Code Here" });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_2.BadRequestError(error, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.resendEmailVerificationCode = resendEmailVerificationCode;
// @description: Login User API - Login User On Platform by storing the JWT cookie inside the current session
// @route: /api/v1/auth/register
// @http-method: POST
// @public: Yes (No Authorization Token Required)
const loginUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    // Check for a valid MFA
    if (!userMfa) {
        return next(new error_handler_2.BadRequestError("User MFA not valid. Try again", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Send MFA e-mail to user
    const transporter = (0, send_email_1.emailTransporter)();
    transporter.sendMail({
        from: 'mfa@ethertix.com',
        to: user.email,
        subject: 'Login MFA Verification',
        html: `
            
            <p>Your MFA code</p>
            <h1> ${userMfa}</h1>
            `
    });
    request.session = { jwt: token }; // Store the token in the session as a cookie
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, token });
});
exports.loginUser = loginUser;
const verifyLoginToken = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, multiFactorToken } = request.body;
    const user = yield user_model_1.User.findById(userId);
    if (!(0, mongoose_1.isValidObjectId)(userId)) {
        return next(new error_handler_2.BadRequestError(`This user ID is not valid. Please try again`, 401));
    }
    if (!multiFactorToken) {
        user.isActive = !user.isActive;
        return next(new error_handler_2.BadRequestError("Please provide your MFA token", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const factorToken = yield two_factor_model_1.TwoFactorVerification.findOne({ owner: userId });
    if (!factorToken) {
        return next(new error_handler_2.BadRequestError(`The 2FA token associated to the user is invalid `, http_status_codes_1.StatusCodes.UNAUTHORIZED));
    }
    // Check to see if the tokens match
    const mfaTokensMatch = factorToken.compareMfaTokens(multiFactorToken);
    if (!mfaTokensMatch) {
        user.isActive = false;
        user.isVerified = false;
        return next(new error_handler_2.BadRequestError("The MFA token you entered is invalid. Try again", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    user.isVerified = true; // User account is now verified
    user.isActive = true; // And user account is active
    factorToken.mfaToken = undefined;
    const jwtToken = user.getAuthenticationToken();
    (request.session) = { jwtToken } || undefined;
    return response.status(http_status_codes_1.StatusCodes.OK).json({ userData: { id: user._id, username: user.username, email: user.email, token: jwtToken, isVerified: user.isVerified }, message: "Your Account Is Active" });
});
exports.verifyLoginToken = verifyLoginToken;
const resendTwoFactorLoginCode = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, mfaCode } = request.body;
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Resend Two Factor Code Here" });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
        }
    }
});
exports.resendTwoFactorLoginCode = resendTwoFactorLoginCode;
// @description: Logout User API - Logout User by clearing the cookie stored inside the session
// @route: /api/v1/auth/logout
// @http-method: GET
// @public: No (Authorization Token Required To Identify User)
const logoutUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.session !== undefined) {
            request.session = null; // Clear the session object
        }
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: {} });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_2.BadRequestError(error, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.logoutUser = logoutUser;
/**
 *
 * @param Request: Request Object stores the request information
 * @param Response: Server Responds with a status code
 * @param Next: Calls the next function in the middleware chain
 * @Returns - 200 Server Response
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */
const forgotPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.body;
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        return next(new error_handler_1.NotFoundError("No user found with that e-mail address", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    const resetPasswordLink = ``;
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Forgot Password" });
});
exports.forgotPassword = forgotPassword;
/**
 *
 * @param Request: Request Object stores the request information
 * @param Response: Server Responds with a status code
 * @param Next: Calls the next function in the middleware chain
 * @Returns - 200 Server Response
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */
const resetPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Rest Password Here" });
});
exports.resetPassword = resetPassword;
/**
 *
 * @param Request: Request Object stores the request information
 * @param Response: Server Responds with a status code
 * @param Next: Calls the next function in the middleware chain
 * @Returns - 200 Server Response
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */
const getCurrentUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.user._id;
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: user });
});
exports.getCurrentUser = getCurrentUser;
/**
 *
 * @param Request: Request Object stores the request information
 * @param Response: Server Responds with a status code
 * @param Next: Calls the next function in the middleware chain
 * @Returns - 200 Server Response
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */
const updateUserPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Update User Password Here" });
});
exports.updateUserPassword = updateUserPassword;
/**
 *
 * @param Request: Request Object stores the request information
 * @param Response: Server Responds with a status code
 * @param Next: Calls the next function in the middleware chain
 * @Returns - 200 Server Response
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */
const updateUserProfile = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fieldsToUpdate = { email: request.body.email, username: request.body.username };
    const user = yield user_model_1.User.find(fieldsToUpdate.email);
    // Update the user
    const updatedUserProfile = yield user_model_1.User.findByIdAndUpdate(request.params.id, fieldsToUpdate, { new: true, runValidators: true });
    yield updatedUserProfile.save();
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Update User Password Here" });
});
exports.updateUserProfile = updateUserProfile;
/**
 *
 * @param Request: Request Object stores the request information
 * @param Response: Server Responds with a status code
 * @param Next: Calls the next function in the middleware chain
 * @Returns - 200 Server Response
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */
const deactivateUserAccount = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Resend Two Factor Code Here" });
});
exports.deactivateUserAccount = deactivateUserAccount;
/**
 *
 * @param Request: Request Object stores the request information
 * @param Response: Server Responds with a status code
 * @param Next: Calls the next function in the middleware chain
 * @Returns - 200 Server Response
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */
const lockUserAccount = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Lock User Account" });
});
exports.lockUserAccount = lockUserAccount;
/**
 *
 * @param Request: Request Object stores the request information
 * @param Response: Server Responds with a status code
 * @param Next: Calls the next function in the middleware chain
 * @Returns - 200 Server Response
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */
const uploadUserProfilePicture = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Upload User Profile Picture Here..." });
});
exports.uploadUserProfilePicture = uploadUserProfilePicture;
/**
 *
 * @param Request: Request Object stores the request information
 * @param Response: Server Responds with a status code
 * @param Next: Calls the next function in the middleware chain
 * @Returns - 200 Server Response
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */
const sendTokenResponse = (request, user, statusCode, response) => {
    const jwtToken = user.getAuthenticationToken();
    request.session = { token: jwtToken }; // Store the token in the session
    return response.status(statusCode).json({ userData: { id: user._id, username: user.username, email: user.email, jwtToken } });
};
//# sourceMappingURL=auth-controller.js.map