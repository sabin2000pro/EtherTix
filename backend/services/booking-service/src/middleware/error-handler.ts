import { StatusCodes } from 'http-status-codes';
import { NextFunction } from 'express';

export const errorHandler = (err: any, request: any, response: any, next: NextFunction): Promise<any> => {
    let error = {...err};
    err.message = error.message;
    err.stack = error.stack;

    return response.status(StatusCodes.OK)
}