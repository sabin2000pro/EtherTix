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
    status = "Resource not found on the server"

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
  }

}

export class JwtMalformedError extends Error {

}

export class FileTooLargeError extends Error {
    statusCode = StatusCodes.BAD_REQUEST;
    status = "The file size of the file you uploaded is too large. Check again."

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
  }
}

export class ServerError extends Error {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    status = "Unexpected Server Error Occurred"

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
  }

}

export class UnauthorizedError extends Error {
    statusCode = StatusCodes.UNAUTHORIZED;
    status = "You are unauthorized to perform this action."
}

export class ImproperHTTPMethod extends Error {

}

export class UnauthenticatedError extends Error {

    statusCode = StatusCodes.UNAUTHORIZED;
    status = "You are unauthorized to perform this action."

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
  }
}

export class DuplicateFieldError extends Error {

}

export class JwtTokenNotFoundError extends Error {

}