import express, { Router } from "express";
import { fetchAllEvents, likeEvent, unlikeEvent, fetchSingleEvent, createNewEvent, editEventByID, deleteEvents, deleteEventByID } from "../controllers/event-controller";

export const eventRouter: Router = express.Router();

eventRouter.route('/').get(fetchAllEvents as any).post(createNewEvent).delete(deleteEvents as any);
eventRouter.route('/:eventId').get(fetchSingleEvent as any).put(editEventByID).delete(deleteEventByID as any);
eventRouter.route('/:eventId/like-event').put(likeEvent as any);
eventRouter.route('/:eventId/unlike-event').delete(unlikeEvent as any);