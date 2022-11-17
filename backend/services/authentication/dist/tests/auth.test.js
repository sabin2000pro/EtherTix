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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config("../.env");
const app_1 = require("../app");
// Before any tests begin, connect to the database
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    return yield mongoose_1.default.connect("mongodb+srv://sabin2000:123mini123@ethertix.ahxythi.mongodb.net/?retryWrites=true&w=majority");
}));
describe("Register Account Test Suite", () => {
    it("Register Account with invalid e-mail address", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidBodyData = [{ username: "bob2000", email: "bob0wef.com", password: "123mini12", passwordConfirm: "123mini12", forename: "Sabin", surname: "Lungu" }];
        for (const data of invalidBodyData) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/register').send(data);
            return expect(response.statusCode).toBe(400);
        }
    }));
    it("Register Account with missing fields", () => __awaiter(void 0, void 0, void 0, function* () {
        const missingBodyData = [{ username: "bob2000", email: "bob0wef.com", forename: "Sabin", surname: "Lungu" }];
        for (const data of missingBodyData) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/register').send(data);
            return expect(response.statusCode).toBe(400);
        }
    }));
});
describe("Login Account Test Suite", () => {
    it("Login With Valid Credentials Test", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginFields = [{ email: "sabinlungu293@gmail.com", password: "123mini123" }];
        for (const loginData of loginFields) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/login').send(loginData);
            return expect(response.statusCode).toBe(200);
        }
    }));
    it("Login with invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginFields = [{ email: "sabinlungu293@gmail.com", password: "invalidpassword" }];
        for (const loginData of loginFields) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/login').send(loginData);
            return expect(response.statusCode).toBe(400);
        }
    }));
    it("Login with invalid e-mail address", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginFields = [{ email: "invalidemail", password: "invalidpassword" }];
        for (const loginData of loginFields) {
            const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/login').send(loginData);
            return expect(response.statusCode).toBe(400);
        }
    }));
});
describe("Verify E-mail Address Test Suite", () => {
    it("Verify E-mail Address With Invalid Entries", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidOtpFields = [{ userId: "", OTP: "09" }];
        for (const data of invalidOtpFields) {
            const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/auth/verify-email").send(data);
            return expect(response.statusCode).toBe(400);
        }
    }));
    it("Verify E-mail Address With Malformed User ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const malformedInputs = [{ userId: "5dfa", OTP: "909890" }];
        for (const data of malformedInputs) {
            const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/auth/verify-email").send(data);
            return expect(response.statusCode).toBe(400);
        }
    }));
    it("Verify E-mail Address With Missing User ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const malformedInputs = [{ OTP: "909890" }];
        for (const data of malformedInputs) {
            const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/auth/verify-email").send(data);
            return expect(response.statusCode).toBe(404);
        }
    }));
});
describe("Forgot Password Test Suite", () => {
    it("Send Forgot Password with valid e-mail address", () => __awaiter(void 0, void 0, void 0, function* () {
        const validForgotPasswordEntries = [{ email: "sabinlungu293@gmail.com" }];
        for (const data of validForgotPasswordEntries) {
            const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/auth/forgot-password").send(data);
            return expect(response.statusCode).toBe(200);
        }
    }));
    it("Send Forgot Password with invalid e-mail address", () => __awaiter(void 0, void 0, void 0, function* () {
        const validForgotPasswordEntries = [{ email: "tottenham2@gmail.com" }];
        for (const data of validForgotPasswordEntries) {
            const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/auth/forgot-password").send(data);
            return expect(response.statusCode).toBe(404);
        }
    }));
    it("Send Forgot Password with empty e-mail field", () => __awaiter(void 0, void 0, void 0, function* () {
        const validForgotPasswordEntries = [{ email: "" }];
        for (const data of validForgotPasswordEntries) {
            const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/auth/forgot-password").send(data);
            return expect(response.statusCode).toBe(404);
        }
    }));
});
describe("Verify Login MFA Test Suite", () => {
});
describe("Resend Login MFA Code - Test Suite", () => {
});
describe("Reset Password - Test Suite", () => {
});
describe("Logout Test Suite", () => {
    it("Logout User Test", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
describe("Update User Password Test Suite", () => {
});
afterAll(done => {
    mongoose_1.default.connection.close();
    done();
});
