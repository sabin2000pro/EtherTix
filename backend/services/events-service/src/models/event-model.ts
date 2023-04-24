import mongoose from "mongoose";
import { EventDocument } from "../interface/event-interface";

const EventSchema = new mongoose.Schema<EventDocument>({

    name: { // Event Name
        type: String,
        minlength: [10, "Event name must have at least 10 characters"],
        maxlength: [100, "Event name cannot exceed 100 characters"],
        required: [true, "Please specify the name of the event"],
        unique: true
    },

    summary: { // Event Summary
        type: String,
        minlength: [50, "Event summary must have at least 12 characters"],
        maxlength: [150, "Event summary cannot exceed 150 characters"],
        required: [true, "Please provide a summary for the event"]
    },

    description: { // Event Description with text object inside    
        type: String,
        required: [true, "Please include a description for the event"],
        trim: true
    },

    event_url: {
        type: String
    },
    
    slug: String,

    startAt: { // Start Date of the event
        type: Date,
        required: [true, "Please include when the event is going to start"],
        default: Date.now
    },

    endsAt: { // End date of the event
        type: Date,
        required: [true, "Please include when the event is going to end"],
        default: Date.now
    },

    eventStatus: { // Status of the event
        type: String,
        default: "pending",
        enum: ["draft", "live", "started", "completed", "canceled", "pending"],
        required: [true, "Please specify the status that the event is in"]
    },

    image: {
        type: String,
        default: 'no-photo.jpg'
    },

    format: {
        type: String,
        required: [true, "Please specify the format that the event holds"],
        enum: ["Seminar", "Talk", "Conference", "Outdoor", "Indoor", "Party", "Football"]
    },

    isOnline: { // Determines if the event is online or not
        type: Boolean,
        required: [true, "Please specify whether or not the event is online"],
        default: false
    },

    capacity: { // Capacity that the event holds
        type: Number,
        required: [true, "Please specify the maximum number of people that can attend the event"],
        minlength: [3, "There must be at least 3 minimum people at the event"],
        maxlength: [250, "There cannot be more than 250 people at the current event"]
    },

    hasSeating: {
        type: Boolean,
        required: [true, "Please specify if the event has seating or not"],
        default: false
    },

    isSoldOut: { // Field that determines if the event is sold out or not
        type: Boolean,
        default: false,
    },

    reservedSeating: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if this event has reserved seating or not"]
     },

    salesStatus: {
        type: String,
        enum: ["on_sale", "not_on_sale", "pending", "sale_ended", "sold_out", "unavailable"],
        required: [true, "Please specify the sales status of the event."]
    },

    createdAt: { // Time at which the event is created at
        type: Date,
        default: Date.now
    },

    changedAt: {
        type: Date,
        default: Date.now
    },
    
    organiser: { // Relationship between the event and the venue at which the event is held at (Event -> Venue)
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Please specify the organiser ID for this event"]
    },

    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "venue",
        required: [true, "Please specify the venue ID this event belongs to"]
    },

    tickets: [{ // Event -> Ticket Relationship
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticket",
        required: [true, "Please specify a valid Ticket ID for this event"]
    }]


}, {
    timestamps: true,
    toJSON: {virtuals: true}
}) 

const Event = mongoose.model<EventDocument>("Event", EventSchema);
export {Event}