import request from "supertest"
import mongoose from "mongoose"
require('dotenv').config("../.env")

import {app} from '../app';


beforeAll(async() => {
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ethertix.ahxythi.mongodb.net/?retryWrites=true&w=majority");
})

describe("Register Account Test Suite", () => {
    
    it("Test Register API with valid body data", async () => {

         const registerBodyData = [{username: "bob2000", email: "bob00@gmail.com", password: "123mini12", passwordConfirm: "123mini12", forename: "Sabin", surname: "Lungu"}]

         for(const data of registerBodyData) {
            const response = await request(app).post('/api/v1/auth/register').send(data)
            return expect(response.statusCode).toBe(201)
         }
         
    })

    it("Register Account with invalid e-mail address", async () => {
        const invalidBodyData = [{username: "bob2000", email: "bob0wef.com", password: "123mini12", passwordConfirm: "123mini12", forename: "Sabin", surname: "Lungu"}]

        for(const data of invalidBodyData) {
            const response = await request(app).post('/api/v1/auth/register').send(data)
            return expect(response.statusCode).toBe(400)
         }

    })

})

afterAll(done => {
    mongoose.connection.close();
    done()
});