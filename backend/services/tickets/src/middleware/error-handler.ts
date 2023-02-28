
import { ErrorResponse } from '../utils/error-response';
import express, {Response, NextFunction} from 'express';
import { StatusCodes } from 'http-status-codes';

let ERROR_TYPES = ['CastError']

export const errorHandler = (err, request: any, response: any, next: NextFunction) => {

    // let error = {...err};
    // error.message = err.message;

    // error.statusCode = err.statusCode;
    // error.stack = err.stack;
    console.log(`Current Error :`, err)

    if(process.env.TICKETS_DEV_MODE === 'development') {
        console.log(`Current Error :`, err)

        if(err.code === 11000) {
            const message = `Duplicate resource found on the server ${Object.keys(err.keyValue)}`;
            // error = new ErrorResponse(message, StatusCodes.BAD_REQUEST);
        }

        if(err.name === ERROR_TYPES[0]) {
            const message = `Resource not found on the server. Invalid : ${err.path}`;
            // error = new ErrorResponse(message, StatusCodes.BAD_REQUEST);
        }

    }

    console.log(`Status Code `, err.statusCode);

    return response.status(err.statusCode).json({success: false, message: err.message, stack: err.stack});
}