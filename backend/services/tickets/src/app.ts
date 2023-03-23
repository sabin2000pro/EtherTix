require('dotenv').config();
import { errorHandler} from './middleware/error-handler';
import { StatusCodes } from 'http-status-codes';
import express, {NextFunction, Request, Response } from "express";
import {connectTicketsSchema} from './database/tickets-db';
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { ticketRouter } from "./routes/ticket-routes";

connectTicketsSchema();

const app: any = express();

if(process.env.TICKETS_DEV_MODE === 'development') {
    app.use(morgan('dev'));
}

if(process.env.TICKETS_DEV_MODE === 'production') {
    app.use(mongoSanitize()); // Prevent against NoSQL Injection attacks in production environment
}
 
app.use(express.json());
app.set('trust proxy', true);

app.use(hpp());
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', "DELETE"]
}));

app.use(helmet());

app.get("/", (request: any, response: any) => {
    return response.json({message: "Tickets Root Route"})
})

app.use('/api/v1/tickets', ticketRouter);
app.use(errorHandler)


// Handle 404 unhandled routes
app.all("*", (request: any, response: any, next: NextFunction) => {
    return response.status(StatusCodes.NOT_FOUND).json({success: false, message: `404 - The server could not find the route requested`});
})

export {app}