import { FileTooLargeError, NotFoundError, AccountVerifiedError } from './../middleware/error-handler';
import { Query, ParamsDictionary } from 'express-serve-static-core';
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
import asyncHandler from 'express-async-handler';                        
import { generateRandomResetPasswordToken } from '../utils/generateResetPasswordToken';
import path from 'path'

declare namespace Express {
    export interface Request {
        user: any;
        body: any;
        session: any;
        params: any;
        method: any;
        query: any;
        files?: Record<any,any>
    }

  }

  export interface IGetUserAuthInfoRequest extends Request {
      user: any // or any other type
  }

export interface FileRequest extends Request {
    file: any;
}

  export interface IUserData {
    _id: string;
    email: string;
    username: string
    password: string;
    virtualCredits: number;
}

export interface IRequestUser extends Request {
    user: IUserData
}


export interface TypedRequestQuery<T extends Query> extends Express.Request {
    query: T
}

export interface TypedRequestBody<T extends ParamsDictionary> extends Request {
    body: T
}

  // @description: Sends the verify confirmation e-mail to the user after registering an account
  // @parameters: Transporter Object, User Object, Randomly Generated User OTP
  // @returns: void
  // @public: True (No Authorization Required)


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

  // @description: Register New User Account
  // @parameters: request: Request Object, response: Response Object, next: Next Function
  // @returns: Server Response Promise
  // @public: True (No Authorization Token Required)
  
export const registerUser = asyncHandler(async (request: TypedRequestBody<{email: string, role: string, username: string, password: string, passwordConfirm: string, forename: string, surname: string}>, response: Response, next: NextFunction): Promise<any | Response> => {

    try {

        const forename = request.body.forename;
        const surname = request.body.surname;
        
        const username = request.body.username;
        const email = request.body.email;
        const password = request.body.password;

        const passwordConfirm = request.body.passwordConfirm
        const role = request.body.role;

        if(!forename) {
            return next(new NotFoundError("Forename is missing. Please try enter again", StatusCodes.NOT_FOUND));
        }

        if(!surname) {
            return next(new NotFoundError("Surname is missing. Please try enter again", StatusCodes.NOT_FOUND));
        }

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

        const user = await User.create({forename, surname, username, email, role, password, passwordConfirm});
        const token = user.getAuthenticationToken();

        if(!token) {
            return next(new JwtTokenError("JWT Token invalid. Please ensure it is valid", StatusCodes.BAD_REQUEST))
        }

        const currentUser = user._id; // Get the current user's ID
        await user.save();

        const userOTP = generateOTPVerificationToken();

        const verificationToken = new EmailVerification({owner: currentUser, token: userOTP});
        await verificationToken.save();

        const transporter = emailTransporter();
        sendConfirmationEmail(transporter, user, userOTP as unknown as any);

        const userOTPVerification = new EmailVerification({owner: user._id, token: userOTP});
        await userOTPVerification.save(); // Save the User OTP token to the database after creating a new instance of OTP

        return sendTokenResponse(request as any, user, StatusCodes.CREATED, response);
    } 
    
    catch(error: any) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message, success: false})
        }

    }

} )

  // @description: Send The JWT Token Response
  // @parameters: request: Request Object, response: Response Object, next: Next Function, user: User Object, statusCode: Status Code of The request
  // @returns: Server Response Promise Including the User Object and Token
  // @access: Public (NO Bearer Token Required)

const sendTokenResponse = (request: Express.Request, user: any, statusCode: number, response: any) => {
    const token = user.getAuthenticationToken();
    request.session = {token}; // Store the token in the session
 
    return response.status(statusCode).json({user, token});
}

  // @description: Verify User E-mail Address
  // @parameters: request: Request Object, response: Response Object, next: Next Function
  // @returns: Server Response Promise w/ Status Code 200
  // @public: True (No Authorization Token Required)

