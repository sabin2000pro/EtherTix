import mongoose from 'mongoose';

export interface IBookingDocument {
    userId: mongoose.Schema.Types.ObjectId,
    eventId: mongoose.Schema.Types.ObjectId,
    ticketIds: mongoose.Schema.Types.ObjectId,
    totalPrice: Number,
    title: String,
    guests: number,
    phoneNumber: string,
    bookingDate: Date,
    createdAt: Date,
    emailAddress: string,

    cardRequired: boolean,
    isCancelled: boolean
}