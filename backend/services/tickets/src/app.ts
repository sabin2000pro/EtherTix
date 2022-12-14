import { errorHandler } from './middleware/error-handler';
import { StatusCodes } from 'http-status-codes';
import express, { Application, NextFunction, Request, Response } from "express";
import connectTicketsSchema from './database/tickets-db';
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { ticketRouter } from "./routes/ticket-routes";
import { CustomError } from './middleware/error-handler';

connectTicketsSchema();

const app: Application = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if(process.env.NODE_ENV === 'production') {
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

app.get("/", (request: Request, response: Response) => {
    return response.json({message: "Tickets Root Route"})
})

app.use('/api/v1/tickets', ticketRouter);
app.use(errorHandler)

app.all('*', (err: Error, request: Request, response: Response, next: NextFunction) => {

    if(err instanceof CustomError) {
        return response.status(StatusCodes.NOT_FOUND).json({message: err.message, errors: err.processErrors(), stack: err.stack})
    }

    return next();

})


export {app}