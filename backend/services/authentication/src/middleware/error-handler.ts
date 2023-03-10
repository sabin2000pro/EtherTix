require('dotenv').config();
import { ErrorResponse } from '../utils/error-response';
import express, {Response, NextFunction} from 'express';
import { StatusCodes } from 'http-status-codes';

let ERROR_TYPES = ['CastError']

export const errorHandler = (err, request: any, response: any, next: NextFunction) => {

    let error = {...err};
    error.message = err.message;

    error.statusCode = err.statusCode;
    error.stack = err.stack;

    if(process.env.AUTH_SERVICE_NODE_ENV === 'development') {

        if(err.code === 11000) {
            const message = `Duplicate resource found on the server ${Object.keys(err.keyValue)}`;
            error = new ErrorResponse(message, StatusCodes.BAD_REQUEST);
        }

        if(err.name === ERROR_TYPES[0]) {
            const message = `Resource not found on the server. Invalid : ${err.path}`;
            error = new ErrorResponse(message, StatusCodes.BAD_REQUEST);
        }

    }

    // Handle production errors
    if(process.env.AUTH_SERVICE_DEV_MODE === 'production') {
        
    }

    return response.status(error.statusCode || 500).json({success: false, message: error.message, stack: error.stack});
}