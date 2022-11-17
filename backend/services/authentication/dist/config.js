"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '/Users/sabin2000/Documents/ethertix/backend/services/authentication/src/config.ts' });
class Config {
    constructor() {
        this.DATABASE_URL = process.env.DATABASE_URL || "";
        this.JWT_TOKEN = process.env.JWT_TOKEN || "";
        this.JWT_TOKEN_EXPIRES = process.env.JWT_TOKEN_EXPIRES || "";
    }
}
exports.config = new Config();
