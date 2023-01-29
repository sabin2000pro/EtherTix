import { CustomError } from './middlewares/error-handler';
import connectEventDatabase from './database/event-db';
import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { StatusCodes } from 'http-status-codes';
import {eventRouter} from './routes/event-routes';

const app: any = express();

connectEventDatabase();
 
app.use(express.json());
app.set('trust proxy', true);
app.use(hpp());
app.use(morgan('dev'));

app.use(mongoSanitize()); // Prevent against NoSQL Injection attacks in production environment
app.use(cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "OPTIONS", "DELETE"]
}));
app.use(helmet());

app.use('/api/v1/events', eventRouter);

app.get("/", (request: any, response: any) => {
    return response.json({message: "Event - Root Route"})
});

app.all('*', (err: Error, request: any, response: any, next: NextFunction) => {

    if(err instanceof CustomError) {
        return response.status(StatusCodes.NOT_FOUND).json({message: err.message, errors: err.processErrors(), stack: err.stack})
    }

    return next();

})

export {app}