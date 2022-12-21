import { Response, Request, Router } from 'express';
import express from "express";
import { fetchAllTickets } from '../controllers/ticket-controller';

export const ticketRouter: Router = express.Router({mergeParams: true});

ticketRouter.route('/').get(fetchAllTickets as any);