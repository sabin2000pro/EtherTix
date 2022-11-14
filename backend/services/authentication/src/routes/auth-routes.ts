import { updateUserPassword, updateUserProfile } from './../controllers/auth-controller';
import express, { Router } from "express";
import {registerUser, loginUser, forgotPassword, resetPassword, verifyEmailAddress, verifyLoginToken, logoutUser} from "../controllers/auth-controller";
import { protectAuth } from '../middleware/auth-middleware';
import rateLimit from 'express-rate-limit';

const authRouter: Router = express.Router();

const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

authRouter.route('/register').post(registerUser);
authRouter.route('/verify-email').post(rateLimiter, verifyEmailAddress);
authRouter.route('/login').post(rateLimiter, loginUser);
authRouter.route('/verify-login-mfa').post(rateLimiter, verifyLoginToken)

authRouter.route('/logout').get(rateLimiter, protectAuth as any, logoutUser as any);
authRouter.route('/forgot-password').post(rateLimiter, forgotPassword as any);
authRouter.route('/reset-password').post(rateLimiter, resetPassword as any);

authRouter.route('/update-password').post(rateLimiter, updateUserPassword as any)
authRouter.route('/update-profile').put(rateLimiter, updateUserProfile as any)

export default authRouter;