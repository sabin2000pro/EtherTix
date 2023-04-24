import { StatusCodes } from 'http-status-codes';
import { NextFunction } from 'express';
import { ErrorResponse } from "../utils/error-response";

export const errorHandler = (err: any, request: any, response: any, next: NextFunction): Promise<any> => {
    let error = {...err}
    err.message = error.message;
    err.stack = error.stack

    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message, stack: error.stack, error});
}