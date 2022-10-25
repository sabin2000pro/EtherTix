import { NextFunction, Request, Response } from 'express';
declare namespace Express {
    interface Request {
        user: any;
        body: any;
        session: any;
        files: any;
    }
}
export declare const fetchAllEvents: (request: Request, response: Response, next: NextFunction) => Promise<any>;
export declare const fetchSingleEvent: (request: Request, response: Response, next: NextFunction) => Promise<any>;
export declare const createNewEvent: (request: Request, response: Response, next: NextFunction) => Promise<any>;
export declare const updateEventByID: (request: Request, response: Response, next: NextFunction) => Promise<any>;
export declare const deleteEventByID: (request: Request, response: Response, next: NextFunction) => Promise<any>;
export declare const deleteAllEvents: (request: Request, response: Response, next: NextFunction) => Promise<any>;
export declare const uploadEventPhoto: (request: Express.Request, response: Response, next: NextFunction) => Promise<any>;
export {};
