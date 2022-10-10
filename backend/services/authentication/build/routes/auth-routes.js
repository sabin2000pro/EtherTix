"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth-controller");
const authRouter = express_1.default.Router();
authRouter.route('/register').post(auth_controller_1.registerUser);
authRouter.route('/verify-email').post(auth_controller_1.verifyEmailAddress);
authRouter.route('/login').post(auth_controller_1.loginUser);
authRouter.route('/verify-login-mfa').post(auth_controller_1.verifyLoginToken);
authRouter.route('/logout').get(auth_controller_1.logoutUser);
authRouter.route('/forgot-password').post(auth_controller_1.forgotPassword);
authRouter.route('/reset-password').post(auth_controller_1.resetPassword);
exports.default = authRouter;
//# sourceMappingURL=auth-routes.js.map