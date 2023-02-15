import dotenv from 'dotenv';
dotenv.config({path: 'config.env'});
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";

const app: any = express();

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

export {app}