export const verifyEmailAddress = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {

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

        // If the user is already verified
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

        if(otpTokensMatch) { // If the OTP Tokens Match

            user.isVerified = true // Set theu ser is Verified field to true
            user.accountActive = true;
    
            await user.save();
            await EmailVerification.findByIdAndDelete(token._id); // Find the token and delete it
    
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
    
                return response.status(StatusCodes.CREATED).json({user, message: "E-mail Address verified"});
        }
       
    } 
    
    catch(error: any) {

        if(error) {
            return next(new BadRequestError(error, StatusCodes.BAD_REQUEST));
        }

    }

})


   // @description: Resend the E-mail Verification code to the user if not received
  // @parameters: request: Request Object, response: Response Object, next: Next Function
  // @returns: Server Response Promise
  // @public: True (No Authorization Token Required)

export const resendEmailVerificationCode = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

        const {userId, OTP} = request.body;
        const currentUser = await User.findById(userId);

        if(!currentUser) { // If we have no current user
            return next(new BadRequestError("Current user does not exist. Check user again", StatusCodes.BAD_REQUEST));
        }

        if(!isValidObjectId(userId)) {
            return next(new BadRequestError("Owner ID invalid. Check again", StatusCodes.BAD_REQUEST));
        }

        if(!OTP) {
            return next(new NotFoundError("OTP Not found. Please check again", StatusCodes.NOT_FOUND));
        }

        const token = await EmailVerification.findOne({owner: userId});  // Find associating user token

        if(!token) {
            return next(new BadRequestError("User verification token not found", StatusCodes.BAD_REQUEST));
        }

        // Fetch the generated token
        const otpToken = generateOTPVerificationToken(); 

        const newToken = new EmailVerification({owner: currentUser, token: otpToken}); // Create a new instance of the token
        await newToken.save(); // Save the new token
    
        return response.status(StatusCodes.OK).json({success: true, message: "E-mail Verification Re-sent"});
    } 
    
    catch(error: any) {


        if(error) {
            return next(new BadRequestError(error, StatusCodes.BAD_REQUEST));
        }
    }

}

const sendLoginMfa = (transporter: any, user: IUserData, userMfa: any) => {

    return transporter.sendMail({
        from: 'mfa@ethertix.com',
        to: user.email,
        subject: 'Login MFA Verification',
        html: `
        
        <p>Your MFA code</p>
        <h1> ${userMfa}</h1>
        `
    })


}

  // @description: Login User
  // @parameters: request: Request Object, response: Response Object, next: Next Function
  // @returns: Server Response Promise w/ Status Code 200
  // @public: True (No Authorization Token Required)

export const loginUser = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {

    try {

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
    
        // Generate new JWT and store in in the session
        const token = user.getAuthenticationToken();
        const userMfa = generateMfaToken();
        const transporter = emailTransporter();

        sendLoginMfa(transporter as any, user as any, userMfa as any);
    
        // Check for a valid MFA
        if(!userMfa) {
           return next(new BadRequestError("User MFA not valid. Try again", StatusCodes.BAD_REQUEST))
        }

         request.session = {jwt: token}; // Store the token in the session as a cookie
         return response.status(StatusCodes.OK).json({success: true, token, user});
    } 
    
    catch(error) {

        if(error) {
            console.error(error.message);

            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message, stack: error.stack});
        }

    }

       
})

export const verifyLoginToken = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

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
            user.isActive = (!user.isActive) as boolean;
            user.isVerified = (!user.isVerified) as boolean;
            return next(new BadRequestError("The MFA token you entered is invalid. Try again", StatusCodes.BAD_REQUEST));
        }
    
        user.isVerified = true; // User account is now verified
        user.isActive = true; // And user account is active
        
        factorToken.mfaToken = undefined;
        await user.save();
    
        const jwtToken = user.getAuthenticationToken();
        (request.session) = {jwtToken} as any || undefined;
        return response.status(StatusCodes.OK).json({user, message: "Your account is active"});
    } 
    
    catch(error) {

        if(error) {
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: error.message, stack: error.stack});
        }

    }

    finally {
        console.log(`Errors handled gracefully`)
    }

}

