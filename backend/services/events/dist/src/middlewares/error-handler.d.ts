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
export declare class BadRequestError extends Error {
    statusCode: StatusCodes;
    status: string;
    constructor(message: any, statusCode: any);
}
export declare class NotFoundError extends Error {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, statusCode: number);
}
export declare class JwtTokenError extends Error {
    statusCode: StatusCodes;
    status: string;
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
    status: string;
}
export declare class ImproperHTTPMethod extends Error {
}
export declare class UnauthenticatedError extends Error {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, statusCode: number);
}
export declare class DuplicateFieldError extends Error {
}
export declare class JwtTokenNotFoundError extends Error {
}
