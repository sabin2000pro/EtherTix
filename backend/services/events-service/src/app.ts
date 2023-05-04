require('dotenv').config();
import connectEventDatabase from './database/event-schema';
import express, {NextFunction } from "express";
import morgan from "morgan"
import hpp from "hpp"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { StatusCodes } from 'http-status-codes';
import {eventRouter} from './routes/event-routes';
import {errorHandler} from './middlewares/error-handler';

const app: any = express();

connectEventDatabase();
 
app.use(express.json());
app.set('trust proxy', true);
app.use(hpp());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(mongoSanitize()); // Prevent agaisnst NoSQL Injection attacks in production environment

app.use(cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "OPTIONS", "DELETE"]
}));

app.use('/api/v1/events', eventRouter);

app.all('*', (err: Error, request: any, response: any, next: NextFunction) => {
    return response.status(StatusCodes.NOT_FOUND).json({success: false, message: `The route you are trying to access cannot be found on the server, please try again later`});
})

export {app}