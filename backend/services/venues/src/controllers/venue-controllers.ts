import { Venue } from '../models/venue-model';
import {Request, Response, NextFunction} from 'express';

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

export const fetchAllVenues = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const fetchVenueByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const createVenue = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const editVenueByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const deleteVenueByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const deleteAllVenues = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const fetchVenuesWithinRadius = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const uploadVenuePhoto = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Fetch Trending Venues That Are Popular
// @route     GET /api/v1/venues/trending
// @access    Public (No Authorization Token Required)

export const fetchTrendingVenues = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}