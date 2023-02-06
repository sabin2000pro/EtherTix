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
        required: [true, "Please specify the ticket class for this ticket"],
        enum: ["premium", "standard", "basic", "vip"]
    },
    ticketToken: {
        type: String,
        required: [true, "Please specify how this ticket is going to be delivered"],
        enum: ["Barcode", "QR Code", "Image", "PDF"]
    },
    capacity: {
        type: Number,
        required: [true, "Please specify how many tickets can be placed for sale"],
        default: 1,
        min: [1, "At least one single ticket must be placed for sale"],
        max: [10, "You cannot place more than 10 tickets for sale at once"]
    },
    quantityPurchase: {
        type: Number,
        required: [true, "Please specify how many tickets can be bought at a single time"],
        default: 1,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        required: [true, "Please specify the description for this ticket"]
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
        required: [true, "Please specfify whether or not the event is available, sold out or pending to start"]
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
    event: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "event"
        }],
    issuer: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "user"
        }],
    venue: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "venue"
        }]
}, {
    timestamps: true
});
const Ticket = mongoose_1.default.model("Ticket", TicketSchema);
exports.Ticket = Ticket;
