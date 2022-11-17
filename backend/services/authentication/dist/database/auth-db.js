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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../../config.env' });
const connectAuthDatabase = (...args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield mongoose_1.default.connect("mongodb+srv://sabin2000:123mini123@ethertix.ahxythi.mongodb.net/?retryWrites=true&w=majority").then(conn => {
            if (conn.connection) {
                return console.log(`Connected to auth database...`);
            }
            else {
                return console.log(`Could not connect to DB`);
            }
        });
    }
    catch (error) {
        if (error) {
            return console.error(error);
        }
    }
});
exports.default = connectAuthDatabase;
