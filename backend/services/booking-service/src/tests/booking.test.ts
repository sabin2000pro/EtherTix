require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';

// Before running tests
beforeAll(async() => {
    return await mongoose.connect("");
})

// Test Suites
describe("Fetch All Bookings - API Unit Test Suite", () => {

})

describe("Fetch Booking By ID - API Unit Test Suite", () => {
    
})

describe("Create New User Booking - API Unit Test Suite", () => {

})

describe("Edit Booking Details - API Unit Test Suite", () => {

})

// After running the tests - close the connection to the database..
afterAll((done) => {
    mongoose.connection.close();
    done();
})