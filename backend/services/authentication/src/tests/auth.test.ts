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
            return expect(response.statusCode).toBe(400)
         }
    })

})

describe("Login Account Test Suite", () => {
    
    it("Login With Valid Credentials Test", async () => {
        const loginFields = [{email: "sabinlungu293@gmail.com", password: "123mini123"}]

        for(const loginData of loginFields) {
            const response = await request(app).post('/api/v1/auth/login').send(loginData)
            return expect(response.statusCode).toBe(200)
        }


    })
})

afterAll(done => {
    mongoose.connection.close();
    done()
});