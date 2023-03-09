import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import asyncHandler from 'express-async-handler';
import {Response, NextFunction} from 'express';

export const fetchUserBookedEvents = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {

    try {
         // First get the currently logged in user, create a user object to be used in the GET events service request
        const user  = await axios.get(`http://ethertix-auth-service:5299/api/v1/auth/me`, {headers: {Authorization: request.headers.authorization}})
        const data = user.data;
    
        console.log(data);

        return response.status(StatusCodes.OK).json({success: true, message: "User booked events here"});

    
    } 
    
   catch(error) {

     if(error) {
        return next(error);
     }

   }


})

export const createNewEvent = asyncHandler(async (request, response, next): Promise<any> => {

})

export const editEventDetails = asyncHandler(async (request, response, next): Promise<any> => {
    
})

export const fetchUsers = asyncHandler(async (request: any, response: Response, next: NextFunction) => {

})

export const fetchEventTicketDetails = asyncHandler(async (request: any, response: any, next: NextFunction) => {
    return response.status(StatusCodes.OK).json({success: true, message: 'Event Ticket Details Here'});
})