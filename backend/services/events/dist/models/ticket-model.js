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
        required: [true, "Please specify the name of the ticket class"],
        default: null
    },
    ticketClass: {
        type: String,
        required: [true, "Please specify the ticket class for this event"],
        enum: ["premium", "standard", "basic", "vip"]
    },
    ticketToken: {
        type: String,
        required: [true, "Please specify the format of the ticket"],
        enum: ["Barcode", "QR Code", "Image", "PDF"]
    },
    capacity: {
        type: Number,
        required: [true, "Please specify the number of tickets available for sale"],
        default: 0,
    },
    minimumQuantityPurchase: {
        type: Number,
        required: [true, "Please specify the minimum number of tickets that can be purchased for this event"],
        default: 1
    },
    maximumQuantityPurchase: {
        type: Number,
        required: [true, "Please specify the maximum number of tickets that can be purchased for this event"],
        default: 5
    },
    description: {
        type: String,
        required: [true, "Provide a valid description for the ticket"]
    },
    cost: {
        type: Number,
        required: [true, "Please specify how much the ticket costs"],
        default: 0.010
    },
    isFree: {
        type: Boolean,
        required: [true, "Please specify if the ticket is free or not"],
        default: false
    },
    deliveryMethods: {
        type: String,
        required: [true, "Please specify the type of delivery method"],
        default: "SMS",
        enum: ["Will Call", "SMS", "Electronic", "E-mail"]
    },
    onSaleStatus: {
        type: String,
        enum: ["AVAILABLE", "SOLD_OUT", "PENDING"],
        required: [true, "Please specify the on sale status of the ticket"]
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
        required: [true, "Please specify the confirmation message for the purchased event ticket"],
        minlength: [10, "Minimum of 10 characters for the confirmation message"],
        maxlength: [200, "Confirmation message cannot exceed 200 characters"]
    },
    ticketSold: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if the ticket has been sold or not"]
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
    timestamps: true,
    toJSON: { virtuals: true }
});
const Ticket = mongoose_1.default.model("ticket", TicketSchema);
exports.Ticket = Ticket;
