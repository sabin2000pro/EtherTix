import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
require('dotenv').config("../.env")

import {app} from '../app';

// Before any tests begin, connect to the database
beforeAll(async() => {
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ethertix.ahxythi.mongodb.net/?retryWrites=true&w=majority");
})

describe("Register Account Test Suite", () => {

    it("Register Account with invalid e-mail address", async () => {

        const invalidBodyData = [{username: "bob2000", email: "bob0wef.com", password: "123mini12", passwordConfirm: "123mini12", forename: "Sabin", surname: "Lungu"}]

        for(const data of invalidBodyData) {
            const response = await request(app).post('/api/v1/auth/register').send(data)
            return expect(response.statusCode).toBe(400)
         }
    })

    it("Register Account with missing fields", async () => {
        const missingBodyData = [{username: "bob2000", email: "bob0wef.com", forename: "Sabin", surname: "Lungu"}]

        for(const data of missingBodyData) {
            const response = await request(app).post('/api/v1/auth/register').send(data)
            return expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST)
         }
    })

})

describe("Login Account Test Suite", () => {
    
    it("Login With Valid Credentials Test", async () => {

        const loginFields = [{email: "sabinlungu293@gmail.com", password: "123mini123"}]

        for(const loginData of loginFields) {
            const response = await request(app).post('/api/v1/auth/login').send(loginData)
            return expect(response.statusCode).toBe(StatusCodes.OK)
        }


    })

    it("Login with invalid password", async () => {
        const loginFields = [{email: "sabinlungu293@gmail.com", password: "invalidpassword"}]

        for(const loginData of loginFields) {
            const response = await request(app).post('/api/v1/auth/login').send(loginData)
            return expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST)
        }

    })

    it("Login with invalid e-mail address", async () => {
        const loginFields = [{email: "invalidemail", password: "invalidpassword"}]

        for(const loginData of loginFields) {
            const response = await request(app).post('/api/v1/auth/login').send(loginData)
            return expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST)
        }
    })


})

describe("Verify E-mail Address Test Suite", () => {

    it("Verify E-mail Address With Invalid Entries", async () => {

        const invalidOtpFields = [{userId: "", OTP: "09"}]

        for(const data of invalidOtpFields) {

            const response = await request(app).post("/api/v1/auth/verify-email").send(data);
            return expect(response.statusCode).toBe(400)
 
        }

    })

    it("Verify E-mail Address With Malformed User ID", async () => {
        const malformedInputs = [{userId: "5dfa", OTP: "909890"}]

        for(const data of malformedInputs) {
            const response = await request(app).post("/api/v1/auth/verify-email").send(data);

            return expect(response.statusCode).toBe(400)
        }

    })

    it("Verify E-mail Address With Missing User ID", async () => {
        const malformedInputs = [{OTP: "909890"}]

        for(const data of malformedInputs) {
            const response = await request(app).post("/api/v1/auth/verify-email").send(data);

            return expect(response.statusCode).toBe(404)
        }
    })


})

describe("Forgot Password Test Suite", () => {


    it("Send Forgot Password with valid e-mail address", async () => {
        const validForgotPasswordEntries = [{email: "sabinlungu293@gmail.com"}]

        for(const data of validForgotPasswordEntries) {
            const response = await request(app).post("/api/v1/auth/forgot-password").send(data);

            return expect(response.statusCode).toBe(200)
        }

    })

    it("Send Forgot Password with invalid e-mail address", async () => {
        const validForgotPasswordEntries = [{email: "tottenham2@gmail.com"}]

        for(const data of validForgotPasswordEntries) {
            const response = await request(app).post("/api/v1/auth/forgot-password").send(data);

            return expect(response.statusCode).toBe(404)
        }

    })  


    it("Send Forgot Password with empty e-mail field", async () => {
        const validForgotPasswordEntries = [{email: ""}]

        for(const data of validForgotPasswordEntries) {
            const response = await request(app).post("/api/v1/auth/forgot-password").send(data);

            return expect(response.statusCode).toBe(404)
        }

    })


})

describe("Verify Login MFA Test Suite", () => {

})

describe("Resend Login MFA Code - Test Suite", () => {

})

describe("Reset Password - Test Suite", () => {

})

describe("Logout Test Suite", () => {


    it("Logout User Test", async () => {

    })

})

describe("Update User Password Test Suite", () => {
    
})


// Close the connection to the server after all tests are ran
afterAll(done => {
    mongoose.connection.close();
    done()
});