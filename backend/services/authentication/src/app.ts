import dotenv from "dotenv";
dotenv.config();
import cookieSession from 'cookie-session';
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import connectAuthDatabase from './database/auth-db';
import authRouter from './routes/auth-routes';
import { errorHandler } from './middleware/error-handler';

const app: Application = express();

connectAuthDatabase()

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
    methods: ["POST", "PUT", "GET", "DELETE"]
}));

app.use(helmet());
app.use(cookieSession({
    keys: ['session']
}));

// Error Handler middleware
app.use('/api/v1/auth', authRouter);
app.use(errorHandler);

app.get("/", (request: Request, response: Response) => {
    return response.json({message: "Root Route"})
})

export {app}