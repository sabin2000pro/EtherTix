import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../models/ticket-model';
import asyncHandler from 'express-async-handler'

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

export const getAllEventTickets = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any| Response> => {
    const totalTickets = await Ticket.countDocuments({});
    const tickets = await Ticket.find();

    return response.status(StatusCodes.OK).json({success: true, data: tickets, totalTickets, sentAt: new Date(Date.now( ))});
})

// @desc      Get Event Ticket By ID
// @route     GET /api/v1/courses
// @route     GET /api/v1/tickets/:ticketId
// @access    Public

export const getEventTicketById = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const ticketId = request.params.ticketId;
    return response.status(StatusCodes.OK).json({success: true, message: "All Event Tickets Here", sentAt: new Date(Date.now( ))})
}

// @desc      Create New Event Ticket
// @route     POST /api/v1/events/:eventId/tickets
// @access    Private (JWT Authorization Token Required)

export const createNewEventTicket = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Edit Ticket By ID
// @route     POST /api/v1/tickets/:ticketId
// @access    Private (JWT Authorization Token Required)

export const editTicketByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const ticketId = request.params.ticketId;
}

// @desc      Delete All Tickets For A specific event
// @route     POST /api/v1/events/:eventId/tickets
// @access    Private (JWT Authorization Token Required)

export const deleteAllTickets = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Remove An Event Ticket By ID
// @route     POST /api/v1/events/:eventId/tickets
// @access    Private (JWT Authorization Token Required)

export const deleteTicketByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}