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
import { generateRandomResetPasswordToken } from '../utils/generateResetPasswordToken';

declare namespace Express {
    export interface Request {
        user: any;
        body: any;
        session: any;
    }

  }

  export interface IGetUserAuthInfoRequest extends Request {
    user: any // or any other type
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

        user.isVerified = true;

        if(user.isVerified) {
            return next(new BadRequestError(`User account already verified`, StatusCodes.BAD_REQUEST));

        }

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
        return next(new BadRequestError("Cannot login. Your account is locked", StatusCodes.BAD_REQUEST));
    }

    // Compare user passwords before logging in
    const matchPasswords = await user.comparePasswords(password);

    if(!matchPasswords) {
        return next(new BadRequestError(`Passwords do not match. Please try again`, StatusCodes.BAD_REQUEST));
    }

    if(!user.isVerified) {
        return next(new BadRequestError(`Cannot login. Verify your e-mail address first`, StatusCodes.BAD_REQUEST));
    }

    // Generate new JWT and store in in the session
    const token = user.getAuthenticationToken();
    const userMfa = generateMfaToken();

    // Check for a valid MFA
    if(!userMfa) {
       return next(new BadRequestError("User MFA not valid. Try again", StatusCodes.BAD_REQUEST))
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

    return response.status(StatusCodes.OK).json({success: true, token, userData: user});
}

export const verifyLoginToken = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {userId, multiFactorToken} = request.body;
    const user = await User.findById(userId);

    if(!isValidObjectId(userId)) {
        return next(new BadRequestError(`This user ID is not valid. Please try again`, StatusCodes.UNAUTHORIZED));
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

    try {
        const {userId, mfaCode} = request.body;

        return response.status(StatusCodes.OK).json({success: true, message: "Resend Two Factor Code Here"});
    }
    
    catch(error: any) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message});
        }

    }
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


/**
 * 
 * @param Request: Request Object stores the request information 
 * @param Response: Server Responds with a status code 
 * @param Next: Calls the next function in the middleware chain 
 * @Returns - 200 Server Response 
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */

export const forgotPassword = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {email} = request.body;
    const user = await User.findOne({email});

    if(!user) {
        return next(new NotFoundError("No user found with that e-mail address", StatusCodes.NOT_FOUND));
    }

    const userHasResetToken = await PasswordReset.findOne({owner: user._id});

    // If the user already has the reset token
    if(userHasResetToken) {
        return next(new BadRequestError("You already have the reset password token. Try again later.", StatusCodes.BAD_REQUEST));
    }

    const token = generateRandomResetPasswordToken();

    if(token === undefined) {
        return next(new BadRequestError("Reset Password Token is invalid", StatusCodes.BAD_REQUEST));
    }

    console.log(`Your reset password token`, token);

    const resetPasswordToken = await PasswordReset.create({owner: user._id, resetToken: token});
    await resetPasswordToken.save();

    const resetPasswordURL = `http://localhost:3000/auth/api/reset-password?token=${token}&id=${user._id}` // Create the reset password URL
    sendPasswordResetEmail(user, resetPasswordURL);

    return response.status(StatusCodes.OK).json({success: true, message: "Reset Password E-mail Sent"});
}

const sendPasswordResetEmail = (user: any, resetPasswordURL: string) => {
     
     const transporter = emailTransporter();

        transporter.sendMail({

            from: 'resetpassword@ethertix.com',
            to: user.email,
            subject: 'Reset Password',
            html: `
            
            <h1> ${resetPasswordURL}</h1>
            `

        })

}

/**
 * 
 * @param Request: Request Object stores the request information 
 * @param Response: Server Responds with a status code 
 * @param Next: Calls the next function in the middleware chain 
 * @Returns - 200 Server Response 
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */

export const resetPassword = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const resetToken = request.params.resetToken;
    return response.status(StatusCodes.OK).json({success: true, message: "Rest Password Here"});
}

/**
 * 
 * @param Request: Request Object stores the request information 
 * @param Response: Server Responds with a status code 
 * @param Next: Calls the next function in the middleware chain 
 * @Returns - 200 Server Response 
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */

export const getCurrentUser = async (request: Express.Request, response: Response, next: NextFunction): Promise<any> => {
    const user = request.user._id;
    return response.status(StatusCodes.OK).json({success: true, data: user});
}

/**
 * 
 * @param Request: Request Object stores the request information 
 * @param Response: Server Responds with a status code 
 * @param Next: Calls the next function in the middleware chain 
 * @Returns - 200 Server Response 
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */

export const updateUserPassword = async (request: IGetUserAuthInfoRequest, response: Response, next: NextFunction): Promise<any> => {
    const currentPassword = request.body.currentPassword;
    const newPassword = request.body.newPassword;

    if(!newPassword) {
        return next(new BadRequestError("Please provide your new password", StatusCodes.BAD_REQUEST));
    }

    const user = await User.findById(<any>request.user._id);

    console.log(`User : ${user}`);

    if(!user) {
        return next(new BadRequestError("No user found", StatusCodes.BAD_REQUEST))
    }

    const currentPasswordMatch = user.comparePasswords(currentPassword);

    if(!currentPasswordMatch) { // If passwords do not match
        return next(new BadRequestError("Current password is invalid.", StatusCodes.BAD_REQUEST))
    }

    user.password = request.body.newPassword
    await user.save(); // Save new user

    return response.status(StatusCodes.OK).json({success: true, message: ""});
}

/**
 * 
 * @param Request: Request Object stores the request information 
 * @param Response: Server Responds with a status code 
 * @param Next: Calls the next function in the middleware chain 
 * @Returns - 200 Server Response 
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */

export const updateUserProfile = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const fieldsToUpdate = {email: request.body.email, username: request.body.username};

    // Update the user
    const updatedUserProfile = await User.findByIdAndUpdate(request.params.id, fieldsToUpdate, {new: true, runValidators: true});
    await updatedUserProfile.save();

    return response.status(StatusCodes.OK).json({success: true, message: "Update User Password Here"});
}

/**
 * 
 * @param Request: Request Object stores the request information 
 * @param Response: Server Responds with a status code 
 * @param Next: Calls the next function in the middleware chain 
 * @Returns - 200 Server Response 
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */

export const deactivateUserAccount = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Resend Two Factor Code Here"});
}

/**
 * 
 * @param Request: Request Object stores the request information 
 * @param Response: Server Responds with a status code 
 * @param Next: Calls the next function in the middleware chain 
 * @Returns - 200 Server Response 
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */

export const lockUserAccount = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Lock User Account"});
}

/**
 * 
 * @param Request: Request Object stores the request information 
 * @param Response: Server Responds with a status code 
 * @param Next: Calls the next function in the middleware chain 
 * @Returns - 200 Server Response 
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */

export const uploadUserProfilePicture = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Upload User Profile Picture Here..."});
}

/**
 * 
 * @param Request: Request Object stores the request information 
 * @param Response: Server Responds with a status code 
 * @param Next: Calls the next function in the middleware chain 
 * @Returns - 200 Server Response 
 * @PreCondition - User provides e-mail address to send a request to reset password
 * @PostCondition - The server responds back to the client with the reset password link to the e-mail address of the registered user
 */

const sendTokenResponse = (request: Express.Request, user: any, statusCode: number, response: any) => {
    const jwtToken = user.getAuthenticationToken();
    request.session = {token: jwtToken}; // Store the token in the session
 
    return response.status(statusCode).json({userData: {id: user._id, username: user.username, email: user.email, jwtToken}});
 }