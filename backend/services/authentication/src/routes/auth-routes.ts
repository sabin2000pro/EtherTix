import express, { Router } from "express";
import {registerUser, loginUser, forgotPassword, resetPassword, verifyEmailAddress, verifyLoginToken} from "../controllers/auth-controller";

const authRouter: Router = express.Router();

authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);
authRouter.route('/forgot-password').post(forgotPassword);


export default authRouter;