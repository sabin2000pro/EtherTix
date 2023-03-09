import express, { Router } from "express";
import { RATE_LIMIT_MINUTES } from "../constants/auth-constants";
import {registerUser, updateUserPassword, fetchAllUsers, editUserByID, updateUserProfile, loginUser, resendEmailVerificationCode, resendTwoFactorLoginCode, forgotPassword, resetPassword, verifyEmailAddress, verifyLoginToken, logoutUser, getCurrentUser, fetchTotalUsers, deactivateUserAccount, deleteUserByID} from "../controllers/auth-controller";
import rateLimit from 'express-rate-limit';
import { protectAuth } from '../middleware/auth-middleware';

export const authRouter: Router = express.Router();

const rateLimiter = rateLimit({
	windowMs: RATE_LIMIT_MINUTES,
	max: 30, // Limit each IP to 30 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

authRouter.route('/register').post(registerUser as any);
authRouter.route('/verify-email').post(rateLimiter as any, verifyEmailAddress as any);
authRouter.route('/resend-email-verification').post(rateLimiter as any, resendEmailVerificationCode as any);

authRouter.route('/login').post(rateLimiter as any, loginUser as any);
authRouter.route('/verify-login-mfa').post(rateLimiter as any, verifyLoginToken as any)
authRouter.route('/resend-login-mfa').post(rateLimiter as any, resendTwoFactorLoginCode as any);

authRouter.route('/logout').get(rateLimiter as any, logoutUser as any);
authRouter.route('/forgot-password').post(rateLimiter as any, forgotPassword as any);
authRouter.route('/reset-password/:resetToken').post(rateLimiter as any, resetPassword as any);

authRouter.route('/update-profile').put(rateLimiter as any, protectAuth as any, updateUserProfile as any)
authRouter.route('/update-password').put(rateLimiter as any, protectAuth as any, updateUserPassword as any);
authRouter.route('/me').get(rateLimiter as any, protectAuth as any, getCurrentUser as any);

authRouter.route('/get/user-count').get(rateLimiter as any, protectAuth as any, fetchTotalUsers as any)
authRouter.route('/deactivate-account').put(rateLimiter as any, protectAuth as any, deactivateUserAccount);


// Backend Protected Routes for User Management (GET Users, Update Users, Delete Users) -> Assigned to users that holds the role organiser
authRouter.route('/users').get(rateLimiter as any, protectAuth as any, fetchAllUsers as any);
authRouter.route('/users/:userId').put(rateLimiter as any, protectAuth as any, editUserByID as any).delete(rateLimiter as any, protectAuth as any, deleteUserByID);
