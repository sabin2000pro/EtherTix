import express, {Router} from 'express';
import { fetchAllTickets, createNewTicket, fetchTicketByID, editTicketByID, deleteTicketByID, deleteAllTickets, fetchBasicTickets } from '../controllers/ticket-controller';

export const ticketRouter: Router = express.Router();

ticketRouter.route('/').get(fetchAllTickets as any).post(createNewTicket as any).delete(deleteAllTickets as any)
ticketRouter.route('/:id').get(fetchTicketByID as any).put(editTicketByID as any).delete(deleteTicketByID as any)