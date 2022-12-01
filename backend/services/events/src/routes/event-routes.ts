import express, { Router } from "express";
import { fetchAllEvents, fetchSingleEvent, createNewEvent, editEventByID, deleteEvents } from "../controllers/event-controller";

export const eventRouter: Router = express.Router({mergeParams: true});

eventRouter.route('/').get(fetchAllEvents).post(createNewEvent).delete(deleteEvents);
eventRouter.route('/:id').get(fetchSingleEvent).put(editEventByID);