"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfileValidationAgent = exports.updateUserPasswordValidationAgent = exports.resetPasswordValidationAgent = exports.emailValidationAgent = exports.forgotPasswordValidationAgent = exports.loginValidationAgent = exports.registerUserValidationAgent = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserValidationAgent = joi_1.default.object({
    username: joi_1.default.string().required(),
    forename: joi_1.default.string().required(),
    email: joi_1.default.string().email().lowercase().required(),
    password: joi_1.default.string().min(5).required(),
    role: joi_1.default.string().required()
});
// @description: Login Validation
exports.loginValidationAgent = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.forgotPasswordValidationAgent = joi_1.default.object({
    email: joi_1.default.string().required()
});
exports.emailValidationAgent = joi_1.default.object({
    email: joi_1.default.string().required()
});
exports.resetPasswordValidationAgent = joi_1.default.object({
    currentPassword: joi_1.default.string().required(),
    newPassword: joi_1.default.string().required()
});
exports.updateUserPasswordValidationAgent = joi_1.default.object({});
exports.updateUserProfileValidationAgent = joi_1.default.object({});
