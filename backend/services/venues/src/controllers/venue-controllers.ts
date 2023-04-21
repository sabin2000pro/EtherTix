import { Venue } from '../models/venue-model';
import {NextFunction} from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { ErrorResponse } from '../utils/error-response';

// @desc      Fetch All Venues
// @route     GET /api/v1/venues
// @route     GET /api/v1/venues
// @access    Private (Authorization Token Required)

export const fetchAllVenues = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
  let currQueryString;
  const query = {...request.query};
  const searchKeyword = request.query.searchKeyword;
})

export const fetchTotalVenues = asyncHandler(async(request: any, response: any, next: NextFunction): Promise<any> => {
  const totalVenues = await Venue.countDocuments({});

  if(totalVenues === 0) {
    return next(new ErrorResponse(`No venues found`, StatusCodes.BAD_REQUEST));
  }


})

export const fetchVenueByID = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {

      const venueId = request.params.venueId;
      const venue = await Venue.findById(venueId);

      if(!venue) {
        return next(new ErrorResponse(`No venue with that ID found`, StatusCodes.BAD_REQUEST));
      }

      return response.status(StatusCodes.OK).json({success: true, venue});
  
})

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const createVenue = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
  
})

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
  let currentVenue = await Venue.findById(venueId);

  if(!currentVenue) {

  }


}

// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)

export const deleteAllVenues = async (request: any, response: any, next: NextFunction): Promise<any> => {
  await Venue.deleteMany();
  return response.status(StatusCodes.NO_CONTENT).json({success: true, message: "Venues Deleted"})
}

// @desc      Fetch All Event Venues Within Radius
// @route     GET /api/v1/venues/:venueId/:postalCode/:radius
// @access    Public (No Authorization Token Required)

export const fetchVenuesWithinRadius = async (request: any, response: any, next: NextFunction): Promise<any> => {
  
}

// @desc      Upload Venue Photo
// @route     PUT /api/v1/venues/:id/upload-photo
// @access    Private (Authorization Token Required)

export const uploadVenuePhoto = async (request: any, response: any, next: NextFunction): Promise<any> => {
  const file = request.file.files;
}

export const editVenueDates = async (request: any, response: any, next: NextFunction): Promise<any> => {
  
}