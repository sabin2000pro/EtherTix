import { StatusCodes } from "http-status-codes";

export interface IErrorResponse { // Error Response interface
    message: string;
    statusCode: number | undefined;
    status: string | undefined;
    processErrors(): IError
}

export interface IError { // Error Interface
    message: string;
    statusCode: number;
    status: string;
}

export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract status: string;

    constructor(message: string) {
        super(message)
    }

    public processErrors(): IError {
        return {message: this.message, statusCode: this.statusCode, status: this.status}
    }
}

export class BadRequestError extends Error {
    statusCode = StatusCodes.BAD_REQUEST;
    status = "Bad Request Error."

  constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
  }

}


export class NotFoundError extends Error {
    statusCode = StatusCodes.BAD_REQUEST;
    status = "Bad Request Error."
}

export class JwtMalformedError extends Error {

}

export class FileTooLargeError extends Error {

}

