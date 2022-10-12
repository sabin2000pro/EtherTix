import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../models/ticket-model';

declare namespace Express {
    export interface Request {
        user: any;
        body: any;
        session: any
    }

  }

// @desc      Get courses
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Public

export const getAllEventTickets = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}

// @desc      Get courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/tickets/:ticketId
// @access    Public

export const getEventTicketById = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}

// @desc      Add course
// @route     POST /api/v1/events/:eventId/tickets
// @access    Private (JWT Authorization Token Required)

export const createNewEventTicket = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}

export const editTicketByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}

export const deleteAllTickets = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}

export const deleteTicketByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}