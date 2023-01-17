import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
require('dotenv').config();
import {app} from '../app';

// Before any tests begin, connect to the database
beforeAll(async() => {
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ethertix.ahxythi.mongodb.net/?retryWrites=true&w=majority");
})

afterAll(async () => {

})