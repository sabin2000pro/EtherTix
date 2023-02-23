import { ErrorResponse } from '../utils/error-response';
import express, {Response, NextFunction} from 'express';

export const errorHandler = (err, request: any, response: any, next: NextFunction) => {
    let error = {...err};

    error.message = err.message;
    error.statusCode = err.statusCode;

    console.log(`Error Object Message : `, error.message);
    console.log(`Error : `, err);

    if(process.env.AUTH_SERVICE_DEV_MODE === 'development') {

    }

    if(process.env.AUTH_SERVICE_DEV_MODE === 'production') {
        
    }


    return response.status(error.statusCode).json({success: false, message: err.message, stack: err.stack});
}