require('dotenv').config();
import supertest from "supertest";
import mongoose from 'mongoose';
import {app} from "../app";

beforeAll(async () => {
    // Before starting the unit tests
    return await mongoose.connect(``);
})

afterAll((done) => {
    mongoose.connection.close();
    done();
})