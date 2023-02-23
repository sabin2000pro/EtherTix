require('dotenv').config();
import cookieSession from 'cookie-session';
import express, {NextFunction, Request, Response } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import {connectAuthSchema} from './database/auth-schema';
import {authRouter} from './routes/auth-routes';
import { errorHandler } from './middleware/error-handler';
import { StatusCodes } from 'http-status-codes';


const app: any = express();

connectAuthSchema();

if(process.env.AUTH_SERVICE_NODE_ENV === 'development') {
    app.use(morgan('dev') as any);
}

app.use(mongoSanitize());
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

app.get('/', async (request: any, response: any, next: any): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Authentication Service Root Route"});
})

// Error Handler middleware
app.use('/api/auth', authRouter);
app.use(errorHandler);

export {app}