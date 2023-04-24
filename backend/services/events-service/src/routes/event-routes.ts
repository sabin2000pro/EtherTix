import { EVENTS_RATE_LIMIT_MINUTES } from './../constants/event-constants';
import express, { Router } from "express";
import { fetchAllEvents, likeEvent, unlikeEvent, fetchSingleEvent, createNewEvent, editEventByID, deleteEvents, deleteEventByID } from "../controllers/event-controller";
import rateLimit from 'express-rate-limit';

export const eventRouter: Router = express.Router();

const eventsRateLimiter = rateLimit({
	windowMs: EVENTS_RATE_LIMIT_MINUTES,
	max: 30, // Limit each IP to 30 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

eventRouter.route('/').get(eventsRateLimiter as any, fetchAllEvents as any).post(eventsRateLimiter as any, createNewEvent as any).delete(deleteEvents as any);
eventRouter.route('/:eventId').get(fetchSingleEvent as any).put(editEventByID).delete(deleteEventByID as any);
eventRouter.route('/:eventId/like-event').put(likeEvent as any);
eventRouter.route('/:eventId/unlike-event').delete(unlikeEvent as any);

eventRouter.route('/:eventId/upload-photo').put();
eventRouter.route('/trending').get()