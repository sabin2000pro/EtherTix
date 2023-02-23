import express, { Application, Request, Response } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import {connectVenuesSchema} from './database/venues-db';

const app: any = express();
connectVenuesSchema();

if(process.env.VENUES_SERVICE_DEV_MODE === 'development') {
    app.use(morgan('dev'));
}

if(process.env.VENUES_SERVICE_DEV_MODE === 'production') {
    app.use(mongoSanitize()); // Prevent against NoSQL Injection attacks in production environment
}
 
app.use(express.json());
app.set('trust proxy', true);
app.use(hpp());
app.use(cors());
app.use(helmet());

// Include error handling middleware here for the venues

app.get("/", (request: any, response: any) => {
    return response.json({message: "Venues Service Root Route"})
})

export {app} // Export the main app