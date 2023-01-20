require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"

import {app} from '../app';

// Before any tests begin, connect to the database
beforeAll(async() => {
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ethertix.ahxythi.mongodb.net/auth-db?retryWrites=true&w=majority");
})

describe("Register Account Test Suite", () => {

    it("Register Account with missing fields", async () => {
        const missingBodyData = [{username: "bob2000", email: "andy09@gmail.com", forename: "Sabin", surname: "Lungu"}]

        for(const data of missingBodyData) {
            const response = await request(app).post('/api/v1/auth/register').send(data)
            return expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST)
         }

    })

    it("Register Account with passwords not matching", async () => {
        const invalidBodyData = [{forename: "James", surname: "Brown", email: "jamesbronw09@gmail.com", password: "123mini123", passwordConfirm: "lol12345", role: "User"}]

        for(const data of invalidBodyData) {
            const response = await request(app).post('/api/v1/auth/register').send(data)
            return expect(response.statusCode).not.toBe(StatusCodes.BAD_REQUEST);
         }

    })

    it("Register account with forename characters exceeding limit", async () => {
        const invalidForename = [{forename: "weofjewoijfewiojfewoijfweoifwe", surname: "Andy", "email": "eabinlungu09@gmail.com", password: "123mini123", passwordConfirm: "123mini123", role: "User"}]

        for(const data of invalidForename) {
            const response = await request(app).post('/api/v1/auth/register').send(data)
            
            return expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
         }
    })

})

describe("Login Test Suite", async () => {

    it("Login with valid credentials", async () => {
        const validLoginData = [{email: ""}]
    })

})

describe("Verify E-mail Address Test Suite", async () => {

})


// Close the connection to the server after all tests are ran
afterAll(done => {
    mongoose.connection.close();
    done()
});