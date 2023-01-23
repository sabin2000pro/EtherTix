require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';

beforeAll(async () => {
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ethertix.ahxythi.mongodb.net/auth-db?retryWrites=true&w=majority");
})

describe("Fetch All Categories Test Suite", () => {

})

describe("Create Categories Test Suite", () => {

})

describe("Edit Categories Test Suite", () => {

})

describe("Fetch Category By ID Test Suite", () => {
    
})

// Close the connection to the server after all tests are ran for the Categories Service
afterAll(done => {
    mongoose.connection.close();
    done()
});