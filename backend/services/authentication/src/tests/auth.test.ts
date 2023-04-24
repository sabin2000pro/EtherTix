require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';

// Before any tests begin, connect to the database
beforeAll(async() => {
    return await mongoose.connect('mongodb+srv://sabin2000:123mini123@ethertix-auth-schema.doefuhx.mongodb.net/?retryWrites=true&w=majority');
})

describe("Register Account Test Suite", () => {

    it("Register Account with missing fields", async () => {

        const missingBodyData = [{username: "bob2000", email: "andy09@gmail.com", forename: "Sabin", surname: "Lungu"}]

        for(const data of missingBodyData) {
            const response = await request(app).post('/api/v1/auth/register').send(data)
            expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
            
         }

    })

    it("Register account with valid details", async () => {
        const validRegisterData = [{forename: "John", surname: "Owens", username: "johnn32948", email: "john00@gmail.com", password: "test00", passwordConfirm: "test00", role: "User"}]

        for(const data of validRegisterData) {
            const response = await request(app).post('/api/v1/auth/register').send(data)
            expect(response.statusCode).not.toBe(StatusCodes.CREATED);
        
         }

    })

    it("Register Account with passwords not matching", async () => {

        const invalidBodyData = [{forename: "James", surname: "Brown", email: "jamesbronw09@gmail.com", password: "123mini123", passwordConfirm: "lol12345", role: "User"}]

        for(const data of invalidBodyData) {
            const response = await request(app).post('/api/v1/auth/register').send(data)
            return expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
         }

    })

    it("Register account with forename characters exceeding limit", async () => {
        const invalidForename = [{forename: "weofjewoijfewiojfewoijfweoifwe", surname: "Andy", "email": "eabinlungu09@gmail.com", password: "123mini123", passwordConfirm: "123mini123", role: "User"}]

        for(const data of invalidForename) {
            const response = await request(app).post('/api/v1/auth/register').send(data)
            
            expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
         }

    })

})

describe("Login Test Suite", () => {

    it("Login with valid credentials", async () => {

        const validLoginData = [{email: "dana00@gmail.com", password: "123mini123"}]

        for(const data of validLoginData) {
            const response = await request(app).post('/api/v1/auth/login').send(data)            
            expect(response.statusCode).toBe(StatusCodes.OK);
         }

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
            return expect(response.statusCode).not.toBe(StatusCodes.OK);

        }
    })

    it("Verify E-mail address with already verified user ID and OTP", async () => {

        try {
            const verifiedData = [{userId: "63cef9c5b006313b347a3c96", OTP: "761259"}]

            for (const bodyData of verifiedData) {
                const response = await request(app).post('/api/v1/auth/verify-email').send(bodyData);
    
                return expect(response.statusCode).not.toBe(StatusCodes.OK);
            }
        } 
        
        catch(error) {
            
            if(error) {
                return console.error(error);
            }
        }


    })

    it("Verify e-mail address with invalid User ID", async () => {
        try {

        } 
        
        catch(error) {

            if(error) {
                return console.error(error.message);
            }

        }

    })


})

// Test suite for verifying the MFA code verification test suite
describe("Verify Login MFA Test Suite", () => {

    it("Verify Login MFA - Invalid MFA Code", async () => {

        try {
            const invalidMfaCodeData = [{userId: "63ce8f17dbde8e822781c701"}]
        } 
        
        catch(error) {

            if(error) {
                return console.error(error.message);
            }

        }
    })

    it("Verify Login MFA - Valid Correct MFA Code", async () => {

        try {
            const validMFABody = [{userId: "", mfaCode: "909899"}]
        } 
        
        catch(error) {

        }

    })

    it("Verify Login MFA - Invalid User ID", async () => {

        try {

        } 
        
        catch(error) {

            if(error) {
                return console.error(error.message);
            }

        }

    })

})

describe("Logout Test Suite", () => {
    
    it("Logout user success", async () => { // Test for logging out user

        const response = await request(app).get('/api/v1/auth/logout');
        return expect(response.statusCode).toBe(StatusCodes.OK);

    })
})

describe("Forgot Password Test Suite ", () => {

    it("Forgot Password Test - Invalid E-mail Address", async () => {
        
        try {

        } 
        
        catch(error) {

        }

    })

    it("Forgot Password Test - Valid E-mail Address", async () => {

        try {

        } 
        
        catch(error) {

        }

    })
})

describe("Reset Password Test Suite", () => {

    it("Reset Password Test - Missing password", async () => {
        try {

        } 
        
        catch(error) {

        }

    })

    it("Reset Password Test - Valid Password", async () => {
        try {

        } 
        
        catch(error) {

        }
    })

    it("Reset Password Test - Invalid Current Password", async () => {
        try {

        } 
        
        catch(error) {

        }
    })

})

describe("Update User Passwords Test Suite", () => {

})

describe("Update User Profile ", () => {

})

describe("Fetch All Users Test Suite", () => {

    it("Fetch All Users Unit Test", async () => {
        try {

        } 
        
        catch(error) {

            if(error) {
                return console.error(error);

            }
        }

    })

})

describe("Fetch Single User - Organiser Dashboard Test Suite" , () => { // Test Suite for fetching a single user account details in JSON format

    it("Fetch Valid Single user By ID ", async () => {
        try {

        } 
        
        catch(error) {
            if(error){ 
                return console.error(error);
            }
        }

    })

    it("Fetch Invalid User ID Test", async () => {
        try {

        } 
        
        catch(error) {
            if(error){ 
                return console.error(error);
            }
        }

    })

    it("Fetch Invalid Missing User ID Test", async () => {
        try {

        } 
        
        catch(error) {

            if(error){ 
                return console.error(error);
            }

        }

    })


})


// Close the connection to the server after all tests are ran
afterAll(done => {
    mongoose.connection.close();
    done()
});