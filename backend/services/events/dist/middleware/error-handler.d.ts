import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
export interface IErrorResponse {
    message: string;
    statusCode: number | undefined;
    status: string | undefined;
    processErrors(): IError;
}
export interface IError {
    message: string;
    statusCode: number;
    status: string;
}
export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract status: string;
    constructor(message: string);
    processErrors(): IError;
}
export declare const errorHandler: (err: Error, request: Request, response: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare class BadRequestError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: any, statusCode: any);
}
export declare class NotFoundError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, statusCode: number);
}
export declare class JwtTokenError extends Error {
    statusCode: StatusCodes;
    constructor(message: string, statusCode: number);
}
export declare class ValidationError extends Error {
    statusCode: StatusCodes;
    constructor(message: string, statusCode: number);
}
export declare class FileTooLargeError extends Error {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, statusCode: number);
}
export declare class ServerError extends Error {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, statusCode: number);
}
export declare class UnauthorizedError extends Error {
    statusCode: StatusCodes;
    constructor(message: string, statusCode: number);
}
export declare class ForbiddenError extends Error {
    statusCode: StatusCodes;
    constructor(message: string, statusCode: number);
}
export declare class UnauthenticatedError extends Error {
    statusCode: StatusCodes;
    constructor(message: string, statusCode: number);
}
export declare class AccountNotActiveError extends Error {
    statusCode: StatusCodes;
    constructor(message: string, statusCode: number);
}
export declare class AccountVerifiedError extends Error {
    statusCode: StatusCodes;
    constructor(message: string, statusCode: number);
}
export declare class AccountNotVerified extends Error {
    statusCode: StatusCodes;
    constructor(message: string, statusCode: number);
}
export declare class DuplicateFieldError extends Error {
    statusCode: StatusCodes;
    constructor(message: string, statusCode: number);
}
export declare class JwtTokenNotFoundError extends Error {
    statusCode: StatusCodes;
    constructor(message: string, statusCode: number);
}
