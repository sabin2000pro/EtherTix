import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../models/ticket-model';

declare namespace Express {
    export interface Request {
        user: any;
        body: any;
        session: any
    }

  }

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const getAllEventTickets = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}

// @desc      Get Event Ticket By ID
// @route     GET /api/v1/courses
// @route     GET /api/v1/tickets/:ticketId
// @access    Public

export const getEventTicketById = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const ticketId = request.params.ticketId;
}

// @desc      Create New Event Ticket
// @route     POST /api/v1/events/:eventId/tickets
// @access    Private (JWT Authorization Token Required)

export const createNewEventTicket = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const eventId = request.params.eventId;
    const body = request.body;
}

// @desc      Edit Ticket By ID
// @route     POST /api/v1/tickets/:ticketId
// @access    Private (JWT Authorization Token Required)

export const editTicketByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;
    let ticket = await Ticket.findById(id);

    if(!ticket) {

    }


}

// @desc      Delete All Tickets For A specific event
// @route     POST /api/v1/events/:eventId/tickets
// @access    Private (JWT Authorization Token Required)

export const deleteAllTickets = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const eventId = request.params.ticketId;
}

// @desc      Remove An Event Ticket By ID
// @route     POST /api/v1/events/:eventId/tickets
// @access    Private (JWT Authorization Token Required)

export const deleteTicketByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const ticketId = request.params.id;
}

export const uploadEventTicketPhoto = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  
}