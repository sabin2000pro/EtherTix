import { NotFoundError, BadRequestError } from '../middleware/error-handler';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../models/ticket-model';
import asyncHandler from 'express-async-handler'

// @desc      Fetch All Tickets
// @route     GET /api/v1/tickets
// @access    Private (Authorization Token Required)

export const fetchAllTickets = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any | Response> => {

   try {
        
        const tickets = await Ticket.find()
        return response.status(StatusCodes.OK).json({success: true, data: tickets, sentAt: new Date(Date.now()  )});

   } 
   
   catch(error: any) {

      if(error) {
        return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
      }

   }


})

// @desc      Get Event Ticket By ID
// @route     GET /api/v1/tickets/:id
// @access    Private (Authorization Token Required)

export const getEventTicketById = async (request: any, response: any, next: NextFunction): Promise<any> => {

  try {

      const id = request.params.id;
      const ticket = await Ticket.findById(id)

      if(!ticket) {
         return next(new NotFoundError("Ticket with that ID not found", 404))
      }

      return response.status(StatusCodes.OK).json({success: true, ticket, sentAt: new Date(Date.now( ))})
  } 
  
  catch(error: any) {

     if(error) {
        return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
     }

  }

}

// @desc      Create New Event Ticket
// @route     POST /api/v1/tickets/:id
// @access    Private (JWT Authorization Token Required)

export const createNewTicket = async (request: any, response: any, next: NextFunction): Promise<any> => {

   try {
        const event = request.body.event;

        if(!event) {
           return next(new NotFoundError("Event with that ID not found", StatusCodes.NOT_FOUND));
        }

        const ticketData = request.body;
        const ticket = new Ticket(ticketData, event);

        await ticket.save();
        return response.status(StatusCodes.CREATED).json({success: true, ticket});
   } 
   
   catch(error: any) {
      if(error) {
        return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
      }
   }


}

// @desc      Edit Ticket By ID
// @route     POST /api/v1/tickets/:ticketId
// @access    Private (JWT Authorization Token Required)

export const editTicketByID = async (request: any, response: any, next: NextFunction): Promise<any> => {
   try {
      const id = request.params.id;
      let ticket = await Ticket.findById(id);

      if(!ticket) {

      }

      
   } 
   
   catch(error) {

   }


}

// @desc      Delete All Tickets For A specific event
// @route     POST /api/v1/events/:eventId/tickets
// @access    Private (JWT Authorization Token Required)

export const deleteAllTickets = async (request: any, response: any, next: NextFunction): Promise<any> => {
  try {
      await Ticket.deleteMany();
     return response.status(204).json({success: true, data: {}, message: "Tickets Deleted"});
  }    
  
  catch(error) {
   
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