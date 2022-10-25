import dotenv from "dotenv";
dotenv.config();
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";


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
app.use(cors());
app.use(helmet());


// Error Handler middleware


app.get("/", (request: Request, response: Response) => {
    return response.json({message: "Root Route"})
})

export {app}