"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerAccountSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerAccountSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().lowercase().required(),
    password: joi_1.default.string().min(5).required(),
    role: joi_1.default.string().required()
});
exports.loginSchema = joi_1.default.object({});
//# sourceMappingURL=validation-middleware.js.map