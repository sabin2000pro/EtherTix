import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../models/ticket-model';
import asyncHandler from 'express-async-handler'
import axios from 'axios'
import { ErrorResponse } from '../utils/error-response';

// @desc      Fetch All Tickets
// @route     GET /api/v1/tickets
// @access    Private (Authorization Token Required



export const fetchAllTickets = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any | Response> => {
        const tickets = await Ticket.find();

        if(!tickets) {
           return next(new ErrorResponse(`No tickets found. Please try again`, StatusCodes.BAD_REQUEST));
        }

        return response.status(StatusCodes.OK).json({success: true, tickets});
   } 
   
)

export const fetchCustomerTickets = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {

   try {
      
      const {customerId} = request.query;
      const tickets = await Ticket.findById({customerId})

      if(!tickets) {
        return next(new ErrorResponse(`No tickets found`, StatusCodes.BAD_REQUEST))
      }

      return response.status(StatusCodes.OK).json({success: true, tickets});

   } 
   
   catch(error) {

         if(error) {
            return next(error);
         }

   }


})

// @desc      Get Event Ticket By ID
// @route     GET /api/v1/tickets/:id
// @access    Private (Authorization Token Required)

export const getEventTicketById = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {

  try {

      const id = request.params.id;
      const ticket = await Ticket.findById(id)

      if(!ticket) {
         return response.status(StatusCodes.NOT_FOUND).json({success: false, })
      }

      return response.status(StatusCodes.OK).json({success: true, ticket})
  } 
  
  catch(error: any) {

     if(error) {
         return next(error);
     }

  }

})

// @desc      Create New Event Ticket
// @route     POST /api/tickets?eventId=....&issuerId=...&venueId=...
// @access    Private (JWT Authorization Token Required)

export const createNewTicket = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {

   try {
         
        const {eventId, issuerId, venueId} = request.query;
        request.body.event = eventId

        request.body.issuer = issuerId;
        request.body.venue = venueId;

        const {name, ticketClass, ticketToken, capacity, quantityPurchase, description, cost, isFree, deliveryMethods, onSaleStatus, confirmationMessage, ticketSold} = request.body;
        const ticket = await Ticket.create({event: eventId, issuer: issuerId, venue: venueId, name, ticketClass, ticketToken, capacity, quantityPurchase, description, cost, isFree, deliveryMethods, onSaleStatus, confirmationMessage, ticketSold});

        await ticket.save();
        return response.status(StatusCodes.CREATED).json({success: true, ticket});
   } 
   
   catch(error: any) {

      if(error) {
          return next(error);
      }


   }

})

// http://localhost:5303/api/tickets/:id/event/details

export const fetchTicketEventDetails = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
   const id = request.params.id;
   const ticket = await Ticket.findById(id);

   let REQUEST_URI = `http://events-service:5301/api/events/${ticket.event}`
   
   const events = await axios.get(REQUEST_URI);
   return response.status(StatusCodes.OK).json({success: true, data: events.data});
})

// @desc      Edit Ticket By ID
// @route     POST /api/v1/tickets/:ticketId
// @access    Private (JWT Authorization Token Required)

export const editTicketByID = async (request: any, response: any, next: NextFunction): Promise<any> => {

   try {

      const id = request.params.id;
      let ticket = await Ticket.findById(id);

      if(!ticket) {
         return next(new ErrorResponse(`No ticket found with that ID`, StatusCodes.BAD_REQUEST));
      }

      ticket = await Ticket.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});
      return response.status(StatusCodes.OK).json({success: true, ticket});

   } 
   
   catch(error) {

      if(error) {
         return next(error);
      }

   }


}

// @desc      Delete All Tickets For A specific event
// @route     POST /api/v1/events/:eventId/tickets
// @access    Private (JWT Authorization Token Required)

export const deleteAllTickets = async (request: any, response: any, next: NextFunction): Promise<any> => {

  try {
      await Ticket.deleteMany();
      return response.status(StatusCodes.NO_CONTENT).json({success: true, data: {}, message: "Tickets Deleted"});
  }    
  
  catch(error) {
      if(error) {
         return next(error);
      }
  }


}

export const deleteTicketByID = async (request: any, response: any, next: NextFunction): Promise<any> => {
    
}

export const fetchPremiumTickets = async (request: any, response: any, next: NextFunction): Promise<any> => {
    
}

export const fetchStandardTickets = async (request: any, response: any, next: NextFunction): Promise<any> => {
    
}

export const fetchVipTickets = async (request: any, response: any, next: NextFunction): Promise<any> => {
    
}

export const fetchTicketsSoldLastThirtyDays = async (request: any, response: any, next: NextFunction): Promise<any> => {
    
}