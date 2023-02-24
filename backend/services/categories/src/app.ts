require('dotenv').config();
import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import {categoriesRouter} from './routes/categories-routes';
import { connectCategoriesDatabase } from "./database/categories-schema";
import { StatusCodes } from "http-status-codes";

connectCategoriesDatabase();

const app: any = express();

app.use(express.json() as any);

if(process.env.CATEGORIES_SERVICE_NODE_ENV === 'production') {
    app.use(mongoSanitize())
}

if(process.env.CATEGORIES_SERVICE_NODE_ENV === 'development') {
    app.use(morgan('dev') as any)
}    

app.use(cors({ origin: "*", methods: ["POST", "PUT", "GET", "DELETE", "PATCH"]}) as any)

app.get('/', (request: any, response: any, next) => {
   return response.status(StatusCodes.OK).json({success: true, message: "Categories Service Root Route"}) 
})

app.use('/api/categories', categoriesRouter);

// Mount the error handler here

export {app}