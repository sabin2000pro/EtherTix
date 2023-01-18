"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please specify the name of the category you want to create"],
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    categoryType: {
        type: String,
        required: [true, "Please specify the category type"],
        default: ''
    }
}, { timestamps: true });
const Category = mongoose_1.default.model("Category", CategorySchema);
exports.Category = Category;
