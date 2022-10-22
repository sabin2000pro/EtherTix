"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discount = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
// Create the Data Model Schema using Mongoose
var DiscountSchema = new mongoose_1.default.Schema({
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
            type: String,
            default: null
        },
        percentOff: {
            type: String,
            default: null
        },
        ticket: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Ticket"
        },
        event: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Event"
        }
    }
}, { timestamps: true });
var Discount = mongoose_1.default.model("Discount", DiscountSchema);
exports.Discount = Discount;
