import { startAuthServer } from './../index';
import request from "supertest"
import mongoose from "mongoose"
require('dotenv').config("../.env")


beforeAll(async() => {
    const url = process.env.MONGO_URI;
    return await mongoose.connect(url);
})

describe("Register Account Test Suite", () => {

})

afterAll(done => {
    mongoose.connection.close();
    done()
})