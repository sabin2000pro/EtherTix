import mongoose from 'mongoose';
import { IBookingDocument } from '../types/booking-types';

const BookingSchema = new mongoose.Schema<IBookingDocument>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please specify the User ID that belongs to this booking"]
    },

    event: {

    }
})

const Booking = mongoose.model("Booking", BookingSchema);
export {Booking}