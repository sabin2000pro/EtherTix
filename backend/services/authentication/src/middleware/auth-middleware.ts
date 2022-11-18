import { StatusCodes } from 'http-status-codes';
import {UnauthorizedError } from './error-handler';
import { NextFunction, Request, Response } from "express";
import { User } from '../models/user-model';
import jwt from "jsonwebtoken";
import { ForbiddenError } from './error-handler';

  export interface IUserData {
    _id: string;
    email: string;
    username: string;
    role: string;
}

export interface IRequestUser extends Request {
    user: IUserData
}

export type IAuthRequest = IRequestUser & {
    headers: {authorization: string}
}

export const protectAuth = async (request: IAuthRequest & IRequestUser, response: Response, next: NextFunction): Promise<any> => {
    let token;
    
    // Check to see if the authorization header starts with Bearer
    if(request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
         token = request.headers.authorization.split(' ')[1]; // Get the JWT token at the first index after Bearer
    }

    if(!token) {
        return next(new UnauthorizedError("You are not authorized to perform this action", StatusCodes.BAD_REQUEST));
    }

    try {
        
        const decoded: any = jwt.verify(token, process.env.JWT_TOKEN!);
        request.user = await User.findById(decoded._id);

        return next();
    } 
    
    catch(error: any) {

        if(error) {
            return next(new UnauthorizedError("You are unauthorized to perform this action", StatusCodes.BAD_REQUEST));
        }

        
    }

    
}

// Middleware Function to restrict certain actions to specific user roles
export const restrictRolesTo = (...roles) => {

    return (request: Request & IRequestUser, response: Response, next: NextFunction) => {

        if(!request.user.role.includes(roles as any)) {  // Check to see if the specified user object role in the body of the request matches
            return next(new ForbiddenError("Your role is unauthorized to perform this action", StatusCodes.FORBIDDEN));
        }

        return next();

    }
}