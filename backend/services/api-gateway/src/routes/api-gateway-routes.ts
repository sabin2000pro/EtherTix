import express from 'express';
import {fetchEventTicketDetails} from '../controllers/api-gateway-controllers';
export const apiGatewayRouter = express.Router();

// API Gateway routes that are going to be forwarded to the Events, Tickets & Venues Microservices
apiGatewayRouter.route('/:id/ticket-details').get(fetchEventTicketDetails as any);