export const resendTwoFactorLoginCode = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

        const {userId, mfaCode} = request.body; // 1. Extract user id and the MFA code from the request body
        const currentUser = await User.findById(userId); // 2. Find the current user

        // 3. Check if the User ID is valid
        if(!isValidObjectId(userId)) {
            return next(new NotFoundError("User ID is invalid. Please check again", StatusCodes.NOT_FOUND));
        }

        if(!mfaCode) {
            return next(new NotFoundError("No MFA found. Please try again.", StatusCodes.NOT_FOUND));
        }

        // 5. Fetch Generated Two Factor code
        const mfaToken = generateMfaToken();
    
        if(mfaToken === undefined) {

        }



        return response.status(StatusCodes.OK).json({success: true, message: "Two Factor Verification Code Resent"});
    }
    
    catch(error: any) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message});
        }

    }
    
}

export const logoutUser = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

        if(request.session !== undefined) {
            request.session = null; // Clear the session object
        }
    
        return response.status(StatusCodes.OK).json({success: true, data: {}});
    } 
    
    catch(error: any) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message, stack: error.stack});
        }


    }

}

export const forgotPassword = async (request: TypedRequestBody<{email: string}>, response: Response, next: NextFunction): Promise<any> => {

    try {

        const email = request.body;
        const user = await User.findOne({email});

        // Check if we have an e-mail in the body of the request
        if(!email) {
            return next(new BadRequestError(`User with that e-mail not found`, StatusCodes.BAD_REQUEST))
        }
    
        if(!user) {
            return next(new NotFoundError("No user found with that e-mail address", StatusCodes.NOT_FOUND));
        }
    
        const userHasResetToken = await PasswordReset.findOne({owner: user._id});
    
        if(userHasResetToken) {
            return next(new BadRequestError("User already has the password reset token", StatusCodes.BAD_REQUEST));
        }
    
        const token = generateRandomResetPasswordToken();
    
        if(token === undefined) {
            return next(new BadRequestError("Reset Password Token is invalid", StatusCodes.BAD_REQUEST));
        }
    
        const resetPasswordToken = await PasswordReset.create({owner: user._id, resetToken: token}); // Create an instance of the Password Reset model
        await resetPasswordToken.save();
    
        const resetPasswordURL = `http://localhost:3000/auth/api/reset-password?token=${token}&id=${user._id}` // Create the reset password URL
        sendPasswordResetEmail(user, resetPasswordURL);
    
        return response.status(StatusCodes.OK).json({success: true, message: "Reset Password E-mail Sent", sentAt: new Date(Date.now().toFixed())});
    } 
    
    catch(error: any) {

        if(error) {
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: error.message, stack: error.stack});
        }

    }

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

export const resetPassword = asyncHandler(async (request: IGetUserAuthInfoRequest, response: Response, next: NextFunction): Promise<any> => {

   try {

        const currentPassword = request.body.currentPassword;
        const newPassword = request.body.newPassword;
        const resetToken = request.params.resetToken;

        // Validate Fields
        if(!currentPassword) {
            return next(new BadRequestError("Current password missing. Please try again", StatusCodes.BAD_REQUEST))
        }
    
        if(!newPassword) {
            return next(new BadRequestError("Please specify the new password", StatusCodes.BAD_REQUEST))
        }
    
        const user = await User.findOne({owner: request.user._id, token: resetToken});
    
        if(!user) {
            return next(new BadRequestError("No user found", StatusCodes.BAD_REQUEST))
        }
    
        const userPasswordsMatch = await user.comparePasswords(currentPassword); // Check if passwords match before resetting password
    
        if(!userPasswordsMatch) {
           return next(new BadRequestError("Current Password Invalid", StatusCodes.BAD_REQUEST))
        }
    
        user.password = newPassword;
        user.passwordConfirm = undefined;
    
        await user.save(); // Save new user after reset the password
    
        return response.status(StatusCodes.OK).json({success: true, message: "Password Reset Successfully"});
   } 
   
   catch(error: any) {

      if(error) {
        return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST))
      }

   }


})

export const getCurrentUser = asyncHandler(async (request: IRequestUser, response: Response, next: NextFunction): Promise<any | Response> => {

    try {
        const user = request.user;
        return response.status(StatusCodes.OK).json({success: true, data: user});
    } 
    
    catch(error: any) {

        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
        }

    }

});

