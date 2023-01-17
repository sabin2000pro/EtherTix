import express, { Router } from "express";
import {registerUser, updateUserPassword, updateUserProfile, loginUser, resendEmailVerificationCode, resendTwoFactorLoginCode, forgotPassword, resetPassword, verifyEmailAddress, verifyLoginToken, logoutUser, getCurrentUser, fetchTotalUsers, deactivateUserAccount} from "../controllers/auth-controller";
import rateLimit from 'express-rate-limit';
import { protectAuth } from '../middleware/auth-middleware';

export const authRouter: Router = express.Router({mergeParams: true});

const rateLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 30, // Limit each IP to 30 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

authRouter.route('/register').post(rateLimiter, registerUser as any);
authRouter.route('/verify-email').post(rateLimiter, verifyEmailAddress as any);

authRouter.route('/login').post(rateLimiter, loginUser as any);
authRouter.route('/verify-login-mfa').post(rateLimiter, verifyLoginToken as any)

authRouter.route('/logout').get(rateLimiter, logoutUser as any);
authRouter.route('/forgot-password').post(rateLimiter, forgotPassword as any);
authRouter.route('/reset-password').post(rateLimiter, resetPassword as any);

authRouter.route('/update-profile').put(rateLimiter, protectAuth as any, updateUserProfile as any)
authRouter.route('/update-password').put(rateLimiter, protectAuth as any, updateUserPassword as any);
authRouter.route('/me').get(rateLimiter, protectAuth as any, getCurrentUser as any);

authRouter.route('/get/user-count').get(rateLimiter, protectAuth as any, fetchTotalUsers)
authRouter.route('/deactivate-account').put(rateLimiter, protectAuth as any, deactivateUserAccount);

authRouter.route('/resend-mfa').post(rateLimiter, resendEmailVerificationCode as any);
authRouter.route('/resend-login-mfa').post(rateLimiter, resendTwoFactorLoginCode);