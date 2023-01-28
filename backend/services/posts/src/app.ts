import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import cors from "cors";

const app: any = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

 
app.use(express.json());
app.set('trust proxy', true);
app.use(hpp());
app.use(cors());
app.use(helmet());


// Error Handler middleware


app.get("/", (request: any, response: any) => {
    return response.json({message: "Root Route"})
})

export {app}