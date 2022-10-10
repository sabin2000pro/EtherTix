import { NextFunction, Request, Response } from "express";

declare namespace Express {
    export interface Request {

        user: any;
        body: any;
        session: any
        headers: any
        authorization: any
    }
  }
  

export const protectAuth = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    let token;

    if(!token) {

    }

    
}