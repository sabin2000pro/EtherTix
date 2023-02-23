import { StatusCodes } from 'http-status-codes';
import express, {Request, Response, NextFunction} from 'express';

export const venuesErrorHandler = async (err, request, response, next) => {
    let error = {...err};
    error.statusCode = err.statusCode;
    error.message = err.message;

    return response.status(StatusCodes.OK).json({success: false, message: error.message, stack: error.stack, error});
}