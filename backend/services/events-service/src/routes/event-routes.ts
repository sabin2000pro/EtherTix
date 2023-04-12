import express, { Router } from "express";
import { fetchAllEvents, fetchSingleEvent, createNewEvent, editEventByID, deleteEvents, deleteEventByID } from "../controllers/event-controller";

export const eventRouter: Router = express.Router();

eventRouter.route('/').get(fetchAllEvents as any).post(createNewEvent).delete(deleteEvents as any);
eventRouter.route('/:id').get(fetchSingleEvent as any).put(editEventByID).delete(deleteEventByID as any);