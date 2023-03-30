
import { ErrorResponse } from '../utils/error-response';
import express, {Response, NextFunction} from 'express';
import { StatusCodes } from 'http-status-codes';

let ERROR_TYPES = ['CastError']

export const errorHandler = (err, request: any, response: any, next: NextFunction) => {

    let error = {...err};
    error.message = err.message;
    error.statusCode = err.statusCode

    error.stack = err.stack;

    if(process.env.TICKETS_DEV_MODE === 'development') {
        console.log(`Current Copy of Error :`, error.message)

        if(err.code === 11000) {
            const message = `Duplicate resource found on the server ${Object.keys(err.keyValue)}`;
            error = new ErrorResponse(message, StatusCodes.BAD_REQUEST);
        }

        if(err.name === ERROR_TYPES[0]) {
            const message = `Resource not found on the server. Invalid : ${err.path}`;
            error = new ErrorResponse(message, StatusCodes.BAD_REQUEST);
        }

    }

    console.log(`Error : `, error.message);
    console.log(`Error Stack : `, error.stack);

    return response.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message, stack: error.stack});
}