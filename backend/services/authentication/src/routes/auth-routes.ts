import express, { Router } from "express";
import {registerUser, loginUser, forgotPassword, resetPassword, verifyEmailAddress, verifyLoginToken, logoutUser} from "../controllers/auth-controller";
import { protectAuth } from '../middleware/auth-middleware';
import rateLimit from 'express-rate-limit';

const authRouter: Router = express.Router();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

authRouter.route('/register').post(registerUser);
authRouter.route('/verify-email').post(verifyEmailAddress);
authRouter.route('/login').post(loginUser);
authRouter.route('/verify-login-mfa').post(verifyLoginToken)
authRouter.route('/logout').get(protectAuth as any, logoutUser);
authRouter.route('/forgot-password').post(forgotPassword);
authRouter.route('/reset-password').post(resetPassword);

export default authRouter;