import express, { Router } from "express";
import {registerUser, loginUser, forgotPassword, resetPassword, verifyEmailAddress, verifyLoginToken, logoutUser} from "../controllers/auth-controller";

const authRouter: Router = express.Router();

authRouter.route('/register').post(registerUser);
authRouter.route('/verify-email').post(verifyEmailAddress);
authRouter.route('/login').post(loginUser);
authRouter.route('/verify-login-mfa').post(verifyLoginToken)
authRouter.route('/logout').get(logoutUser);
authRouter.route('/forgot-password').post(forgotPassword);
authRouter.route('/reset-password').post(resetPassword);

export default authRouter;