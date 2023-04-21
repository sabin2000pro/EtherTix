import mongoose from 'mongoose';

export interface IBookingDocument {
    user: mongoose.Schema.Types.ObjectId,
    event: mongoose.Schema.Types.ObjectId,
    tickets: mongoose.Schema.Types.ObjectId,
    totalPrice: Number
}