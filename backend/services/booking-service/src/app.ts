require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import { NextFunction } from 'express';
import express from 'express';
import morgan from 'morgan';

const app: any = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (request: any, response: any, next: NextFunction) => {
return response.status(StatusCodes.OK).json({success: true, message: "Bookings Microservice Root Route"})
})

export {app};