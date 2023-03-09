import axios from 'axios';
import {Response, NextFunction} from 'express';

export const fetchEventTickets = async (request, response, next): Promise<any> => {
 // Basically what we need to do to fetch the event tickets from the database is to get the currently logged in user by passing the authentication header along with the JSON web token
}

export const createEventTicket = async(request,response,next): Promise<any> => {

}

export const editEventTicket = async(request,response,next): Promise<any> => {
    
}

export const deleteEventTicket = async(request,response,next): Promise<any> => {
    
}