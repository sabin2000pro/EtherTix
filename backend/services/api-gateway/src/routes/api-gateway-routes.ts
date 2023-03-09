import express from 'express';
import { fetchUserBookedEvents, createNewEvent, editEventDetails} from '../controllers/api-gateway-controllers';
export const apiGatewayRouter = express.Router();

// API Gateway routes that are going to be forwarded to the Events, Tickets & Venues Microservices
apiGatewayRouter.route('/my-booked-events/:id').get(fetchUserBookedEvents);
apiGatewayRouter.route('/edit-event/:id').put(editEventDetails);
apiGatewayRouter.route('/create-event').post(createNewEvent);