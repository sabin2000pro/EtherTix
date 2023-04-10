import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import asyncHandler from 'express-async-handler';
import {NextFunction} from 'express';

export const fetchEventTicketDetails = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {

    const eventDetails = await axios.get(`http://events-service:5301/api/v1/events/${request.params.id}`, {headers: {Authorization: request.headers.authorization}});
    const eventData = eventDetails.data;

    console.log(`Event Data : ,`, eventData.event.tickets);

    // const ticketEventDetails = await axios.get(`http://tickets-service:5303/api/v1/tickets/${request.params.id}`, {headers: {Authorization: request.headers.authorization}})
    // const ticketData = ticketEventDetails.data;

    // console.log(`Ticket Data : `, ticketData);

    return response.status(StatusCodes.OK).json({success: true, eventData});

})