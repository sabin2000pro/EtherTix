"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
    icon: {
        type: String,
        default: ''
    },
    categoryType: {
        type: String,
        required: [true, "Please specify the category type"],
        default: ''
    },
    isTrending: {
        type: Boolean,
        default: false,
        required: [true, "Please specify whether the category is trending or not"]
    },
    isNew: {
        type: Boolean,
        default: false,
        required: [true, "Please specify whether or not the category is newly created or not"]
    },
    event: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Event",
        required: [true, "Please specify the event that this category belongs to"]
    }
}, { timestamps: true });
const Category = mongoose_1.default.model("Category", CategorySchema);
exports.Category = Category;
