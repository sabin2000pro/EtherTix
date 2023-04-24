require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';

const AUTH_SERVICE_DB_URI = process.env.AUTH_SERVICE_DB_URI;

// Before any tests begin, connect to the database
beforeAll(async() => {
    return await mongoose.connect(AUTH_SERVICE_DB_URI);
})

describe("Register Account Test Suite", () => {

    it("Register Account with missing fields", async () => {

        const missingBodyData = [{username: "bob2000", forename: "Sabin", surname: "Lungu", password: "123mini123", passwordConfirm: "123mini123"}]
        const response = await request(app).post('/api/v1/auth/register').send(missingBodyData);
        expect(response.statusCode).not.toBe(StatusCodes.OK);
        expect(response.body.success).not.toBe(true);        
    })

    it("Register Account - Forename Length > 12", async () => {
        const forenameBodyData = [{forename: "forenamegreaterthantwelve"}];
        const response = await request(app).post('/api/v1/auth/register').send(forenameBodyData);

        expect(response.statusCode).not.toBe(StatusCodes.OK);
        expect(response.body.message).not.toBe(null);
    })

    it("Register Account Unit Test - Forename Length < 8", async () => {
        const forenameBodyData = [{forename: "less"}]
        const response = await request(app).post('/api/v1/auth/register').send(forenameBodyData);

        expect(response.statusCode).not.toBe(StatusCodes.OK);
        expect(response.body.message).not.toBe(null);
    })

    it("Register account with valid details", async () => {
        const validRegisterData = [{forename: "John", surname: "Owens", username: "johnn32948", email: "john00@gmail.com", password: "test00", passwordConfirm: "test00", role: "User"}]
        const response = await request(app).post('/api/v1/auth/register').send(validRegisterData)
        expect(response.statusCode).not.toBe(StatusCodes.CREATED);
    })

    it("Register Account - Password No Special Character Test", async () => {
        const passwordData = [{password: "testpassword"}];
        const response = await request(app).post('/api/v1/auth/register').send(passwordData);

        expect(response.statusCode).not.toBe(StatusCodes.OK);
    })

    it("Register Account with passwords not matching", async () => {

        const invalidBodyData = [{forename: "James", surname: "Brown", email: "jamesbronw09@gmail.com", password: "123mini123", passwordConfirm: "lol12345", role: "User"}]
        const response = await request(app).post('/api/v1/auth/register').send(invalidBodyData)
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    
    })

    it("Register account with forename characters exceeding limit", async () => {
        const invalidForename = [{forename: "weofjewoijfewiojfewoijfweoifwe", surname: "Andy", "email": "eabinlungu09@gmail.com", password: "123mini123", passwordConfirm: "123mini123", role: "User"}]
        const response = await request(app).post('/api/v1/auth/register').send(invalidForename)

        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
         
    })

})

describe("Login Test Suite", () => {

    it("Login with valid credentials", async () => {

        const validLoginData = [{email: "dana00@gmail.com", password: "123mini123"}]
        const response = await request(app).post('/api/v1/auth/login').send(validLoginData)            
        expect(response.statusCode).toBe(StatusCodes.OK);
    })

    it("Login with missing e-mail address", async () => {

        const missingEmailData = [{password: "123mini123"}]

        for(const data of missingEmailData) {

            const response = await request(app).post('/api/v1/auth/login').send(data)
            expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);

         }
    })

    it("Login with invalid e-mail address", async () => {

        const invalidEmailData = [{email: "123mini123"}]

        for(const data of invalidEmailData) {
            const response = await request(app).post('/api/v1/auth/login').send(data)
            
            expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
         }

    })

    it("Login with invalid password", async () => {
        const invalidPasswordData = [{email: "jake00@gmail.com.com", password: "dojfgisfjij"}]

        for(const data of invalidPasswordData) {

            const response = await request(app).post('/api/v1/auth/login').send(data)
            expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
         }

    })

})

