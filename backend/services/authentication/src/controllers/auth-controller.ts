import { emailTransporter } from "./../utils/send-email";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user-model";
import { EmailVerification } from "../models/email-verification-model";
import { PasswordReset } from "../models/password-reset-model";
import { StatusCodes } from "http-status-codes";
import { generateOTPVerificationToken } from "../utils/generate-otp";
import { generateMfaToken } from "../utils/generate-mfa";
import { isValidObjectId } from "mongoose";
import { TwoFactorVerification } from "../models/two-factor-model";
import asyncHandler from "express-async-handler";
import { generateRandomResetPasswordToken } from "../utils/generateResetPasswordToken";
import path from "path";
import { ErrorResponse } from "../utils/error-response";

// @description: Sends the verify confirmation e-mail to the user after registering an account
// @parameters: Transporter Object, User Object, Randomly Generated User OTP
// @returns: void
// @public: True (No Authorization Required)

export const sendLoginMfa = (transporter: any, email: any, userMfa: any) => {

  return transporter.sendMail({
    from: "mfa@ethertix.com",
    to: email,
    subject: "Login MFA Verification",
    html: `
        
        <p>Your MFA code</p>
        <h1> ${userMfa}</h1>
        `,
  });
};

export const sendPasswordResetEmail = (user: any, resetPasswordURL: string) => {

  const transporter = emailTransporter();

  transporter.sendMail({
    from: "resetpassword@ethertix.com",
    to: user.email,
    subject: "Reset Password",
    html: `
           
           <h1> ${resetPasswordURL}</h1>
           `,
  });

};

export const sendConfirmationEmail = (user: any, userOTP: number) => {
  const transporter = emailTransporter();

  return transporter.sendMail({
    from: "verification@ethertix.com",
    to: user.email,
    subject: "E-mail Verification",
    html: `
        
        <p>Your verification OTP</p>
        <h1> ${userOTP}</h1>

        `,
  });
};

// @description: Send The JWT Token Response
// @parameters: request: Request Object, response: Response Object, next: Next Function, user: User Object, statusCode: Status Code of The request
// @returns: Server Response Promise Including the User Object and Token
// @access: Public (NO Bearer Token Required)

export const sendTokenResponse = (request: Express.Request,user: any, statusCode: number,response: any) => {
  const token = user.getAuthenticationToken();
  request.session = { token }; // Store the token in the session

  return response.status(statusCode).json({ user, token });
};

// @description: Register New User Account
// @parameters: request: Request Object, response: Response Object, next: Next Function
// @returns: Server Response Promise
// @public: True (No Authorization Token Required)

export const registerUser = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {

    const { forename, surname, username, email, password, passwordConfirm } = request.body;

    if (!forename) {
      return next( new ErrorResponse(`Forename missing, please try again`, StatusCodes.BAD_REQUEST));
    }

    if (!surname) {
      return next( new ErrorResponse("Surname is missing. Please try enter again", StatusCodes.BAD_REQUEST));
    }

    if (!email) {
       return next( new ErrorResponse( "No E-mail provided. Please check your entries", StatusCodes.BAD_REQUEST));
    }

    if (password !== passwordConfirm) {
        return next(new ErrorResponse( `Password confirmation error. Please check passwords`, StatusCodes.BAD_REQUEST)
      );

    }

    const existingUser = await User.findOne({ email }); // Find an existing user

    if (existingUser) {
        return response.status(StatusCodes.BAD_REQUEST).json({ success: false, message: `User already exists` });
    }

    const user = await User.create({forename, surname, username, email, password,passwordConfirm});
    const token = user.getAuthenticationToken(); // Get the users JWT token

    if (!token) {
       return next( new ErrorResponse( "JWT Token invalid. Please ensure it is valid", StatusCodes.BAD_REQUEST));
    }

    const currentUser = user._id; // Get the current user's ID
    user.isNewUser = !user.isNewUser;

    await user.save();

    const userOTP = generateOTPVerificationToken(); // Function that generates the OTP token

    const verificationToken = new EmailVerification({owner: currentUser, token: userOTP});
    await verificationToken.save();

    //sendConfirmationEmail(user, userOTP as unknown as any);

    return sendTokenResponse(request, user, StatusCodes.CREATED, response);
  }
);

