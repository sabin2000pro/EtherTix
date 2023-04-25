require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';


beforeAll(async() => {
    return await mongoose.connect("");
})

afterAll((done) => {
        // Close connection to the database
        mongoose.connection.close();
    done();
})