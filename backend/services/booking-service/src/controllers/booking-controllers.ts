import { StatusCodes } from 'http-status-codes';
import { NextFunction } from 'express';
import { Booking } from "../model/booking-model"

export const fetchAllBookings = async (request: any, response: any, next: NextFunction): Promise<any> => {
    
}

export const fetchUserBookings = async (request: any, response: any, next: NextFunction): Promise<any> => {
    const {userId} = request.params;
    const userBookings = await Booking.find({userId});

    if(!userBookings) {

    }

}

export const fetchSingleBookingByID = async (request: any, response: any, next: NextFunction): Promise<any> => {

}

export const createBooking = async (request: any, response: any, next: NextFunction): Promise<any> => {
    const {user, event, tickets} = request.body;
    const booking = await Booking.create({user, event, tickets});

    await booking.save();

    return response.status(StatusCodes.CREATED).json({success: true,  booking})
}

export const editBookingDetails = async (request: any, response: any, next: NextFunction): Promise<any> => {
    
}