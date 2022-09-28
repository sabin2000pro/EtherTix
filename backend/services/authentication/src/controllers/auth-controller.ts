import { NextFunction, Request, Response } from 'express';
import User from '../models/user-model';

export const registerUser = async (request: Request, response: Response, next: NextFunction): Promise<Response> => {
    return response.status(200).json({message: "Register User", success: true});
}

export const loginUser = async (request: Request, response: Response, next: NextFunction): Promise<Response> => {
    return response.status(200).json({message: "Login User", success: true});
}