export const sendResetPasswordTokenStatus = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({isValid: true})
}

export const updateUserPassword = async (request: IGetUserAuthInfoRequest, response: Response, next: NextFunction): Promise<any> => {
    const currentPassword = request.body.currentPassword;
    const newPassword = request.body.newPassword;

    if(!newPassword) {
        return next(new BadRequestError("Please provide your new password", StatusCodes.BAD_REQUEST));
    }

    const user = await User.findById(<any>request.user._id);

    if(!user) {
        return next(new BadRequestError("No user found", StatusCodes.BAD_REQUEST))
    }

    const currentPasswordMatch = user.comparePasswords(currentPassword);

    if(!currentPasswordMatch) { // If passwords do not match
        return next(new BadRequestError("Current password is invalid.", StatusCodes.BAD_REQUEST))
    }

    user.password = request.body.newPassword
    await user.save(); // Save new user

    return response.status(StatusCodes.OK).json({success: true, message: "User Password Updated"});
}

export const updateUserProfile = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

        const fieldsToUpdate = {email: request.body.email, username: request.body.username, role: request.body.role};

        const updatedUserProfile = await User.findByIdAndUpdate(request.params.id, fieldsToUpdate, {new: true, runValidators: true});
        await updatedUserProfile.save();

        return response.status(StatusCodes.OK).json({success: true, message: "Update User Password Here"});

    } 
    
    catch(error) {

       if(error) {
          return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message, stack: error.stack});
       }

    }


}

export const deactivateUserAccount = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
    const {userId} = request.body;
    const user = await User.findById(userId);

    // If no user exists
    if(!user) {
        return next(new NotFoundError("No user found with that ID", StatusCodes.NOT_FOUND));
    }

    if((!user.isValid) || (!user.isActive) ) {
        return next(new BadRequestError("User account is already inactive", StatusCodes.BAD_REQUEST));
    }

    if(user.isActive && user.isValid) { // If the current user account is active and the user account is valid
        // Change the is active and is valid fields to false
        user.isActive = (!user.isActive);
        user.isValid = (!user.isValid);

        await user.save();
    }

    return response.status(StatusCodes.OK).json({success: true, message: "User Account Deactivated", status: user.isValid, sentAt: new Date(Date.now().toFixed())});

}

export const uploadUserProfilePicture = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any | Response> => {

    try {

        if(request.method === 'PUT') {

            const userId = request.params.userId as any;
            const file = request.files!.file as any;

            const currentUser = await User.findById(userId); // Find the current user
        
            if(!currentUser) {
                return next(new NotFoundError("User Not found with that ID", StatusCodes.NOT_FOUND));
            }
        
            if(!request.files) {
                return next(new BadRequestError(`Please upload a valid avatar for the user`, StatusCodes.BAD_REQUEST));
            }
        
            // 1. Ensure that the file is an actual image
        
            if(!file.mimetype.startsWith("image")) {
                return next(new BadRequestError("Please make sure the uploaded file is an image", StatusCodes.BAD_REQUEST));
            }
        
            // Validate File size. Check if file size exceeds the maximum size
            if(file.size > process.env.MAX_FILE_UPLOAD_SIZE!) {
                return next(new FileTooLargeError("File Size Too Large - Please check file size again", StatusCodes.BAD_REQUEST));
            }
        
             // Create custom filename
          file.name = `photo_${currentUser._id}${path.parse(file.name).ext}`;
        
          file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (error: any) => {
        
                if(error) {
                   return next(new BadRequestError("Problem with file upload", StatusCodes.INTERNAL_SERVER_ERROR));
                }
        
                await User.findByIdAndUpdate(request.params.id, { photo: file.name }); // Update the NFT by its ID and add the respective file
                return response.status(StatusCodes.OK).json({success: true, message: "User Avatar Uploaded", sentAt: new Date(Date.now() )})
          })

    
        }
    }
    
    catch(error: any) {
        if(error) {
            return next(new BadRequestError(error, StatusCodes.BAD_REQUEST));
        }
    }

    finally {
        return console.log(`Error gracefully handled`)
    }


})

