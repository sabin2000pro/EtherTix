import { NextFunction } from 'express';
require('dotenv').config();
import express from 'express';
import morgan from 'morgan';

const app: any = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (request: any, response: any, next: NextFunction) => {

})

export {app};