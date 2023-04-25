import rateLimit from 'express-rate-limit';
import { BOOKINGS_RATE_LIMIT_MINUTES } from '../constants/booking-constants';

export const bookingsRateLimiter = rateLimit({
	windowMs: BOOKINGS_RATE_LIMIT_MINUTES,
	max: 30, // Limit each IP to 30 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
