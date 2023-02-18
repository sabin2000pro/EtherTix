require('dotenv').config();
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";

const app: any = express();

if(process.env.API_GATEWAY_NODE_ENV === 'development') {
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

export {app}