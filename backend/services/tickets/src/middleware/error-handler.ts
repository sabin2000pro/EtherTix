import { NextFunction } from 'express';
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

export const errorHandler = (err: Error, request: any, response: any, next: NextFunction) => {

    if(err instanceof CustomError) {
        return response.status(StatusCodes.NOT_FOUND).json({message: err.message, errors: err.processErrors() })
    }

    return next();
}

export class BadRequestError extends CustomError {
    statusCode = StatusCodes.BAD_REQUEST;
    status = "Bad Request Error."

  constructor(message: any, statusCode: any) {
        super(message);
        this.statusCode = statusCode;
  }

}

export class NotFoundError extends CustomError {
    statusCode = StatusCodes.BAD_REQUEST;
    status = "Resource not found on the server"

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }

}
export class JwtTokenError extends Error { // Custom JWT Erorr: This type of error is thrown in the event of a JWT Token error happens
    statusCode = StatusCodes.FORBIDDEN;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }

}

export class ValidationError extends Error {
    statusCode = StatusCodes.UNPROCESSABLE_ENTITY;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }


}

export class FileTooLargeError extends Error {
    statusCode = StatusCodes.BAD_REQUEST;
    status = "The file size of the file you uploaded is too large. Check again."

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }
}

export class ServerError extends Error {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    status = "Unexpected Server Error Occurred"

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }

}

export class UnauthorizedError extends Error {
    statusCode = StatusCodes.UNAUTHORIZED;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }

}

export class ForbiddenError extends Error {
    statusCode = StatusCodes.FORBIDDEN;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
    
}
export class UnauthenticatedError extends Error {
    statusCode = StatusCodes.UNAUTHORIZED;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }

}

export class AccountNotActiveError extends Error {
    statusCode = StatusCodes.BAD_REQUEST;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }
}

export class AccountVerifiedError extends Error {
    statusCode = StatusCodes.BAD_REQUEST;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }

}

export class AccountNotVerified extends Error {
    statusCode = StatusCodes.BAD_REQUEST;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }

}
export class DuplicateFieldError extends Error {
    statusCode = StatusCodes.BAD_REQUEST;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }
}

export class JwtTokenNotFoundError extends Error {
    statusCode = StatusCodes.FORBIDDEN;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }
}