// Test suite for verifying e-mail address
describe("Verify E-mail Address Test Suite", () => {

    it("Verify E-mail Address with invalid OTP code entered", async () => {

        const emailVerificationBodyData = [{userId: "63ce8f17dbde8e822781c701", OTP: "019ksdfj"}]

        for (const bodyData of emailVerificationBodyData) {
            const response = await request(app).post('/api/v1/auth/verify-email').send(bodyData);

             expect(response.statusCode).not.toBe(StatusCodes.OK);
        }
    })

    it("Verify E-mail address with missing OTP value", async () => { // Test case for verifying the user with a missing one time passcode value

        const missingOtpData = [{userId: "63ce8f17dbde8e822781c701", OTP: ""}]

        for (const bodyData of missingOtpData) {
            const response = await request(app).post('/api/v1/auth/verify-email').send(bodyData);
            expect(response.statusCode).not.toBe(StatusCodes.OK);

        }
    })

    it("Verify E-mail address with already verified user ID and OTP", async () => {

       const verifiedData = [{userId: "63cef9c5b006313b347a3c96", OTP: "761259"}]
       const response = await request(app).post('/api/v1/auth/verify-email').send(verifiedData);
       expect(response.statusCode).not.toBe(StatusCodes.OK);
       expect(response.body.success).toBe(false);
    })

    it("Verify e-mail address with invalid User ID", async () => {

        const emailVerificationBody = [{userId: "aiachac3q74", OTP: "900890"}]
        const response = await request(app).post('/api/v1/auth/verify-email').send(emailVerificationBody);

        expect(response.statusCode).not.toBe(StatusCodes.OK);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain("Invalid user ID");
    })

})

// Test suite for verifying the MFA code verification test suite
describe("Verify Login MFA Test Suite", () => {

    it("Verify Login MFA - Invalid MFA Code", async () => {


    })

    it("Verify Login MFA - Valid Correct MFA Code", async () => {

    })

    it("Verify Login MFA - Invalid User ID", async () => {

       

    })

})

describe("Logout Test Suite", () => {
    
    it("Logout user success", async () => { // Test for logging out user
        const response = await request(app).get('/api/v1/auth/logout');
        expect(response.statusCode).toBe(StatusCodes.OK);
    })
    
})

describe("Forgot Password Test Suite ", () => {

    it("Forgot Password Test - Missing E-mail Address", async () => {
    
    })

    it("Forgot Password Test - Valid E-mail Address", async () => {

    })

    it("Forgot Password Test - E-mail Address Length < email.length - 1", async () => {
        
    })

    it("Forgot Password Test - E-mail Address Length > email.length (15 Characters) ", async () => {

    })


})

describe("Reset Password Test Suite", () => {

    it("Reset Password Test - Missing password", async () => {
        

    })

    it("Reset Password Test - Valid Password", async () => {
        
    })

    it("Reset Password Test - Invalid Current Password", async () => {
       
    })

})

describe("Update User Passwords Test Suite", () => {
    it("Update User Password Unit Test II - Valid Password", async () => {
        const updatePasswordData = [{}]
    })

    it("Update User Password Unit Test II - Missing Current Password", async () => {

    })

    it("Update User Password Unit Test III - Missing New Password", async () => {

    })

})

describe("Update User Profile ", () => {

})

describe("Fetch All Users Test Suite", () => {

    it("Fetch All Users Unit Test", async () => {
        
    })

})

describe("Fetch Single User - Organiser Dashboard Test Suite" , () => { // Test Suite for fetching a single user account details in JSON format

    it("Fetch Valid Single user By ID ", async () => {
       

    })

    it("Fetch Invalid User ID Test", async () => {
       

    })

    it("Fetch Invalid Missing User ID Test", async () => {
            
    })

})


// Close the connection to the server after all tests are ran
afterAll(done => {
    mongoose.connection.close();
    done()
});