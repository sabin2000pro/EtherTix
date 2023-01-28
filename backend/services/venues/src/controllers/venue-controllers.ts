import { Venue } from '../models/venue-model';
import {Request, Response, NextFunction} from 'express';


// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const fetchAllVenues = async (request: any, response: any, next: NextFunction): Promise<any> => {
  try {
     // @todo
  }
  
  catch(error: any) {

  }


}

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const fetchVenueByID = async (request: any, response: any, next: NextFunction): Promise<any> => {
  const venueId = request.params.venueId;
}

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const createVenue = async (request: any, response: any, next: NextFunction): Promise<any> => {
  
}

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const editVenueByID = async (request: any, response: any, next: NextFunction): Promise<any> => {
  const venueId = request.params.venueId;
}

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const deleteVenueByID = async (request: any, response: any, next: NextFunction): Promise<any> => {
  const venueId = request.params.venueId;
}

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const deleteAllVenues = async (request: any, response: any, next: NextFunction): Promise<any> => {

}

// @desc      Fetch All Event Venues Within Radius
// @route     GET /api/v1/events/:venueId/:postalcode/:radius
// @access    Private (Authorization Token Required)

export const fetchVenuesWithinRadius = async (request: any, response: any, next: NextFunction): Promise<any> => {
}

// @desc      Upload Venue Photo
// @route     PUT /api/v1/venues/upload
// @access    Private (Authorization Token Required)

export const uploadVenuePhoto = async (request: any, response: any, next: NextFunction): Promise<any> => {

}
