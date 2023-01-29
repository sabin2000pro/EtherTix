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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "config.env" });
const mongoose_1 = __importDefault(require("mongoose"));
const EVENT_DB_URI = process.env.EVENT_DB_URI;
exports.default = () => {
    const connectEventsDatabase = (...args) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield mongoose_1.default.connect(EVENT_DB_URI).then(conn => {
                if (conn.connection) {
                    console.log(`Read env var successfully`);
                    return console.log(`Connected to events database...`);
                }
                else {
                    return console.log(`Could not connect to events DB`);
                }
            });
        }
        catch (error) {
            if (error) {
                return console.error(error);
            }
        }
    });
    connectEventsDatabase();
};
