import express from 'express';
import { fetchUserBookedEvents, createNewEvent, editEventDetails, fetchTicketEventDetails} from '../controllers/api-gateway-controllers';
export const apiGatewayRouter = express.Router();

// API Gateway routes that are going to be forwarded to the Events, Tickets & Venues Microservices
apiGatewayRouter.route('/my-booked-events/:id').get(fetchUserBookedEvents as any);
apiGatewayRouter.route('/edit-event/:id').put(editEventDetails as any);
apiGatewayRouter.route('/create-event').post(createNewEvent as any);

apiGatewayRouter.route('/:id/event/details').get(fetchTicketEventDetails as any);