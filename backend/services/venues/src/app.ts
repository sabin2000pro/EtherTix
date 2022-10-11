import express, { Application, Request, Response } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import connectVenueSchema from './database/venues-db';

const app: Application = express();

connectVenueSchema();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if(process.env.NODE_ENV === 'production') {
    app.use(mongoSanitize()); // Prevent against NoSQL Injection attacks in production environment
}
 
app.use(express.json());
app.set('trust proxy', true);
app.use(hpp());
app.use(cors());
app.use(helmet());

// Include error handling middleware here for the venues

app.get("/", (request: Request, response: Response) => {
    return response.json({message: "Venues Root Route"})
})

export {app}