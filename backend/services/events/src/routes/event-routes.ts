import express, { Router } from "express";
import { fetchAllEvents } from '../controllers/event-controller';

const eventRouter: Router = express.Router();
eventRouter.route("/events").get(fetchAllEvents as any);

export default eventRouter;