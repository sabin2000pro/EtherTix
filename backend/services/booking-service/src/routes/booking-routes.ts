import express, {Router} from 'express';
import { createBooking, fetchAllBookings, fetchSingleBookingByID, deleteBookings, editBookingDetails } from '../controllers/booking-controllers';
import { bookingsRateLimiter } from '../utils/rate-limiter';

export const bookingRouter: Router = express.Router();

bookingRouter.route('/').get(bookingsRateLimiter, fetchAllBookings).post(bookingsRateLimiter, createBooking).delete(bookingsRateLimiter, deleteBookings);
bookingRouter.route('/:id').get(fetchSingleBookingByID).put(bookingsRateLimiter, editBookingDetails)