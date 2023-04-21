require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import { NextFunction } from 'express';
import express from 'express';
import morgan from 'morgan';
import { connectBookingSchema } from './database/booking-schema';

connectBookingSchema();

const app: any = express();

app.use(express.json());

if(process.env.BOOKINGS_SERVICE_NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/', (request: any, response: any, next: NextFunction) => {
    return response.status(StatusCodes.OK).json({success: true, message: "Bookings Microservice Root Route"})
})

export {app};