"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth-controller");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_middleware_1 = require("../middleware/auth-middleware");
exports.authRouter = express_1.default.Router({ mergeParams: true });
const rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
exports.authRouter.route('/register').post(rateLimiter, auth_controller_1.registerUser);
exports.authRouter.route('/verify-email').post(rateLimiter, auth_controller_1.verifyEmailAddress);
exports.authRouter.route('/login').post(rateLimiter, auth_controller_1.loginUser);
exports.authRouter.route('/verify-login-mfa').post(rateLimiter, auth_controller_1.verifyLoginToken);
exports.authRouter.route('/logout').get(rateLimiter, auth_controller_1.logoutUser);
exports.authRouter.route('/forgot-password').post(rateLimiter, auth_controller_1.forgotPassword);
exports.authRouter.route('/reset-password').post(rateLimiter, auth_controller_1.resetPassword);
exports.authRouter.route('/update-profile').put(rateLimiter, auth_controller_1.updateUserProfile);
exports.authRouter.route('/me').get(rateLimiter, auth_middleware_1.protectAuth, auth_controller_1.getCurrentUser);
exports.authRouter.route('/get/user-count').get(rateLimiter, auth_middleware_1.protectAuth, auth_controller_1.fetchTotalUsers);
exports.authRouter.route('/deactivate-account').put(rateLimiter, auth_middleware_1.protectAuth, auth_controller_1.deactivateUserAccount);
