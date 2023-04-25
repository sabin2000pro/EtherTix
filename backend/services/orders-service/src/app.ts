require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import { NextFunction } from 'express';
import express from 'express';
import morgan from 'morgan';
import { connectOrderSchema } from './database/order-schema';

connectOrderSchema();

const app: any = express();

app.use(express.json());

if(process.env.ORDERS_SERVICE_DEV_MODE === 'development') {
    app.use(morgan('dev'));
}

app.get('/', (request: any, response: any, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Orders Microservice Root Route"})
})

export {app}