require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';

const ORDERS_SERVICE_DB_URI = process.env.ORDERS_SERVICE_DB_URI;
