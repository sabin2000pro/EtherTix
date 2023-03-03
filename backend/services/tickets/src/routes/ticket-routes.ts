import express, {Router} from 'express';
import { fetchAllTickets, createNewTicket, getEventTicketById, editTicketByID, deleteTicketByID, deleteAllTickets, fetchTicketEventDetails, fetchBasicTickets } from '../controllers/ticket-controller';

export const ticketRouter: Router = express.Router();

ticketRouter.route('/').get(fetchAllTickets as any).post(createNewTicket as any).delete(deleteAllTickets as any)
ticketRouter.route('/:id').get(getEventTicketById as any).put(editTicketByID as any).delete(deleteTicketByID as any)

ticketRouter.route('/:id/event/details').get(fetchTicketEventDetails as any);
ticketRouter.route('/get/tickets-basic').get(fetchBasicTickets as any);