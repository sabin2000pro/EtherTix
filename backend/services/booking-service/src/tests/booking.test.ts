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

    it("Fetch All Bookings - Unit Test", async () => {

    })


})

describe("Fetch Booking By ID - API Unit Test Suite", () => {

    it("Fetch Single Booking By ID - Valid ID", async () => {
    
    })

    it("Fetch Single Booking - Invalid (Not Found ID ) ", async () => {

    })
})

describe("Create New User Booking - API Unit Test Suite", () => {

})

describe("Edit Booking Details - API Unit Test Suite", () => {
    
})

describe("Edit Booking Dates - API Unit Test Suite", () => {

})

describe("Delete Bookings - Unit Test Suite", () => {

    it("Delete Booking By ID - Valid ID Unit Test", async () => {

    })
    
    it("Delete Booking By ID - Not Found ID Unit Test", async () => {
        
    })

})

// After running the tests - close the connection to the database..
afterAll((done) => {
    mongoose.connection.close();
    done();
})