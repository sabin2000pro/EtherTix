import mongoose from 'mongoose';
import { IBookingDocument } from '../interfaces/booking-interface';

const BookingSchema = new mongoose.Schema<IBookingDocument>({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please specify the User ID that belongs to this booking"]
    },

    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: [true, "Please specify the event ID that this booking belongs to"]
    },

    ticketIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: [true, "Please specify the Ticket IDs that this booking belongs to"]
    }],

    totalPrice: {
        type: Number,
        default: 0.0,
        required: [true, "Please specify the total price for this booking"]
    },

    title: {
        type: String,
        default: "",
        required: [true, "Please specify your title"],
        enum: ["Mr", "Mrs", "Miss"]
    },

    guests: {
        type: Number,
        default: 0,
        required: [true, "Please specify how many guests are part of this booking"]
     },

    phoneNumber: {
        type: String,
        required: [true, "Please specify your phone number belonging to this booking"]
    },

    bookingDate: {
        type: Date,
        default: Date.now
    },

    emailAddress: {
        type: String,
        default: "",
        required: [true, "Please specify your e-mail address for this booking"]
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

}, {timestamps: true })

const Booking = mongoose.model("Booking", BookingSchema);
export {Booking} // Create the model and export it