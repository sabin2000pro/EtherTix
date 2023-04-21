import mongoose from 'mongoose';

export interface IBookingDocument {
    userId: mongoose.Schema.Types.ObjectId,
    eventId: mongoose.Schema.Types.ObjectId,
    ticketIds: mongoose.Schema.Types.ObjectId,
    totalPrice: Number,
    title: String,
    guests: Number,
    phoneNumber: String,
    bookingDate: Date,
    createdAt: Date,
    emailAddress: String
}