"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EventSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please specify the name of the event"]
    },
    summary: {
        type: String,
        required: [true, "Please provide a summary for the event"]
    },
    description: {
        type: String,
        required: [true, "Please include a description for the event"],
        trim: true
    },
    event_url: {
        type: String
    },
    slug: String,
    startAt: {
        type: Date,
        required: [true, "Please include when the event starts"],
        default: Date.now
    },
    endsAt: {
        type: Date,
        required: [true, "Please include when the event finishes"],
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    changedAt: {
        type: Date,
        default: Date.now
    },
    event_status: {
        type: String,
        default: "pending",
        enum: ["draft", "live", "started", "ended", "completed", "canceled", "pending"],
        required: [true, "Please specify the status that the event is in"]
    },
    currency: {
        type: String,
        required: [true, "Please specify the currency that this event will take payment in"],
        default: 'ETH'
    },
    event_logo: {
        type: String,
        default: 'no-photo.jpg'
    },
    format: {
        type: String,
        required: [true, "Please specify the format name"],
        enum: ["Seminar", "Talk", "Conference", "Outdoor", "Indoor", "Party", "Football"]
    },
    isOnline: {
        type: Boolean,
        required: [true, "Please specify whether or not the event is online"],
        default: false
    },
    capacity: {
        type: Number,
        required: [true, "Please specify the maximum number of people that can attend the event"],
        min: [3, "There must be at least 3 minimum people at the event"],
        max: [150, "There cannot be more than 150 people at the current event"]
    },
    showRemaining: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if there are any remaining slots for this event"]
    },
    isPremium: {
        type: Boolean,
        required: [true, "Please specify if the event is premium or not"],
        default: false
    },
    hasAvailableTickets: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if this event has available tickets"]
    },
    isLocked: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if the event is locked or not"]
    },
    isSoldOut: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if the event is sold out or not"]
    },
    searchable: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if this event is searchable or not"]
    },
    hideStartDate: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if the event should show when it starts or not"]
    },
    hideEndDate: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if the event should show when it ends or not"]
    },
    isFree: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if the event is free or not"]
    },
    reservedSeating: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if this event has reserved seating or not"]
    },
    salesStatus: {
        type: String,
        enum: ["on_sale", "not_on_sale", "sale_ended", "sold_out", "unavailable"],
        required: [true, "Please specify the sales status of the event."]
    },
    salesStart: {
        type: Date,
        default: Date.now
    },
    salesEnd: {
        type: Date,
        default: Date.now
    },
    likes: [],
    followers: [],
    organiser: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please specify the Organiser ID of this event"]
    },
    venue: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Venue",
        required: [true, "Please specify a valid venue ID for this event"]
    },
    ticket: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Ticket",
        required: [true, "Please specify a valid Ticket ID for this event"]
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Please specify a valid Category ID for this event"]
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});
// Virtual populate
EventSchema.virtual('tickets', {
    ref: 'ticket',
    foreignField: 'Ticket',
    localField: '_id'
});
EventSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'Review',
    localField: '_id'
});
EventSchema.virtual('venues', {
    ref: 'Venue',
    foreignField: 'Venue',
    localField: '_id'
});
const Event = mongoose_1.default.model("Event", EventSchema);
exports.Event = Event;
