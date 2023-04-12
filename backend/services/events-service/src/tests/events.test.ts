
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';

beforeAll(async() => {
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ethertix.ahxythi.mongodb.net/?retryWrites=true&w=majority");
})

describe("Fetch Events Unit Tests", () => {

    it("Fetch Events - Unit Test", async () => {

    })

    it("Fetch Events - Unit Test Events Length > 0", async () => {

    })

    it("Create New Event - Valid Details Unit Test", () => {

    })

   

})

// Close the connection to the server after all tests are ran
afterAll(done => {
    mongoose.connection.close();
    done()
});