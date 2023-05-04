
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';

beforeAll(async() => {
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ethertix-events-schema.nk9mere.mongodb.net/?retryWrites=true&w=majority");
})

describe("Fetch Events Unit Tests", () => {

    it("Fetch Events - Unit Test", async () => {
        const eventsResponse = await request(app).get(`/api/v1/events`).send();

        expect(eventsResponse.body).not.toBe(null);
        expect(eventsResponse.statusCode).toBe(StatusCodes.OK);
        expect(Array.isArray(eventsResponse.body.events)).toBe(true);
        expect(eventsResponse.headers['content-type']).toBe('application/json; charset=utf-8');
    })

    it("Fetch Single Event - Unit Test", async () => {
        const eventsResponse = await request(app).get(`/api/v1/events/5d713995b721c3bb38c1f5d1`).send()
        
        expect(eventsResponse.body).not.toBe(null);
        expect(eventsResponse.statusCode).toBe(StatusCodes.OK);
    })

    it("Create New Event - Valid Details Unit Test", async () => {
        const eventData = [ {organiser: "5d7a514b5d2c12c7449be042", venue: "5d7a514b5d2c12c7449be020", name: "Test Event", summary: "Test Summary", description: "Test Description", startAt: "2023-08-12T13:00:00.000Z", endsAt: "2023-08-12T15:00:00.000Z", eventStatus: 'pending', format: "Outdoor", isOnline: false, capacity: 50, hasSeating: true, isSoldOut: false, reservedSeating: false, salesStatus: "on_sale"} ]
        const createEventResponse = await request(app).post(`/api/v1/events`).send(eventData);
        console.log(`Create Event Response : `, createEventResponse);


    })

    it("Edit Event Details - Valid Details", async () => {

    })
       

})

// Close the connection to the server after all tests are ran
afterAll(done => {
    mongoose.connection.close();
    done()
});