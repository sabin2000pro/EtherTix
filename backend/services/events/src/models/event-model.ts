import mongoose from "mongoose";

interface EventAttributes { // Interface for the event attributes
    name: string;
    summary: string;
    description: string;
    startAt: Date;
    slug: string;
    createdAt: Date;
    changedAt: Date;
    endsAt: Date;    
    event_url: string;
    isOnline: boolean
    format: string;
    hasSeating: boolean;
    image: string;
    capacity: number;
    salesStatus: string;
    isSoldOut: boolean;
    reservedSeating: boolean;
    eventStatus: string;

    organiser: mongoose.Schema.Types.ObjectId; // Organiser ID (User) of the specific event
    venue: mongoose.Schema.Types.ObjectId; // Venue ID of the specific Event
    ticket: mongoose.Schema.Types.ObjectId; // The Ticket ID of the specific Event
    category: mongoose.Schema.Types.ObjectId; // Category ID of the Specifid Event
}

interface EventDocument extends mongoose.Model<EventAttributes> {
    name: string;
    summary: string;
    description: string;
    startAt: Date;
    slug: string;
    endsAt: Date;
    createdAt: Date;
    image: string;
    changedAt: Date;
    format: string
    isOnline: boolean;
    capacity: number;
    event_url: string;
    reservedSeating: boolean;
    isSoldOut: boolean;
    hasSeating: boolean;
    salesStatus: string;
    eventStatus: string;

    organiser: mongoose.Schema.Types.ObjectId; // Event organiser (User ID)
    venue: mongoose.Schema.Types.ObjectId; // The venue for which an event belongs to
    ticket: mongoose.Schema.Types.ObjectId; // Ticket corresponding to an event
    category: mongoose.Schema.Types.ObjectId;
}

const EventSchema = new mongoose.Schema<EventDocument>({

    name: { // Event Name
        type: String,
        required: [true, "Please specify the name of the event"]
    },

    summary: { // Event Summary
        type: String,
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
        min: [3, "There must be at least 3 minimum people at the event"],
        max: [250, "There cannot be more than 250 people at the current event"]
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
        required: [true, "Please specify the Organiser ID of this event"]
    },

    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "venue",
        required: [true, "Please specify a valid venue ID for this event"]
    },

    ticket: { // Event -> Ticket Relationship
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticket",
        required: [true, "Please specify a valid Ticket ID for this event"]
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: [true, "Please specify a valid Category ID for this event"]
    }


}, {
    timestamps: true,
    toJSON: {virtuals: true}
}) 

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

const Event = mongoose.model<EventDocument>("Event", EventSchema);
export {Event}