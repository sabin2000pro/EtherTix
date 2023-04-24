require('dotenv').config();
import supertest from "supertest";
import mongoose from 'mongoose';
import {app} from "../app";

const TICKETS_SERVICE_DB_URI = process.env.TICKETS_SERVICE_DB_URI || ""

beforeAll(async () => {
    // Before starting the unit tests
    return await mongoose.connect(TICKETS_SERVICE_DB_URI);
})

describe("Fetch All Tickets - Unit Test Suite", () => {

    it("Fetch All Tickets - Unit Test I", async () => {

    })


})

describe("Fetch Single Ticket - Unit Test Suite", () => {
    it("Fetch Single Ticket By ID - Valid ID", async () => {

    })

    it("Fetch Single Ticket By ID - Missing ID", async () => {

    })

    it("Fetch Single Ticket By ID - Malformed ID", async () => {

    })

})

describe("Create Event Ticket - Unit Test Suite", async () => {
    it("Create New Ticket - Valid Details", async () => {

    })

    it("Create New Ticket - Missing Details", async () => {

    })

    it("Create New Ticket - Event Name < 10 characters length", async () => {

    })

    it("Create New Ticket - Event Name > 100 characters length", async () => {

    })

    it("Create New Ticket - Missing Issuer ID", async () => {

    })

    it("Create New Event - ")
})

afterAll((done) => {
    mongoose.connection.close();
    done();
})