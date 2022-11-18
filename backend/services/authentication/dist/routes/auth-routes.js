"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./../controllers/auth-controller");
const express_1 = __importDefault(require("express"));
const auth_controller_2 = require("../controllers/auth-controller");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const authRouter = express_1.default.Router();
const rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
authRouter.route('/register').post(auth_controller_2.registerUser);
authRouter.route('/verify-email').post(rateLimiter, auth_controller_2.verifyEmailAddress);
authRouter.route('/login').post(rateLimiter, auth_controller_2.loginUser);
authRouter.route('/verify-login-mfa').post(rateLimiter, auth_controller_2.verifyLoginToken);
authRouter.route('/logout').get(rateLimiter, auth_middleware_1.protectAuth, auth_controller_2.logoutUser);
authRouter.route('/forgot-password').post(rateLimiter, auth_controller_2.forgotPassword);
authRouter.route('/reset-password').post(rateLimiter, auth_controller_2.resetPassword);
authRouter.route('/update-password').post(rateLimiter, auth_controller_1.updateUserPassword);
authRouter.route('/update-profile').put(rateLimiter, auth_controller_1.updateUserProfile);
authRouter.route('/me').get(auth_controller_2.getCurrentUser);
exports.default = authRouter;
