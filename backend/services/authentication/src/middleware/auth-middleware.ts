import { StatusCodes } from 'http-status-codes';
import {UnauthorizedError } from './error-handler';
import { NextFunction, Request, Response } from "express";
import { User } from '../models/user-model';
import jwt from "jsonwebtoken";
import { ForbiddenError } from './error-handler';
require('dotenv').config();
  export interface IUserData {
    user: any
    role: string;
    _id: any;
}

export interface IRequestUser extends Request {
    user: IUserData
}

export type IAuthRequest = IRequestUser & {
    headers: {authorization: string}
}


export interface IGetUserAuthInfoRequest extends Request {
    user: any // or any other type
}

export const protectAuth = async (request: IAuthRequest & IRequestUser, response: Response, next: NextFunction): Promise<any> => {
    let token;
    
    // Check to see if the authorization header starts with Bearer
    if(request.headers.authorization && request.headers.authorization.includes("Bearer")) {
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

export const isUserModerator = async (request: Request & IGetUserAuthInfoRequest, response: Response, next: NextFunction) => {
    try {

        const currentUser = await User.findById(request.user._id);
        
        if(currentUser.role !== 'moderator') {
            return next(new UnauthorizedError("You are unauthorized to perform this action - only moderators are allowed", StatusCodes.UNAUTHORIZED))
        }

        else {
            return next();
        }


    } 
    
    catch(error: any) {

        if(error) {
            return next(new UnauthorizedError(error, StatusCodes.UNAUTHORIZED))
        }

    }


}

export const isUserAdmin = async (request: Request & IGetUserAuthInfoRequest, response, next) => {
    try {

        const currentUser = await User.findById(request.user._id);
        
        if(currentUser.role !== 'admin') {
            return next(new UnauthorizedError("You are unauthorized to perform this action - only moderators are allowed", StatusCodes.UNAUTHORIZED))
        }

        else {
            return next();
        }
    } 
    
    catch(error: any) {

        if(error) {
            return next(new UnauthorizedError(error, StatusCodes.UNAUTHORIZED))
        }

    }
}

export const isUserOrganiser = async (request, response, next) => {

}