// @description: Verify User E-mail Address
// @parameters: request: Request Object, response: Response Object, next: Next Function
// @returns: Server Response Promise w/ Status Code 200
// @public: True (No Authorization Token Required)

export const verifyEmailAddress = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {

    const { userId, OTP } = request.body;
    const user = await User.findById(userId);

    // Check for invalid User ID
    if (!isValidObjectId(userId)) {
       return next(new ErrorResponse( "User ID not found. Please check your entry again.", StatusCodes.NOT_FOUND ));
    }

    // Check for missing OTP

    if (!OTP) {
      return next(new ErrorResponse("OTP not found. Please check your entry", StatusCodes.BAD_REQUEST));
    }

    if (!user) {
      return next(new ErrorResponse(`No user found with that ID`, StatusCodes.BAD_REQUEST));
    }

  
    if (user.isVerified) {

      return next(new ErrorResponse(`User account is already verified`, StatusCodes.BAD_REQUEST));
    }

    if (user.isActive) {  // If the user account is already active before verifying their e-mail address, send back error

      return next( new ErrorResponse(`User account is already active`, StatusCodes.BAD_REQUEST));
    }

    const token = await EmailVerification.findOne({ owner: userId }); // Find a verification token

    if (!token) {

      return next(new ErrorResponse(`OTP Verification token is not found. Please try again`, StatusCodes.BAD_REQUEST));
    }

    const otpTokensMatch = await token.compareVerificationTokens(OTP); // Check if they match

    if (!otpTokensMatch) {
      return next(new ErrorResponse(`The token you entered does not match the one in the database.`, StatusCodes.BAD_REQUEST));
    }

    if (otpTokensMatch) {

      user.isVerified = true; // Set theu ser is Verified field to true
      user.accountActive = true;

      await user.save();
      await EmailVerification.findByIdAndDelete(token._id); // Find the token and delete it

      const transporter = emailTransporter();

      transporter.sendMail({
        from: "welcome@ethertix.com",
        to: user.email,
        subject: "E-mail Confirmation Success",
        html: `<h1> Welcome to Ether Tix. Thank you for confirming your e-mail address.</h1>`,
      });

      const jwtToken = user.getAuthenticationToken();
      request.session = ({ token: jwtToken } as any) || undefined; // Get the authentication JWT token

      const date = new Date();
      const currentDate = date.toISOString();

      return response.status(StatusCodes.CREATED).json({ message: "E-mail Address verified", sentAt: currentDate });
    }
  }
);

// @description: Resend the E-mail Verification code to the user if not received
// @parameters: request: Request Object, response: Response Object, next: Next Function
// @returns: Server Response Promise
// @public: True (No Authorization Token Required)

export const resendEmailVerificationCode = asyncHandler(

  async (request: any, response: any, next: NextFunction): Promise<any> => {
    const { userId } = request.body;
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      // If we have no current user
      return next(
        new ErrorResponse(
          "Current user does not exist. Check user again",
          StatusCodes.BAD_REQUEST
        )
      );
    }

    if (!isValidObjectId(userId)) {
      return next(
        new ErrorResponse(
          "Owner ID invalid. Check again",
          StatusCodes.BAD_REQUEST
        )
      );
    }

    const token = await EmailVerification.findOne({ owner: userId }); // Find associating user token

    if (!token) {
      return next(
        new ErrorResponse("Old token not found", StatusCodes.BAD_REQUEST)
      );
    } else {
      await EmailVerification.deleteOne({ owner: userId });
    }

    // Fetch the generated token
    const otpToken = generateOTPVerificationToken();

    if (!otpToken) {
      return next(
        new ErrorResponse(
          "OTP Token generated is invalid.",
          StatusCodes.BAD_REQUEST
        )
      );
    }

    console.log(`Your User ID: `, userId);
    console.log(`Your OTP: `, otpToken);

    const newToken = new EmailVerification({
      owner: currentUser._id,
      token: otpToken,
    }); // Create a new instance of the token
    await newToken.save(); // Save the new token

    return response
      .status(StatusCodes.OK)
      .json({ success: true, message: "E-mail Verification Re-sent" });
  }
);

