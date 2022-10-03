import { NextFunction, Request, Response } from 'express';
import {Event} from '../models/event-model';
import mongoose from "mongoose";
import {StatusCodes} from "http-status-codes";

declare namespace Express {
    export interface Request {
        user: any;
        body: any;
        session: any
        files: any;
    }

  }

export const fetchAllEvents = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "All Events Here"});
}

export const fetchSingleEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;
    return response.status(200).json({success: true, message: "All Events Here"});
}

export const createNewEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {} = request.body;
    return response.status(200).json({success: true, message: "All Events Here"});
}

export const updateEventByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "All Events Here"});
}

export const deleteEventByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "All Events Here"});
}

export const deleteAllEvents = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "All Events Here"});
}

export const uploadEventPhoto = async (request: Express.Request, response: Response, next: NextFunction): Promise<any> => {
    const file = request.files.file;
    return response.status(200).json({success: true, message: "Upload Event Photo Here"});
}