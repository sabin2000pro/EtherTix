import express, {Router} from 'express';
import { fetchEventTicket, fetchAllTickets, createNewTicket, fetchTicketByID, editTicketByID, deleteTicketByID, deleteAllTickets, fetchStandardTickets, fetchPremiumTickets } from '../controllers/ticket-controller';

export const ticketRouter: Router = express.Router();

ticketRouter.route('/').get(fetchAllTickets as any).post(createNewTicket as any).delete(deleteAllTickets as any)
ticketRouter.route('/:id').get(fetchTicketByID as any).put(editTicketByID as any).delete(deleteTicketByID as any)

ticketRouter.route('/standard-tickets').get(fetchStandardTickets as any);
ticketRouter.route('/premium-tickets').get(fetchPremiumTickets as any);

ticketRouter.route('/event-tickets/:eventID').get(fetchEventTicket as any);