import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import asyncHandler from 'express-async-handler';
import {Response, NextFunction} from 'express';

export const fetchUserBookedEvents = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
        const user  = await axios.get(`http://ethertix-auth-service:5299/api/v1/auth/me`, {headers: {Authorization: request.headers.authorization}}) // First get the currently logged in user, create a user object to be used in the GET events service request
        const data = user.data;
    
        console.log(data);

        return response.status(StatusCodes.OK).json({success: true, message: "User booked events here"});

    } 
)

export const createNewEvent = asyncHandler(async (request, response, next): Promise<any> => {

})

export const fetchTicketEventDetails = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
    const ticketEventDetails = await axios.get(`http://tickets-service:5303/api/tickets/${request.params.id}`, {headers: {Authorization: request.headers.authorization}})
    const ticketData = ticketEventDetails.data;

    const eventDetails = await axios.get(`http://events-service:5301/api/v1/events/${ticketData.ticket.event}`, {headers: {Authorization: request.headers.authorization}});
    const eventData = eventDetails.data;

    console.log(`Ticket Data : `, ticketData);

    return response.status(StatusCodes.OK).json({success: true, data: ticketData});

})

export const editEventDetails = asyncHandler(async (request, response, next): Promise<any> => {
    
})

export const fetchUsers = asyncHandler(async (request: any, response: Response, next: NextFunction) => {

})

export const fetchEventTicketDetails = asyncHandler(async (request: any, response: any, next: NextFunction) => {
    return response.status(StatusCodes.OK).json({success: true, message: 'Event Ticket Details Here'});
})