// @description: Login User
// @parameters: request: Request Object, response: Response Object, next: Next Function
// @returns: Server Response Promise w/ Status Code 200
// @public: True (No Authorization Token Required)

export const loginUser = asyncHandler(
  async (
    request: any,
    response: any,
    next: NextFunction
  ): Promise<any | Response> => {
    const { email, password, mfaToken } = request.body;

    if (!email || !password || !mfaToken) {
      return next(
        new ErrorResponse(
          `Missing parameter(s). Check entries`,
          StatusCodes.BAD_REQUEST
        )
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(
        new ErrorResponse(`Could not find that user`, StatusCodes.BAD_REQUEST)
      );
    }

    if (user.isLocked) {
      return next(
        new ErrorResponse(
          "Cannot login. Your account is locked",
          StatusCodes.BAD_REQUEST
        )
      );
    }

    if (!user.isVerified) {
      return next(
        new ErrorResponse(
          `You cannot login. Please verify your e-mail address first`,
          StatusCodes.BAD_REQUEST
        )
      );
    }

    // Compare user passwords before logging in
    const matchPasswords = await user.comparePasswords(password);

    if (!matchPasswords) {
      return next(
        new ErrorResponse(
          `Passwords do not match. Please try again`,
          StatusCodes.BAD_REQUEST
        )
      );
    }

    await verifyLoginToken(user._id.toString(), mfaToken, user.email, next);

    // Generate new JWT and store in in the session
    const token = user.getAuthenticationToken();

    request.session = { jwt: token }; // Store the token in the session as a cookie
    return response.status(StatusCodes.OK).json({ success: true, token, user });
  }
);

// API - 5

const verifyLoginToken = async (
  userId: string,
  mfaToken: string,
  email: string,
  next: NextFunction
) => {
  const user = await User.findById(userId);

  if (!isValidObjectId(userId)) {
    return next(
      new ErrorResponse(
        `This user ID is not valid. Please try again`,
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  if (!user) {
    return next(
      new ErrorResponse("No user-userId match...", StatusCodes.BAD_REQUEST)
    );
  }

  if (!mfaToken) {
    return next(
      new ErrorResponse("Please provide an MFA token", StatusCodes.BAD_REQUEST)
    );
  }

  const MfactorToken = await TwoFactorVerification.findOne({ owner: userId });

  if (!MfactorToken) {
    return next(
      new ErrorResponse(
        "No mfa token found in our system...",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const expired = await tokenExpired(userId);

  if (expired === true) {
    await newToken(userId, user.email);
    return next(
      new ErrorResponse(
        "The token you entered has expired, a new one has been sent to your email",
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  // Check to see if the tokens match
  const mfaTokensMatch = await MfactorToken.compareVerificationTokens(mfaToken);

  if (!mfaTokensMatch) {
    // If tokens don't match
    user.isActive = false;
    return next(
      new ErrorResponse(
        "The entered MFA token is invalid. Try again",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  await TwoFactorVerification.deleteOne({ owner: userId });

  user.isActive = true; // And user account is active

  // return response
  //   .status(StatusCodes.OK)
  //   .json({ message: "Your account is now active", sentAt: currentDate });
};

// API 6

//returns true of token associated with userId is expired (also deletes that token)
const tokenExpired = async (userId: string) => {
  const currentDate = new Date(); // Get the current date at which the token is created at
  const tokenINdb = await TwoFactorVerification.findOne({ owner: userId });

  if (currentDate.getTime() >= tokenINdb.expiresAt.getTime()) {
    tokenINdb.deleteOne({ owner: userId });
    return true;
  }
  return false;
};

//Generates and saves a new token, deletes the old if found any, adds an expiration to token by *specified in .env*
const newToken = async (userId: string, email: string) => {
  const currentDate = new Date();
  const expiresAfter = parseInt(process.env.AUTH_MFA_EXPIRY as string);

  const expiryTime = currentDate.getTime() + expiresAfter * 1000 * 60;
  const expiryDate = new Date(expiryTime);

  const tokenINdb = await TwoFactorVerification.findOne({ owner: userId });

  if (tokenINdb) {
    tokenINdb.deleteOne({ owner: userId });
  }
  const token = generateMfaToken();
  const newToken = await TwoFactorVerification.create({
    owner: userId,
    mfaToken: token,
    expiresAt: expiryDate,
  });
  newToken.save();

  //   sendLoginMfa(emailTransporter, email, token); //uncomment when email sender works

  console.log("Current mfa token: ", token);
};

export const sendTwoFactorLoginCode = asyncHandler(
  async (request: any, response: any, next: NextFunction): Promise<any> => {
    const { email, password } = request.body;

    const currentUser = await User.findOne({ email: email });

    if (!currentUser) {
      return next(
        new ErrorResponse(
          "No user found, check email entry...",
          StatusCodes.BAD_REQUEST
        )
      );
    }

    // Compare user passwords before logging in
    const matchPasswords = await currentUser.comparePasswords(password);

    if (!matchPasswords) {
      return next(
        new ErrorResponse(
          `Wrong password, check entry`,
          StatusCodes.BAD_REQUEST
        )
      );
    }

    if (currentUser.isLocked) {
      return next(
        new ErrorResponse(
          "Cannot login. Your account is locked",
          StatusCodes.BAD_REQUEST
        )
      );
    }

    await newToken(currentUser._id.toString(), email);

    const date = new Date();
    const currentDate = date.toISOString();

    return response.status(StatusCodes.OK).json({
      success: true,
      message: "Two Factor Verification Code Sent",
      sentAt: currentDate,
    });
  }
);

export const logoutUser = asyncHandler(
  async (request: any, response: any, next: NextFunction): Promise<any> => {
    if (request.session !== undefined) {
      request.session = null; // Clear the session object
    }

    return response
      .status(StatusCodes.OK)
      .json({ success: true, data: {}, message: "You have logged out" });
  }
);

export const forgotPassword = asyncHandler(

  async (request: any, response: any, next: NextFunction): Promise<any> => {
    const { email } = request.body;
    const user = await User.findOne({ email });

    // Check if we have an e-mail in the body of the request

    if (!email) {
      return next(
        new ErrorResponse(
          `Please enter an email address`,
          StatusCodes.BAD_REQUEST
        )
      );
    }

    if (!user) {

      return next(
        new ErrorResponse(
          "No user found with that e-mail address",
          StatusCodes.NOT_FOUND
        )
      );
    }

    const userHasResetToken = await PasswordReset.findOne({ owner: user._id });

    if (userHasResetToken) {
      await PasswordReset.deleteOne({ owner: user._id });
      return next(new ErrorResponse("User already has the password reset token", StatusCodes.BAD_REQUEST));
    }

    const token = generateRandomResetPasswordToken();

    if (token === undefined) { // If no token exists
     
      return next(
        new ErrorResponse(
          "Reset Password Token is invalid",
          StatusCodes.BAD_REQUEST
        )
      );
    }

    const resetPasswordToken = await PasswordReset.create({
      owner: user._id,
      token: token,
    }); // Create an instance of the Password Reset model
    await resetPasswordToken.save();

    const resetPasswordURL = `http://localhost:3000/reset-password/${token}/${user._id}`; // Create the reset password URL
    //sendPasswordResetEmail(user, resetPasswordURL);

    console.log("reset password url: ", resetPasswordURL);

    return response
      .status(StatusCodes.OK)
      .json({ success: true, message: "Reset Password E-mail Sent", email });
  }
);

export const resetPassword = asyncHandler(
  async (request: any, response: any, next: NextFunction): Promise<any> => {
    const newPassword = request.body.newPassword;
    const resetToken = request.body.resetToken;
    const userId = request.body.userId;

    if (!newPassword) {
      return next(
        new ErrorResponse(
          "Please specify the new password",
          StatusCodes.BAD_REQUEST
        )
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponse("No user found", StatusCodes.BAD_REQUEST));
    }

    const resetUser = await PasswordReset.findOne({ owner: userId });

    if (!resetUser) {
      return next(
        new ErrorResponse("No reset token found", StatusCodes.BAD_REQUEST)
      );
    }

    if (resetToken !== resetUser.token) {
      return next(
        new ErrorResponse(
          "Your reset token doesn't match ours",
          StatusCodes.BAD_REQUEST
        )
      );
    }

    user.password = newPassword;
    user.passwordConfirm = newPassword;

    await user.save(); // Save new user after reset the password

    await PasswordReset.deleteOne({ owner: userId });

    return response
      .status(StatusCodes.OK)
      .json({ success: true, message: "Password Reset Successfully" });
  }
);

export const getCurrentUser = asyncHandler(
  async (
    request: any,
    response: any,
    next: NextFunction
  ): Promise<any | Response> => {
    try {
      const userId = request.headers.authorization.split(" ")[2];
      const user = await User.findById(userId);
      return response.status(StatusCodes.OK).json({ success: true, user });
    } catch (error: any) {
      if (error) {
        return next(error);
      }
    }
  }
);

export const sendResetPasswordTokenStatus = async (
  request: any,
  response: any,
  next: NextFunction
): Promise<any> => {
  return response.status(StatusCodes.OK).json({ isValid: true });
};

export const updateUserPassword = asyncHandler(
  async (request: any, response: any, next: NextFunction): Promise<any> => {
    try {
      const userId = request.headers.authorization.split(" ")[2];

      const currentPassword = request.body.currentPassword;
      const newPassword = request.body.newPassword;
      const passwordConfirm = request.body.passwordConfirm;

      if (!currentPassword) {
        return next(
          new ErrorResponse(
            "Please enter your current password",
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!newPassword) {
        return next(
          new ErrorResponse(
            "Please provide your new password",
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!passwordConfirm) {
        return next(
          new ErrorResponse(
            "Please confirm your new password",
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (passwordConfirm !== newPassword) {
        return next(
          new ErrorResponse(
            "New passwords don't match",
            StatusCodes.BAD_REQUEST
          )
        );
      }

      const user = await User.findById(userId);

      if (!user) {
        return next(
          new ErrorResponse("No user found", StatusCodes.BAD_REQUEST)
        );
      }

      const currentPasswordMatch = user.comparePasswords(currentPassword);

      if (!currentPasswordMatch) {
        // If passwords do not match
        return next(
          new ErrorResponse(
            "Current password entered is invalid.",
            StatusCodes.BAD_REQUEST
          )
        );
      }

      user.password = newPassword;
      user.passwordConfirm = passwordConfirm;
      await user.save(); // Save new user

      return response
        .status(StatusCodes.OK)
        .json({ success: true, message: "User Password Updated" });
    } catch (error) {
      if (error) {
        return next(error);
      }
    }
  }
);

export const updateUserProfile = async (
  request: any,
  response: any,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = request.headers.authorization.split(" ")[2];

    const { email, username, role } = request.body;

    const updateData: any = {};

    if (email) {
      updateData.email = email;
    }

    if (username) {
      updateData.username = username;
    }

    if (role) {
      updateData.role = role;
    }

    const updatedUserProfile = await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    await updatedUserProfile.save();

    return response
      .status(StatusCodes.OK)
      .json({ success: true, message: "User profile updated" });
  } catch (error) {
    if (error) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message, stack: error.stack });
    }
  }
};

export const deactivateUserAccount = asyncHandler(
  async (request: any, response: any, next: NextFunction): Promise<any> => {
    const { userId } = request.body;
    const user = await User.findById(userId);

    if (!user) {
      return next(
        new ErrorResponse("No user found with that ID", StatusCodes.NOT_FOUND)
      );
    }

    if (!user.isValid || !user.isActive) {
      return next(
        new ErrorResponse(
          "User account is already inactive",
          StatusCodes.BAD_REQUEST
        )
      );
    }

    if (user.isActive && user.isValid) {
      // If the current user account is active and the user account is valid
      user.isActive = !user.isActive;
      user.isValid = !user.isValid;

      await user.save();
    }

    return response.status(StatusCodes.OK).json({
      success: true,
      message: "User Account Deactivated",
      status: user.isValid,
      sentAt: new Date(Date.now().toFixed()),
    });
  }
);

export const uploadUserProfilePicture = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any | Response> => {

    try {

      if (request.method === "PUT") {
        const userId = request.headers.authorization.split(" ")[2];
        const file = request.files!.file;
        const fileName = file.name;

        const currentUser = await User.findById(userId); // Find the current user

        if (!currentUser) {
          return next(new ErrorResponse("User Not found with that ID", StatusCodes.NOT_FOUND));
        }

        if (!request.files) {
          return next(
            new ErrorResponse(
              `Please upload a valid avatar for the user`,
              StatusCodes.BAD_REQUEST
            )
          );
        }

        if (!file.mimetype.startsWith("image")) {
          return next(
            new ErrorResponse(
              "Please make sure the uploaded file is an image",
              StatusCodes.BAD_REQUEST
            )
          );
        }

        // Validate File size. Check if file size exceeds the maximum size
        if (file.size > process.env.MAX_FILE_UPLOAD_SIZE!) {
          return next( new ErrorResponse("File Size Too Large - Please check file size again", StatusCodes.BAD_REQUEST)

          );
        }

        file.name = `photo_${currentUser._id}${path.parse(file.name).ext}`;

        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (error: any) => {

            if (error) {
               return next( new ErrorResponse("Problem with file upload", StatusCodes.INTERNAL_SERVER_ERROR));
            }

            await User.findByIdAndUpdate(request.params.id, {
              photo: fileName,
            });
            return response.status(StatusCodes.OK).json({
              success: true,
              message: "User Avatar Uploaded",
              sentAt: new Date(Date.now()),
            });
          }
        );
      }
    } catch (error: any) {
      if (error) {
        return next(error);
      }
    }
  }
);

export const getAllUserPremiumAccounts = asyncHandler(
  async (
    request: any,
    response: any,
    next: NextFunction
  ): Promise<any | Response> => {
    try {
      if (request.method === "GET") {
        const premiumUsers = await User.find({ premium: true });

        if (!premiumUsers) {
          return next(
            new ErrorResponse("No premium users found", StatusCodes.BAD_REQUEST)
          );
        }

        return response.status(StatusCodes.OK).json({ success: true, data: premiumUsers });
      }
    } 
    
    catch (error: any) {
      if (error) {
        return response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: error.message, stack: error.stack });
      }
    }
  }
);

export const fetchLockedUserAccounts = asyncHandler(
  async (
    request: any,
    response: any,
    next: NextFunction
  ): Promise<any | Response> => {
    try {
      const lockedUserAccounts = await User.find({ accountLocked: !false });

      if (!lockedUserAccounts) {
        return next(
          new ErrorResponse(
            "Could not find any locked user accounts",
            StatusCodes.BAD_REQUEST
          )
        );
      }

      return response
        .status(StatusCodes.OK)
        .json({ success: true, data: lockedUserAccounts });
    } catch (error) {
      if (error) {
        return next(error);
      }
    }
  }
);

// ADMIN CONTROLLERS

export const fetchAllUsers = asyncHandler(
  async (
    request: any,
    response: any,
    next: NextFunction
  ): Promise<any | Response> => {
    try {
      const users = await User.find();

      if (!users) {
        return next(
          new ErrorResponse(
            "No users found in the database",
            StatusCodes.NOT_FOUND
          )
        );
      }

      return response.status(StatusCodes.OK).json({ success: true, users });
    } catch (error: any) {
      if (error) {
        return response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: error.message, stack: error.stack });
      }
    }
  }
);

export const fetchUserByID = asyncHandler(
  async (
    request: any,
    response: any,
    next: NextFunction
  ): Promise<any | Response> => {
    try {
      const userId = request.params.userId;
      const user = await User.findById(userId);

      if (!userId) {
        return next(
          new ErrorResponse(
            "User ID not found. Please check your query params",
            StatusCodes.NOT_FOUND
          )
        );
      }

      return response.status(StatusCodes.OK).json({ success: true, user });
    } catch (error: any) {
      if (error) {
        return response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: error.message, stack: error.stack });
      }
    }
  }
);

export const createNewUser = asyncHandler (async (request: any, response: any, next: NextFunction): Promise<any | Response> => {
      const body = request.body;
      const user = await User.create(body);

      return response.status(StatusCodes.CREATED).json({ success: true, user });
    } 
  
);

export const editUserByID = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any | Response> => {

    // Verify incoming HTTP method

    if (request.method === "PUT") {
      const userId = request.params.userId; // Extract User ID

      if (!userId) {
         return next(new ErrorResponse("User ID not found. Please check your query params", StatusCodes.NOT_FOUND));
      }

      let user = await User.findById(userId);

      if (!user) {
        return next(new ErrorResponse("User not found", StatusCodes.NOT_FOUND));
      }

      user = await User.findByIdAndUpdate(userId, request.body, {new: true, runValidators: true});
      await user.save();
      return response.status(StatusCodes.OK).json({ success: true, data: user });
    }

  } 
  
)

export const deleteUserByID = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any | Response> => {

    if (request.method === "DELETE") {

      const userId = request.params.userId;

      if (!userId) {
        return next(new ErrorResponse(`User with that ID not found`, StatusCodes.BAD_REQUEST));
      }

      await User.findByIdAndDelete(userId);
      return response.status(StatusCodes.NO_CONTENT).json({ success: true, message: "User Deleted", data: null });
    }
  } 


)

export const deleteAllUsers = asyncHandler(async (request: any, response: any,next: NextFunction): Promise<any> => {

    if (request.method === "DELETE") {
      await User.deleteMany();
      return response.status(StatusCodes.NO_CONTENT).json({ success: true, data: {}, message: "Users deleted" });
    }

  } 

)

export const lockUserAccount = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any | Response> => {
    const userId = request.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponse("That user is not found not found. Please check your query params", StatusCodes.NOT_FOUND));
    }

    return response.status(StatusCodes.OK).json({ success: true, message: "User Account Locked" });
});

export const unlockUserAccount = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any | Response> => {
    try {

      // Find the user by their ID
      const user = await User.findById(request.params.id);

      if (!user) {
        return response.status(StatusCodes.NOT_FOUND).json({ msg: "User not found with that ID" });
      }

      if (user.isLocked) {

        user.isLocked = false; // If the user is currently locked, set the isLocked flag to false
        await user.save();

        return response.status(StatusCodes.OK).json({
          success: true,
          message: "User account unlocked",
          isLocked: user.isLocked,
        });
      }
    } 
    
    catch (error: any) {
      if (error) {
        return response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: error.message, stack: error.stack });
      }
    }
  }
);

export const fetchTotalUsers = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any | Response> => {
    try {

      const totalUsers = await User.countDocuments({});
      
      return response.status(StatusCodes.OK).json({ success: true, count: totalUsers });
    } 
    
    catch (error) {
      if (error) {
        return response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: error.message, stack: error.stack });
      }
    }
  }
);
