import Event from '../models/event-model';
import mongoose from "mongoose";

declare namespace Express {
    export interface Request {
        user: any;
        body: any;
        session: any
    }

  }