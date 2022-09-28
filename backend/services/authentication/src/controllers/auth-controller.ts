import { NextFunction, Request, Response } from 'express';
import User from '../models/user-model';

declare namespace Express {
    export interface Request {

        user: any;
        body: any;
        session: any
    }
  }
  

export const registerUser = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

export const loginUser = async (request)