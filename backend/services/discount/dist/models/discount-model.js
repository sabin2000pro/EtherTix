"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discount = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Create the Data Model Schema using Mongoose
const DiscountSchema = new mongoose_1.default.Schema({
    discount: {
        type: {
            type: String,
            enum: ["access", "coded", "hold", "public"]
        },
        discountCode: {
            type: String,
            default: "abcd",
            required: [true, "Please specify the discount code."]
        },
        amountOff: {
            type: Number,
            default: null
        },
        percentOff: {
            type: String,
            required: [true, "Please specify the percentage to take off the ticket"],
            default: null
        },
        applier: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        ticket: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Ticket",
            required: true
        },
        event: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        }
    }
}, { timestamps: true, toJSON: { virtuals: true } });
const Discount = mongoose_1.default.model("Discount", DiscountSchema);
exports.Discount = Discount;
