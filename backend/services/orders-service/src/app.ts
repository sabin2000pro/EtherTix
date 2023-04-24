require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import asyncHandler from 'express-async-handler';

const app: any = express();

export {app}