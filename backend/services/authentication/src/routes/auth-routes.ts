import express, { Router } from "express";
import {registerUser, loginUser} from "../controllers/auth-controller";

const authRouter: Router = express.Router();

export default authRouter;