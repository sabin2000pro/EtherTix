import { StatusCodes } from 'http-status-codes';
import { NotFoundError, BadRequestError } from '../middlewares/error-handler';
import { NextFunction, Request, Response } from 'express';
import { Event } from "../models/event-model";

export const fetchAllEvents = async (request: any, response: any, next: NextFunction): Promise<any> => {

    try {

        const events = await Event.find()
        return response.status(StatusCodes.OK).json(events);
    } 
    
    catch(error) {

        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
        }

    }


}

export const getEventCount = async (request: any, response: any, next: NextFunction): Promise<any> => {

    try {
        const events = await Event.countDocuments({});
        return response.status(StatusCodes.OK).json({success: true, count: events});
    } 
    
    catch(error) {   

        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
        }

    }


}

export const fetchSingleEvent = async (request: any, response: any, next: NextFunction): Promise<any> => {
    try {

        const eventId = request.params.eventId;
        let event = await Event.findById(eventId)

        if(!eventId) {
            return next(new NotFoundError("Event with that ID not found", StatusCodes.NOT_FOUND));
        }

        if(!event) {
            return next(new NotFoundError("Event with that ID not found", StatusCodes.NOT_FOUND)); 
        }

        return response.status(StatusCodes.OK).json({success: true, data: event});


    }
    
    catch(error) {

        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST))
        }

    }


}

export const createNewEvent = async (request: any, response: any, next: NextFunction): Promise<any> => {
    
    try {    
        // @TODO
    }    
    
    catch(error) {
        
        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST))
        }

    }

}

export const editEventByID = async (request: any, response: any, next: NextFunction): Promise<any> => {

    try {
        const id = request.params.id;
        let event = await Event.findById(id);

        if(!event) {

        }


    }
    
    catch(error) {
        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
        }
    }

}

export const deleteEvents = async (request: any, response: any, next: NextFunction): Promise<any> => {

    try {

    }
    
    catch(error) {

    }

}

export const deleteEventByID = async (request: any, response: any, next: NextFunction): Promise<any> => {

    try {

    }
    
    catch(error) {

        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
        }
    }


}

export const uploadEventPhoto = async (request: any, response: any, next: NextFunction): Promise<any> => {

    try {
        // API Code here to upload a photo for an event using multer or express file upload
    }
    
    catch(error) {

    }

}

export const fetchTrendingEvents = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
    try {
    
    }
    
    catch(error) {
        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
        }
    }

}


export const fetchEventsWithinRadius = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

    }
    
    catch(error) {

    }

}

export const likeEvent = async (request: any, response: any, next: NextFunction): Promise<any> => {
    try {

    } 
    
    catch(error) {

        if(error) {
            return next(error);
        }
    }


}

export const dislikeEvent = async (request: any, response: any, next: NextFunction): Promise<any> => {
    
   try {
       
   } 
   
   catch(error) {
    
    if(error) {
        return next(error);
    }

   }
 

}

export const followEvent = async (request: any, response: any, next: NextFunction): Promise<any> => {

}

export const unfollowEvent = async (request: any, response: any, next: NextFunction): Promise<any> => {

}