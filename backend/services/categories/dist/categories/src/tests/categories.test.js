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
const mongoose_1 = __importDefault(require("mongoose"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    return yield mongoose_1.default.connect("mongodb+srv://sabin2000:123mini123@ethertix.ahxythi.mongodb.net/auth-db?retryWrites=true&w=majority");
}));
describe("Fetch All Categories Test Suite", () => {
    it("Return list of categories unit test", () => {
    });
    it("Return empty list of categories unit test", () => {
    });
});
describe("Create Categories Test Suite", () => {
});
describe("Edit Categories Test Suite", () => {
});
describe("Fetch Category By ID Test Suite", () => {
});
describe("Delete Categories By ID Test Suite", () => {
});
describe("Delete Single Category By ID Test Suite", () => {
});
// Close the connection to the server after all tests are ran for the Categories Service
afterAll(done => {
    mongoose_1.default.connection.close();
    done();
});
