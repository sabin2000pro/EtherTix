import { NotFoundError, AccountVerifiedError } from './../middleware/error-handler';
import { emailTransporter } from './../utils/send-email';
import { NextFunction, Request, Response } from 'express';
import {User} from '../models/user-model';
import {EmailVerification} from '../models/email-verification-model';
import {PasswordReset} from '../models/password-reset-model';
import {StatusCodes} from "http-status-codes";
import { generateOTPVerificationToken } from '../utils/generate-otp';
import {BadRequestError, JwtTokenError} from "../middleware/error-handler"
import { generateMfaToken } from '../utils/generate-mfa';
import { isValidObjectId } from 'mongoose';
import { TwoFactorVerification } from '../models/two-factor-model';

declare namespace Express {
    export interface Request {
        user: any;
        body: any;
        session: any;
        file: any;
    }

  }


const sendConfirmationEmail = (transporter: any, newUser: any, userOTP: number) => {

    return transporter.sendMail({
        from: 'verification@ethertix.com',
        to: newUser.email,
        subject: 'E-mail Verification',
        html: `
        
        <p>Your verification OTP</p>
        <h1> ${userOTP}</h1>
        `
    })
}

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const registerUser = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {
        const {email, password, passwordConfirm} = request.body;

     if(!email) {
        return next(new BadRequestError("No E-mail provided. Please check your entries", StatusCodes.BAD_REQUEST));
     }

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
        return next(new JwtTokenError("JWT Token invalid. Please ensure it is valid", StatusCodes.BAD_REQUEST))
    }

    await newUser.save();

    const currentUser = newUser._id; // Get the current user's ID
    const userOTP = generateOTPVerificationToken();

    const verificationToken = new EmailVerification({owner: currentUser, token: userOTP});
    await verificationToken.save();

    // Send e-mail verification to user

    const transporter = emailTransporter();
    sendConfirmationEmail(transporter, newUser, userOTP as unknown as any);

    const userOTPVerification = new EmailVerification({owner: newUser._id, token: userOTP});
    await userOTPVerification.save();

    return sendTokenResponse(request as any, newUser, StatusCodes.CREATED, response);

    } 
    
    catch(error: any) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message, success: false})
        }
    }


} 

// @ Description: Verify User E-mail Address After Registration
// @ Request Method: POST
// @ Route:  POST /api/v1/auth/verify-email
// @ Access: Public (No Authorization Token Required)
// @ Returns: Server Response (200 Status Code)
// @ Pre Condition(s): User ID and OTP is present in the body of request 
// @ Post Condition(s): Server responds back to the client with message saying that the e-mail is verified. Sends the verification OTP to the e-mail address of the registered user

export const verifyEmailAddress = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

        const {userId, OTP} = request.body;
        const user = await User.findById(userId);

        // Check for invalid User ID
        if(!isValidObjectId(userId)) {
            return next(new NotFoundError("User ID not found. Please check your entry again.", StatusCodes.NOT_FOUND))
        }

        // Check for missing OTP
        if(!OTP) {
            return next(new NotFoundError("OTP Entered not found. Please check your entry", StatusCodes.NOT_FOUND))
        }

        if(!user) {
            return next(new BadRequestError(`No user found with that ID`, StatusCodes.BAD_REQUEST));
        }

        if(user.isVerified) {
            return next(new BadRequestError(`User account is already verified`, StatusCodes.BAD_REQUEST));
        }

        if(user.isActive) {
            return next(new AccountVerifiedError(`User account is already active`, StatusCodes.BAD_REQUEST));
        }

        const token = await EmailVerification.findOne({owner: userId}); // Find a verification token

        if(!token) {
            return next(new BadRequestError(`OTP Verification token is not found. Please try again`, StatusCodes.BAD_REQUEST));
        }

        const otpTokensMatch = await token.compareVerificationTokens(OTP); // Check if they match

        if(!otpTokensMatch) {
            return next(new BadRequestError(`The token you entered does not match the one in the database.`, StatusCodes.BAD_REQUEST));
        }

        user.isVerified = true;
        user.accountActive = false;

        if(user.isVerified) {
            return next(new BadRequestError("Your e-mail address is already confirmed.", StatusCodes.BAD_REQUEST));
        }

        const transporter = emailTransporter();

        // Send welcome e-mail
            transporter.sendMail({
                from: 'welcome@ethertix.com',
                to: user.email,
                subject: 'E-mail Confirmation Success',
                html: `
                
                <h1> Welcome to Ether Tix. Thank you for confirming your e-mail address.</h1>
                `
            })
        

        const jwtToken = user.getAuthenticationToken();
        request.session = {token: jwtToken} as any || undefined;  // Get the authentication JWT token
        return response.status(StatusCodes.CREATED).json({userData: {id: user._id, username: user.username, email: user.email, token: jwtToken, isVerified: user.isVerified}, message: "E-mail Address verified"})
    } 
    
    catch(error: any) {

        if(error) {
            return next(new BadRequestError(error, StatusCodes.BAD_REQUEST));
        }

    }

}

