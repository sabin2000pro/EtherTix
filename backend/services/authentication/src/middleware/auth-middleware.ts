import { BadRequestError, UnauthorizedError } from './error-handler';
import { NextFunction, Request, Response } from "express";
import { User } from '../models/user-model';
import jwt from "jsonwebtoken";

declare namespace Express {
    export interface Request {

        user: any;
        body: any;
        session: any
        headers: any
        authorization: any
    }
  }
  

export const protectAuth = async (request: Express.Request, response: Response, next: NextFunction): Promise<any> => {
    let token;

    if(request.headers.authorization && request.headers.authorization.includes("Bearer ")) {
         token = request.headers.authorization.split(' ')[1]; // Get the JWT token at the first index after Bearer
    }

    if(!token) {
        return next(new UnauthorizedError("You are not authorized to perform this action", 400));
    }

    try {
        
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        request.user = await User.findById(decoded.id);

        return next();
    } 
    
    catch(error: any) {

        if(error) {
            return next(new UnauthorizedError("You are unauthorized to perform this action", 400));
        }

        
    }

    
}

export const restrictRoleTo = (...roles: any) => {

    return (request: Express.Request, response: Response, next: NextFunction) => {


        // @TODO
        if(!roles.includes(request.user.role)) {

        }

    }
}