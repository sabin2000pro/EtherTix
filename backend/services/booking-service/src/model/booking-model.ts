import mongoose from 'mongoose';
import { IBookingDocument } from '../interfaces/booking-interface';

const BookingSchema = new mongoose.Schema<IBookingDocument>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please specify the User ID that belongs to this booking"]
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: [true, "Please specify the event ID that this booking belongs to"]
    },

    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: [true, "Please specify the Ticket IDs that this booking belongs to"]
    }],

    totalPrice: {
        type: Number,
        default: 0.0,
        required: [true, "Please specify the total price for this booking"]
    }

}, {timestamps: true })

const Booking = mongoose.model("Booking", BookingSchema);
export {Booking} // Create the model and export it