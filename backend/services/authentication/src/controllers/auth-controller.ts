import { emailTransporter } from './../utils/send-email';
import { NextFunction, Request, Response } from 'express';
import {User} from '../models/user-model';
import {EmailVerification} from '../models/email-verification-model';
import {PasswordReset} from '../models/password-reset-model';
import {StatusCodes} from "http-status-codes";
import { generateOTPVerificationToken } from '../utils/generate-otp';
import {BadRequestError, JwtTokenError} from "../middleware/error-handler"
import { generateMfaToken } from '../utils/generate-mfa';

declare namespace Express {
    export interface Request {
        user: any;
        body: any;
        session: any
    }

  }
  
// @description: Register User API - Registers a new user on the platform
// @route: /api/v1/auth/register
// @http-method: POST
// @public: Yes (No Authorization Token Required)

export const registerUser = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {email, password, passwordConfirm} = request.body;

    if(password !== passwordConfirm ) {
        return next(new BadRequestError(`Password confirmation error. Please check passwords`, StatusCodes.BAD_REQUEST));
    }

    const existingUser = await User.findOne({email}) // Find an existing user

    if(existingUser) {
       return next(new BadRequestError("User already exists", StatusCodes.BAD_REQUEST));
    }

    const newUser = await User.create(request.body);
    const token = newUser.getAuthenticationToken();

    if(!token) {
        return next(new JwtTokenError("JWT Token invalid. Please ensure it is valid", 400))
    }

    await newUser.save();

    const currentUser = newUser._id; // Get the current user's ID
    const userOTP = generateOTPVerificationToken();

    const verificationToken = new EmailVerification({owner: currentUser, token: userOTP});
    await verificationToken.save();

    // Send e-mail verification to user
    const transporter = emailTransporter();

    transporter.sendMail({
        from: 'verification@ethertix.com',
        to: newUser.email,
        subject: 'E-mail Verification',
        html: `
        
        <p>Your verification OTP</p>
        <h1> ${userOTP}</h1>
        `
    })

    const userOTPVerification = new EmailVerification({owner: newUser._id, token: userOTP});
    await userOTPVerification.save();

    return response.status(StatusCodes.CREATED).json({success: true, data: newUser, token});
}


// @description: Login User API - Login User On Platform by storing the JWT cookie inside the current session
// @route: /api/v1/auth/register
// @http-method: POST
// @public: Yes (No Authorization Token Required)

export const loginUser = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {email, password} = request.body;

    if(!email || !password) {
        return next(new BadRequestError(`Missing e-mail address or password. Check entries`, StatusCodes.BAD_REQUEST));
    }

    const user = await User.findOne({email});

    if(!user) {
        return next(new BadRequestError(`Could not find that user`, StatusCodes.BAD_REQUEST));
    }

    // Compare user passwords before logging in
    const matchPasswords = await user.comparePasswords(password);

    if(!matchPasswords) {
        return next(new BadRequestError(`Passwords do not match. Please try again`, StatusCodes.BAD_REQUEST));
    }

    // Generate new JWT and store in in the session
    const token = user.getAuthenticationToken();
    const userMfa = generateMfaToken();

    // Check for a valid MFA
    if(!userMfa) {
        // return error
    }

    console.log(`Your MFA : ${userMfa}`);

        // Send MFA e-mail to user
        const transporter = emailTransporter();

        transporter.sendMail({
            from: 'mfa@ethertix.com',
            to: user.email,
            subject: 'Login MFA Verification',
            html: `
            
            <p>Your MFA code</p>
            <h1> ${userMfa}</h1>
            `
        })

    request.session = {jwt: token}; // Store the token in the session as a cookie

    return response.status(StatusCodes.OK).json({success: true, token});
}

// @description: Logout User API - Logout User by clearing the cookie stored inside the session
// @route: /api/v1/auth/logout
// @http-method: GET
// @public: No (Authorization Token Required To Identify User)

export const logoutUser = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    if(request.session !== undefined) {
        request.session = null;
    }

    return response.status(200).json({success: true, message: "Login User here"});
}

// @description: Forgot Password API - Users can submit a forgot password request to this API if they forget their password.
// @route: /api/v1/auth/forgot-password
// @http-method: POST
// @public: Yes (No Authorization Token Required)

export const forgotPassword = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {email} = request.body;
    return response.status(200).json({success: true, message: "Forgot Password"});
}

export const resetPassword = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "Rest Password Here"});
}

export const getCurrentUser = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "Current User here"});
}

export const verifyEmailAddress = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "Login User here"});
}

export const verifyLoginToken = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "Verify Login User here"});
}

export const updateUserPassword = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "Update User Password Here"});
}

export const updateUserProfile = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "Update User Password Here"});
}

export const resendEmailVerificationCode = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "Resend E-mail Verification Code Here"});
}

export const resendTwoFactorLoginCode = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "Resend Two Factor Code Here"});
}

export const deactivateUserAccount = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "Resend Two Factor Code Here"});
}

export const lockUserAccount = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "Lock User Account"});
}