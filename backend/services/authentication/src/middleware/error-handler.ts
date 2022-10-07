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

}

export class NotFoundError extends Error {
    
}