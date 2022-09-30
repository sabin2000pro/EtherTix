import { ErrorResponse } from "../utils/error-response"
import {Request, Response, NextFunction} from "express";


export const errorHandler = (err, request: Request, response: Response, next: NextFunction) => {
    const statusCode = response.statusCode === 200 ? 500 : response.statusCode

    let error = {...err};
    error.message = err.message;
    error.stack = err.stack;

    console.log(err);

    if(err.code === 11000) {
        const errMsg = "Duplicate value entered"
        error = new ErrorResponse(errMsg, 400);
    }

    if(err.name === 'CastError') {
        const errMsg = "Resource not found on the server";
        error = new ErrorResponse(errMsg, 404);
    }

    return response.status(statusCode).json({error: err.message, stack: err.stack})
}