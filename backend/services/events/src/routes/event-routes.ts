import express, { Router } from "express";
import { fetchAllEvents, fetchSingleEvent, createNewEvent, editEventByID, deleteEvents, likeEvent, dislikeEvent, followEvent } from "../controllers/event-controller";

export const eventRouter: Router = express.Router({mergeParams: true});

eventRouter.route('/').get(fetchAllEvents as any).post(createNewEvent).delete(deleteEvents);
eventRouter.route('/:eventId').get(fetchSingleEvent as any).put(editEventByID);

eventRouter.route('/:eventId/like').post(likeEvent as any);
eventRouter.route('/:eventId/dislike').post(dislikeEvent as any);
eventRouter.route('/:eventId/follow-event').post(followEvent as any);