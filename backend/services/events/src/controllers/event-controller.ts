import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../middlewares/error-handler';
import { NextFunction, Request, Response } from 'express';
import { Event } from "../models/event-model";

export const fetchAllEvents = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
        const events = await Event.find().populate({path: 'ticket'})
        return response.status(200).json(events);
}

export const getEventCount = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

export const fetchSingleEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {

        const eventId = request.params.eventId;
        let event = await Event.findById(eventId).populate('ticket'); // Fetch the event and populate it with the ticket data

        if(!eventId) {
            return next(new NotFoundError("Event with that ID not found", StatusCodes.NOT_FOUND));
        }

        if(!event) {
            return next(new NotFoundError("Event with that ID not found", StatusCodes.NOT_FOUND)); 
        }


    }
    
    catch(error) {

    }
    
    finally {

    }


}

export const createNewEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {

    }
    
    catch(error) {

    }

    finally {

    }


}

export const editEventByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {

    }
    
    catch(error) {

    }


    finally {

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


    finally {

    }

}

export const uploadEventPhoto = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        // API Code here to upload a photo for an event using multer or express file upload
    }
    
    catch(error) {

    }

    finally {

    }


}

export const fetchTrendingEvents = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
    try {

    }
    
    catch(error) {

    }

    finally {

    }

}


export const fetchEventsWithinRadius = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

    }
    
    catch(error) {

    }

    finally {

    }


}

export const likeEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

export const dislikeEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

export const followEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

export const unfollowEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

export const searchEvent = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    let matchingEvents;

    const searchQuery = request.query.search;
    const searchRegex = new RegExp(searchQuery as any, 'i');
    const events = await Event.find();

    matchingEvents = events.filter(event => event.name.match(searchRegex));

    return response.status(200).json(matchingEvents);
}
