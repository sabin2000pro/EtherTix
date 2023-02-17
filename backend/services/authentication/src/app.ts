import dotenv from 'dotenv';
dotenv.config({path: 'config.env'});
import cookieSession from 'cookie-session';
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import {connectAuthDatabase} from './database/auth-schema';
import {authRouter} from './routes/auth-routes';
import { errorHandler } from './middleware/error-handler';

const app: any = express();

connectAuthDatabase();

app.use(morgan('dev') as any);

app.use(mongoSanitize()); // Prevent againiojoijoijoijst NoSQL Injection attacks in production environment
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
app.use('/api/auth', authRouter);
app.use(errorHandler);

export {app}