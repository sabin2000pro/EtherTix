require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';

beforeAll(async() => {
    return await mongoose.connect("");
})

describe("Fetch All Bookings - API Unit Test Suite", () => {

})

describe("Fetch Booking By ID - API Unit Test Suite", () => {


})

describe("Create New ")

afterAll((done) => {
        // Close connection to the database
    mongoose.connection.close();
    done();
})