"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictRolesTo = exports.protectAuth = void 0;
const http_status_codes_1 = require("http-status-codes");
const error_handler_1 = require("./error-handler");
const user_model_1 = require("../models/user-model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handler_2 = require("./error-handler");
const protectAuth = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    // Check to see if the authorization header starts with Bearer
    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
        token = request.headers.authorization.split(' ')[1]; // Get the JWT token at the first index after Bearer
    }
    if (!token) {
        return next(new error_handler_1.UnauthorizedError("You are not authorized to perform this action", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        request.user = yield user_model_1.User.findById(decoded._id);
        return next();
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.UnauthorizedError("You are unauthorized to perform this action", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.protectAuth = protectAuth;
// Middleware Function to restrict certain actions to specific user roles
const restrictRolesTo = (...roles) => {
    return (request, response, next) => {
        if (!request.user.role.includes(roles)) { // Check to see if the specified user object role in the body of the request matches
            return next(new error_handler_2.ForbiddenError("Your role is unauthorized to perform this action", http_status_codes_1.StatusCodes.FORBIDDEN));
        }
        return next();
    };
};
exports.restrictRolesTo = restrictRolesTo;
