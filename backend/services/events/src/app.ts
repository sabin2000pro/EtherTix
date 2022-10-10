import { CustomError } from '../../shared/error-handler';
import connectEventDatabase from './database/event-db';
import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { StatusCodes } from 'http-status-codes';

const app: Application = express();

connectEventDatabase();

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
    methods: ["GET", "PUT", "POST", "OPTIONS", "DELETE"]
}));

app.use(helmet());

app.get("/", (request: Request, response: Response) => {
    return response.json({message: "Root Route"})
});

app.all('*', (err: Error, request: Request, response: Response, next: NextFunction) => {

    if(err instanceof CustomError) {
        return response.status(StatusCodes.NOT_FOUND).json({message: err.message, errors: err.processErrors(), stack: err.stack})
    }

    return next();

})

export {app}