import { ErrorResponse } from './../utils/error-response';
import { NextFunction, Request, Response } from 'express';
import {User} from '../models/user-model';
import {StatusCodes} from "http-status-codes";

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
    const {email} = request.body;
    
    const newUser = await User.create(request.body);
    const existingUser = await User.findOne({email})

    if(existingUser) {
        return next(new ErrorResponse("User already created", 400));
    }


    await newUser.save();

    return response.status(StatusCodes.CREATED).json({success: true, sentAt: Date.now().toFixed(), data: newUser});
}

// @description: Login User API - Login User On Platform by storing the JWT cookie inside the current session
// @route: /api/v1/auth/register
// @http-method: POST
// @public: Yes (No Authorization Token Required)

export const loginUser = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {} = request.body;

    return response.status(StatusCodes.OK).json({success: true, message: "Login User here"});
}

// @description: Logout User API - Logout User by clearing the cookie stored inside the session
// @route: /api/v1/auth/logout
// @http-method: GET
// @public: No (Authorization Token Required To Identify User)

export const logoutUser = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "Login User here"});
}

// @description: Forgot Password API - Users can submit a forgot password request to this API if they forget their password.
// @route: /api/v1/auth/forgot-password
// @http-method: POST
// @public: Yes (No Authorization Token Required)

export const forgotPassword = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
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