export const resendEmailVerificationCode = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {
        const {ownerId, OTP} = request.body;

        if(!isValidObjectId(ownerId)) {
            return next(new BadRequestError("Owner ID invalid. Check again", StatusCodes.BAD_REQUEST));
        }



        return response.status(StatusCodes.OK).json({success: true, message: "Resend E-mail Verification Code Here"});
    } 
    
    catch(error: any) {


        if(error) {
            return next(new BadRequestError(error, StatusCodes.BAD_REQUEST));
        }
    }


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

    if(user.isLocked) {
        return next(new BadRequestError("Cannot login. Your account is locked", 400));
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
       return next(new BadRequestError("User MFA not valid. Try again", 400))
    }

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

export const verifyLoginToken = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {userId, multiFactorToken} = request.body;
    const user = await User.findById(userId);

    if(!isValidObjectId(userId)) {
        return next(new BadRequestError(`This user ID is not valid. Please try again`, 401));
    }

    if(!multiFactorToken) {
        user.isActive = !user.isActive;
        return next(new BadRequestError("Please provide your MFA token", StatusCodes.BAD_REQUEST));
    }

    const factorToken = await TwoFactorVerification.findOne({owner: userId});

    if(!factorToken) {
        return next(new BadRequestError(`The 2FA token associated to the user is invalid `, StatusCodes.UNAUTHORIZED));
    }

    // Check to see if the tokens match
    const mfaTokensMatch = factorToken.compareMfaTokens(multiFactorToken);

    if(!mfaTokensMatch) {
        user.isActive = false;
        user.isVerified = false;
        return next(new BadRequestError("The MFA token you entered is invalid. Try again", StatusCodes.BAD_REQUEST));
    }

    user.isVerified = true; // User account is now verified
    user.isActive = true; // And user account is active
    factorToken.mfaToken = undefined;

    const jwtToken = user.getAuthenticationToken();
    (request.session) = {jwtToken} as any || undefined;
    return response.status(StatusCodes.OK).json({userData: {id: user._id,  username: user.username, email: user.email, token: jwtToken, isVerified: user.isVerified}, message: "Your Account Is Active"})

}

export const resendTwoFactorLoginCode = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Resend Two Factor Code Here"});
}

// @description: Logout User API - Logout User by clearing the cookie stored inside the session
// @route: /api/v1/auth/logout
// @http-method: GET
// @public: No (Authorization Token Required To Identify User)

export const logoutUser = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

        if(request.session !== undefined) {
            request.session = null; // Clear the session object
        }
    
        return response.status(StatusCodes.OK).json({success: true, data: {}});
    } 
    
    catch(error: any) {

        if(error) {
            return next(new BadRequestError(error, StatusCodes.BAD_REQUEST));
        }
    }


}

// @description: Forgot Password API - Users can submit a forgot password request to this API if they forget their password.
// @route: /api/v1/auth/forgot-password
// @http-method: POST
// @public: Yes (No Authorization Token Required)

export const forgotPassword = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {email} = request.body;
    const user = await User.findOne({email});

    if(!user) {
        return next(new NotFoundError("No user found with that e-mail address", 404));
    }

    return response.status(StatusCodes.OK).json({success: true, message: "Forgot Password"});
}

export const resetPassword = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Rest Password Here"});
}

export const getCurrentUser = async (request: Express.Request, response: Response, next: NextFunction): Promise<any> => {
    const user = request.user._id;
    return response.status(StatusCodes.OK).json({success: true, data: user});
}

export const updateUserPassword = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Update User Password Here"});
}

export const updateUserProfile = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const fieldsToUpdate = {email: request.body.email, username: request.body.username};
    const user = await User.find(fieldsToUpdate.email);

    // Update the user
    const updatedUserProfile = await User.findByIdAndUpdate(request.params.id, fieldsToUpdate, {new: true, runValidators: true});
    await updatedUserProfile.save();

    return response.status(StatusCodes.OK).json({success: true, message: "Update User Password Here"});
}

export const deactivateUserAccount = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Resend Two Factor Code Here"});
}

export const lockUserAccount = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Lock User Account"});
}

export const uploadUserProfilePicture = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    return response.status(StatusCodes.OK).json({success: true, message: "Upload User Profile Picture Here..."});
}

const sendTokenResponse = (request: Express.Request, user: any, statusCode: number, response: any) => {
    const jwtToken = user.getAuthenticationToken();
    request.session = {token: jwtToken}; // Store the token in the session
 
    return response.status(statusCode).json({userData: {id: user._id, username: user.username, email: user.email, jwtToken}});
 }