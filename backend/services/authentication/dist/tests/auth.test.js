"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const http_status_codes_1 = require("http-status-codes");
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../app");
// Before any tests begin, connect to the database
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    return yield mongoose_1.default.connect("mongodb+srv://sabin2000:123mini123@ethertix.ahxythi.mongodb.net/auth-db?retryWrites=true&w=majority");
}));
describe("Register Account Test Suite", () => {
    it("Register Account with missing fields", () => __awaiter(void 0, void 0, void 0, function* () {
        const missingBodyData = [{ username: "bob2000", email: "andy09@gmail.com", forename: "Sabin", surname: "Lungu" }];
        for (const data of missingBodyData) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/register').send(data);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    }));
    it("Register account with valid details", () => __awaiter(void 0, void 0, void 0, function* () {
        const validRegisterData = [{ forename: "John", surname: "Owens", username: "johnn32948", email: "john00@gmail.com", password: "test00", passwordConfirm: "test00", role: "User" }];
        for (const data of validRegisterData) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/register').send(data);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.CREATED);
        }
    }));
    it("Register Account with passwords not matching", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidBodyData = [{ forename: "James", surname: "Brown", email: "jamesbronw09@gmail.com", password: "123mini123", passwordConfirm: "lol12345", role: "User" }];
        for (const data of invalidBodyData) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/register').send(data);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    }));
    it("Register account with forename characters exceeding limit", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidForename = [{ forename: "weofjewoijfewiojfewoijfweoifwe", surname: "Andy", "email": "eabinlungu09@gmail.com", password: "123mini123", passwordConfirm: "123mini123", role: "User" }];
        for (const data of invalidForename) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/register').send(data);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    }));
});
describe("Login Test Suite", () => {
    it("Login with valid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const validLoginData = [{ email: "jake00@gmail.com.com", password: "123mini123" }];
        for (const data of validLoginData) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/login').send(data);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.OK);
        }
    }));
    it("Login with missing e-mail address", () => __awaiter(void 0, void 0, void 0, function* () {
        const missingEmailData = [{ password: "123mini123" }];
        for (const data of missingEmailData) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/login').send(data);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    }));
    it("Login with invalid e-mail address", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidEmailData = [{ email: "123mini123" }];
        for (const data of invalidEmailData) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/login').send(data);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    }));
    it("Login with invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidPasswordData = [{ email: "jake00@gmail.com.com", password: "dojfgisfjij" }];
        for (const data of invalidPasswordData) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/login').send(data);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    }));
});
// Test suite for verifying e-mail address
describe("Verify E-mail Address Test Suite", () => {
    it("Verify E-mail Address with invalid OTP code entered", () => __awaiter(void 0, void 0, void 0, function* () {
        const emailVerificationBodyData = [{ userId: "63ce8f17dbde8e822781c701", OTP: "019ksdfj" }];
        for (const bodyData of emailVerificationBodyData) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/verify-email').send(bodyData);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.OK);
        }
    }));
    it("Verify E-mail address with missing OTP value", () => __awaiter(void 0, void 0, void 0, function* () {
        const missingOtpData = [{ userId: "63ce8f17dbde8e822781c701", OTP: "" }];
        for (const bodyData of missingOtpData) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/verify-email').send(bodyData);
            return expect(response.statusCode).not.toBe(http_status_codes_1.StatusCodes.OK);
        }
    }));
    it("Verify E-mail address with valid UserID and OTP values", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Verify e-mail address with invalid User ID", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
// Test suite for verifying the MFA code verification test suite
describe("Verify Login MFA Test Suite", () => {
    it("Verify Login MFA - Invalid MFA Code", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
describe("Logout Test Suite", () => {
    it("Logout user success", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get('/api/v1/auth/logout');
        return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.OK);
    }));
});
describe("Forgot Password Test Suite ", () => {
    it("Forgot Password Test - Invalid E-mail Address", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
        }
        catch (error) {
        }
    }));
    it("Forgot Password Test - Valid E-mail Address", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
        }
        catch (error) {
        }
    }));
});
describe("Reset Password Test Suite", () => {
});
describe("Update User Passwords Test Suite", () => {
});
describe("Update User Profile ", () => {
});
describe("Fetch All Users Test Suite", () => {
    it("Fetch All Users Unit Test", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
// Close the connection to the server after all tests are ran
afterAll(done => {
    mongoose_1.default.connection.close();
    done();
});
