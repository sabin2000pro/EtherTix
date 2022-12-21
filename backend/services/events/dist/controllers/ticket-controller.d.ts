/// <reference types="qs" />
import { NextFunction, Request, Response } from 'express';
export declare const fetchAllTickets: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const getEventTicketById: (request: Request, response: Response, next: NextFunction) => Promise<any>;
export declare const createNewTicket: (request: Request, response: Response, next: NextFunction) => Promise<any>;
export declare const editTicketByID: (request: Request, response: Response, next: NextFunction) => Promise<any>;
export declare const deleteAllTickets: (request: Request, response: Response, next: NextFunction) => Promise<any>;
export declare const deleteTicketByID: (request: Request, response: Response, next: NextFunction) => Promise<any>;
export declare const fetchPremiumTickets: (request: Request, response: Response, next: NextFunction) => Promise<any>;
export declare const fetchStandardTickets: (request: Request, response: Response, next: NextFunction) => Promise<any>;
export declare const fetchVipTickets: (request: Request, response: Response, next: NextFunction) => Promise<any>;
export declare const fetchTicketsSoldLastThirtyDays: (request: Request, response: Response, next: NextFunction) => Promise<any>;
