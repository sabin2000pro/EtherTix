import { StatusCodes } from 'http-status-codes';
import { NotFoundError, BadRequestError } from '../middlewares/error-handler';
import { NextFunction, Request, Response } from 'express';
import { Event } from "../models/event-model";

export const fetchAllEvents = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {
        const events = await Event.find()
        return response.status(200).json(events);
    } 
    
    catch(error) {

        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
        }

    }


}

export const getEventCount = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {

        const events = await Event.countDocuments({});
        return response.status(200).json({success: true, count: events});
    } 
    
    catch(error) {   

        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
        }
    }


}

export const fetchSingleEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
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

export const createNewEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
    try {    

    }    
    
    catch(error) {
        
        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST))
        }
    }

}

export const editEventByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

    }
    
    catch(error) {

    }

}

export const deleteEvents = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

    }
    
    catch(error) {

    }
}

export const deleteEventByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

    }
    
    catch(error) {

    }


}

export const uploadEventPhoto = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
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

    }

}


export const fetchEventsWithinRadius = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

    }
    
    catch(error) {

    }

}

export const likeEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    let eventId = request.params.eventId;
    const event = await Event.findById(eventId);
    let eventLikes = event.likes;

    if(!event) {
        return response.status(404).json({ msg: 'Event not found with that ID' });
    }

    // Increment the number of likes for the event
    eventLikes += 1 as any;
    await event.save();
    
    return response.status(200).json({success: true, likes: eventLikes});

}

export const dislikeEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
    let eventId = request.params.eventId;
    const event = await Event.findById(eventId);
    let currentLikes = event.likes;

    if(currentLikes < event.likes) {
       // currentLikes -=1 as unknown as any;
    }

    if(!event) {
        return response.status(404).json({ msg: 'Event not found with that ID' });
    }


}

export const followEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

export const unfollowEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}