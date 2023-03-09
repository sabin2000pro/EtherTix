import { isValidObjectId } from 'mongoose';
import { ErrorResponse } from '../utils/error-response';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { Event } from "../models/event-model";
import asyncHandler from 'express-async-handler';

export const fetchAllEvents = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
    const events = await Event.find();

    if(!events) {
      return next(new ErrorResponse(`No events found. Please try again`, StatusCodes.BAD_REQUEST));
    }

    return response.status(StatusCodes.OK).json({success: true, events});
})

export const fetchSingleEvent = async (request: any, response: any, next: NextFunction): Promise<any> => {

        const id = request.params.id;
        const event = await Event.findById(id)

        if(!event) {
           return next(new ErrorResponse(`No event with that ID : ${id} found on the server-side. Please try again later`, StatusCodes.BAD_REQUEST));
        }

        return response.status(StatusCodes.OK).json({success: true, event});

    }

export const createNewEvent = async (request: any, response: any, next: NextFunction): Promise<any> => {

        request.body.user = request.user.id;
        const {name, summary, description, startAt, endsAt, } = request.body;
        const event = await Event.create(request.body);
        await event.save();

        return response.status(StatusCodes.CREATED).json({success: true, event});

    }    

export const editEventByID = async (request: any, response: any, next: NextFunction): Promise<any> => {

        const id = request.params.id;
        let event = await Event.findById(id);

        if(!event) {
            return next(new ErrorResponse(`No event with that ID : ${id} found on the server-side. Please try again later`, StatusCodes.BAD_REQUEST));
        }

        event = await Event.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});
        return response.status(StatusCodes.OK).json({success: true, event});

    }
    

export const deleteEvents = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {


})

export const deleteEventByID = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {

   
})

export const uploadEventPhoto = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {

})

export const fetchTrendingEvents = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
    


})


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