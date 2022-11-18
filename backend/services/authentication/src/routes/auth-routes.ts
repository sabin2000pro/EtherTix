import { registerUserValidationAgent } from './../middleware/validation-middleware';
import { updateUserPassword, updateUserProfile } from './../controllers/auth-controller';
import express, { Router } from "express";
import {registerUser, loginUser, forgotPassword, resetPassword, verifyEmailAddress, verifyLoginToken, logoutUser, getCurrentUser} from "../controllers/auth-controller";
import rateLimit from 'express-rate-limit';
import { protectAuth } from '../middleware/auth-middleware';

export const authRouter: Router = express.Router();

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

authRouter.route('/update-password').post(rateLimiter, updateUserPassword as any)
authRouter.route('/update-profile').put(rateLimiter, updateUserProfile as any)
authRouter.route('/me').get(rateLimiter, protectAuth as any, getCurrentUser as any);