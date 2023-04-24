import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { NextFunction } from 'express';
import { Booking } from "../model/booking-model"
import { ErrorResponse } from '../utils/error-response';

export const fetchAllBookings = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
    
})

export const fetchUserBookings = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
    const {userId} = request.params;
    const userBookings = await Booking.find({userId});

    if(!userBookings) {

    }

})

export const fetchSingleBookingByID = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
    const bookingID = request.params.bookingId;
    const currentBooking = await Booking.findById(bookingID);

    if(!currentBooking) {
        return next(new ErrorResponse(`No booking found with that ID`, StatusCodes.BAD_REQUEST));
    }

    return response.status(StatusCodes.OK).json({success: true, currentBooking});
})

export const createBooking = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
    const {user, event, tickets} = request.body;
    const booking = await Booking.create({user, event, tickets});

    await booking.save();

    return response.status(StatusCodes.CREATED).json({success: true,  booking})
})

export const editBookingDetails = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
    const bookingFieldsToUpdate = {guests: request.body.guests, title: request.body.title, phoneNumber: request.body.phoneNumber, emailAddress: request.body.emailAddress }
    const bookingId = request.params.bookingId;

    let booking = await Booking.findById(bookingId)

    if(!booking) {
        return next(new ErrorResponse(`No booking with that ID found`, StatusCodes.BAD_REQUEST));
    }

    booking = await Booking.findByIdAndUpdate(bookingId, bookingFieldsToUpdate, {new: true, runValidators: true});
    await booking.save();

    return response.status(StatusCodes.OK).json({success: true, message: "Booking details updated", booking});
})

export const cancelUserBooking = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
   const {bookingId, userId} = request.params;
   const currentBooking = await Booking.findOneAndDelete({_id: bookingId, userId});

   if(!currentBooking) {

   }

})