"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TicketSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    ticketClass: {
        type: String,
        required: true,
        enum: ["premium", "standard", "basic", "vip"]
    },
    ticketToken: {
        type: String,
        required: true,
        enum: ["Barcode", "QR Code", "Image", "PDF"]
    },
    capacity: {
        type: Number,
        required: true,
        default: 0,
    },
    minimumQuantityPurchase: {
        type: Number,
        required: true,
        default: 1
    },
    maximumQuantityPurchase: {
        type: Number,
        required: true,
        default: 5
    },
    description: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true,
        default: 0.010
    },
    isFree: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveryMethods: {
        type: String,
        required: true,
        default: "SMS",
        enum: ["Will Call", "SMS", "Electronic", "E-mail"]
    },
    onSaleStatus: {
        type: String,
        enum: ["AVAILABLE", "SOLD_OUT", "PENDING"],
        required: true
    },
    saleStartsAt: {
        type: Date,
        default: Date.now
    },
    saleEndsAt: {
        type: Date,
        default: Date.now
    },
    confirmationMessage: {
        type: String,
        required: true,
        minlength: [10, "Minimum of 10 characters for the confirmation message"],
        maxlength: [200, "Confirmation message cannot exceed 200 characters"]
    },
    ticketSold: {
        type: Boolean,
        default: false
    },
    event: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Event"
    },
    issuer: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});
const Ticket = mongoose_1.default.model("Ticket", TicketSchema);
exports.Ticket = Ticket;
