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
exports.connectCategoriesDatabase = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: 'backend/services/categories/config.env' });
const mongoose_1 = __importDefault(require("mongoose"));
const CATEGORIES_DB_URI = process.env.CATEGORIES_DB_URI;
const connectCategoriesDatabase = (...args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield mongoose_1.default.connect(CATEGORIES_DB_URI).then(conn => {
            if (conn.connection) {
                return console.log(`Connected to categories database...`);
            }
            else {
                return console.log(`Could not connect to categories schema`);
            }
        });
    }
    catch (error) {
        if (error) {
            return console.error(error);
        }
    }
});
exports.connectCategoriesDatabase = connectCategoriesDatabase;
