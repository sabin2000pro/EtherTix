import {Router } from 'express';
import express from "express";
import { fetchAllTickets, createNewTicket, getEventTicketById, editTicketByID, deleteTicketByID, deleteAllTickets } from '../controllers/ticket-controller';

export const ticketRouter: Router = express.Router();

ticketRouter.route('/').get(fetchAllTickets as any).post(createNewTicket as any).delete(deleteAllTickets as any)
ticketRouter.route('/:id').get(getEventTicketById as any).put(editTicketByID as any).delete(deleteTicketByID as any)