require('dotenv').config();
import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { connectCategoriesDatabase } from "./database/categories-db";

connectCategoriesDatabase();

const app: Application = express();

app.use(morgan('dev') as any)

app.use(cors({
    origin: "*",
    methods: ["POST", "PUT", "GET"]
}) as any)

if(process.env.NODE_ENV === 'production') {
    app.use(mongoSanitize())
}

export {app}