export const getAllUserPremiumAccounts = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {

    try {
        const premiumUsers = await User.find({premium: true});
        return response.status(200).json({success: true, data: premiumUsers});
    }
    
    catch(error: any) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message, stack: error.stack});
        }
    }


})

// ADMIN CONTROLLERS

export const fetchAllUsers = async (request: TypedRequestQuery<{sort: string}>, response: Response, next: NextFunction): Promise<any | Response> => {

    try {

        if(request.method === 'GET') {

            const users = await User.find();
            return response.status(StatusCodes.OK).json({success: true, users});
        }

    }
    
    catch(error: any) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message, stack: error.stack});
        }
    }

}

export const fetchUserByID = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {

    try {

        if(request.method === 'GET') {

            const userId = request.params.userId;

            if(!userId) {
                return next(new BadRequestError("User ID not found. Please check your query params", StatusCodes.NOT_FOUND));
            }
    
        }


    } 
    
    catch(error: any) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message, stack: error.stack});
        }

    }


})

export const createNewUser = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any| Response> => {

    try {

        const body = request.body;
        const user = await User.create(body);

        return response.status(StatusCodes.CREATED).json({success: true, data: user});
    } 
    
    catch(error: any) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message, stack: error.stack});
        }

    }

    finally {
        return console.log(`Error gracefully handled`)
    }


})

export const editUserByID = async (request: Express.Request, response: Response, next: NextFunction): Promise<any| Response> => {

   try {

      const userId = request.params.userId;

      if(!userId) {
         return next(new BadRequestError("User ID not found. Please check your query params", StatusCodes.NOT_FOUND));
      }

      let user = await User.findById(userId);

      if(!user) {
         return next(new NotFoundError("User not found", StatusCodes.NOT_FOUND));
      }

      user = await User.findByIdAndUpdate(userId, request.body, {new: true, runValidators: true});
      await user.save();

      return response.status(StatusCodes.OK).json({success: true, data: user});

   } 
   
   catch(error: any) {

      if(error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message, stack: error.stack});
      }    
   }

}

export const deleteUserByID = async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {

    try {

        const userId = request.params.userId;

        if(!userId) {
            return next(new BadRequestError(`User with that ID not found`, StatusCodes.BAD_REQUEST))
        }

        await User.findByIdAndDelete(userId);
        return response.status(StatusCodes.NO_CONTENT).json({success: true, message: "User Deleted", data: null })

    } 
    
    catch(error: any) {

     if(error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message, stack: error.stack});
     }


    }
 
}

export const deleteAllUsers = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

        if(request.method === 'DELETE') {
            await User.deleteMany();

            return response.status(StatusCodes.NO_CONTENT).json({success: true, data: {}});
        }


    } 
    
    catch(error: any) {

          if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message, stack: error.stack});
          }

    }
 
}

export const lockUserAccount = async (request: IRequestUser, response: Response, next: NextFunction): Promise<any | Response> => {

   try {
        const userId = request.user._id;
        const user = await User.findById(userId);
    
        if(!user) {
            return next(new BadRequestError("That user is not found not found. Please check your query params", StatusCodes.NOT_FOUND));
        }
    
        return response.status(StatusCodes.OK).json({success: true, message: "User Account Locked"})
   } 
   
   catch(error: any) {

     if(error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message, stack: error.stack});
     }

   }

}

export const unlockUserAccount = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {

    try {
          // Find the user by their ID
        const user = await User.findById(request.params.id);

        if (!user) {
          return response.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found with that ID' });
        }

        if(user.isLocked) {

            user.isLocked = false // If the user is currently locked, set the isLocked flag to false
            await user.save();

            return response.status(StatusCodes.OK).json({success: true, message: "User account unlocked", isLocked: user.isLocked});
        }


    } 
    
    catch(error: any) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message, stack: error.stack});
        }
    }

})

export const fetchTotalUsers = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {
    const totalUsers = await User.countDocuments({});
    return response.status(StatusCodes.OK).json({success: true, count: totalUsers});
})