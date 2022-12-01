import mongoose from "mongoose";

interface EventAttributes { // Interface for the event attributes
    name: string
    summary: string;
    description: Object;
    event_url: string;
    startAt: Date;
    endsAt: Date;
    createdAt: Date;
    changedAt: Date;
    publishedAt: Date;
    event_status: string;
    currency: string;
    isOnline: boolean; // True or false if the event is online
    event_logo: string;
    format: Object;
    category: Object;

    maxCapacity: number;
    minCapacity: number;

    showRemaining: boolean;
    ticketAvailability: Object;
    isSoldOut: boolean;
    searchable: boolean;

    hideStartDate: boolean;
    hideEndDate: boolean;
    isLocked: boolean;
    isFree: boolean;
    isPremium: boolean;

    eventSalesStatus: Object;

    organiser: mongoose.Schema.Types.ObjectId;
    venue: mongoose.Schema.Types.ObjectId;
    ticket: mongoose.Schema.Types.ObjectId
    issue: mongoose.Schema.Types.ObjectId;
    review: mongoose.Schema.Types.ObjectId;

}

interface EventDocument extends mongoose.Model<EventAttributes> {
    name: string;
    summary: string;
    description: Object;
    event_url: string;
    startAt: Date;
    endsAt: Date;
    createdAt: Date;
    publishedAt: Date;
    changedAt: Date;
    event_status: string;
    currency: string;

    event_logo: string;
    isOnline: boolean;
    format: Object;
    category: Object;

    maxCapacity: number;
    minCapacity: number;
    showRemaining: boolean;
    ticketAvailability: Object;
    isSoldOut: boolean;
    searchable: boolean;
    
    hideStartDate: boolean;
    hideEndDate: boolean;
    isLocked: boolean;
    reservedSeating: boolean;
    isFree: boolean;

    eventSalesStatus: Object;
    isPremium: boolean;

    organiser: mongoose.Schema.Types.ObjectId;
    venue: mongoose.Schema.Types.ObjectId;
    ticket: mongoose.Schema.Types.ObjectId;
    issue: mongoose.Schema.Types.ObjectId; // MAPPING: ONE EVENT -> MANY ISSUE SUPPORT TICKETS
    review: mongoose.Schema.Types.ObjectId; // MAPPING: ONE EVENT -> MANY REVIEWS
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

        text: {
            type: String,
            required: [true, "Please include a description for the event"],
            trim: true
        }
    },

    event_url: {
        type: String
    },

    startAt: { // Start Date of the event
        type: Date,
        required: [true, "Please include when the event starts"],
        default: Date.now
    },

    endsAt: { // End date of the event
        type: Date,
        required: [true, "Please include when the event finishes"],
        default: Date.now
    },

    createdAt: { // Time at which the event is created at
        type: Date,
        default: Date.now
    },

    changedAt: {
        type: Date,
        default: Date.now
    },

    event_status: { // Status of the event
        type: String,
        default: "pending",
        enum: ["draft", "live", "started", "ended", "completed", "canceled", "pending"],
        required: [true, "Please specify the status that the event is in"]
    },

    currency: { // The type of currency that the event takes payment in
        type: String,
        required: [true, "Please specify the currency that this event will take payment in"],
        default: 'ETH'
    },

    event_logo: {
        type: String,
        default: 'no-photo.jpg'
    },

    format: { // Event Format

        id: {
            type: String
        },

        name: {
            type: String,
            required: [true, "Please specify the format name"],
            enum: ["Seminar", "Talk", "Conference", "Outdoor", "Indoor", "Party", "Football"]
        }

    },

    category: { // Category object that stores what kind of category this event belongs to

        id: {
            type: String
        },

        name: {
            type: String,
            required: [true, "Please specify the category of the event"],
            enum: ["Food/Drink", "Sports", "Free", "Charity", "Nature", "Talk", "Conference"]
        }

    },

    isOnline: { // Determines if the event is online or not
        type: Boolean,
        required: [true, "Please specify whether or not the event is online"],
        default: false
    },

    maxCapacity: { // Maximum Capacity of people that can attend the event
        type: Number,
        required: [true, "Please specify the maximum number of people that can attend the event"],
        default: 0
    },

    minCapacity: { // Minimum Capacity of people that can attend the event
        type: Number,
        required: [true, "Please specify the minimum number of people that can attend the event"],
        default: 0
    },

    showRemaining: {
        type: Boolean,
        default: false,
        required: [true, "Please specify the number of remaining slots"]
    },

    isPremium: {
        type: Boolean,
        required: [true, "Please specify if the event is premium or not"],
        default: false
    },

    ticketAvailability: {

        hasAvailableTickets: { // Object that stores data about the availability of tickets. True or false is stored
            type: Boolean,
            default: false,
            required: [true, "Please specify if this event has available tickets"]
        }
        
    },

    isLocked: { // True or false if the event is locked or not. If the event is locked, then disable the button to view available times
        type: Boolean,
        default: false,
        required: [true, "Please specify if the event is locked or not"]
    },

    isSoldOut: { // Field that determines if the event is sold out or not
        type: Boolean,
        default: false,
        required: [true, "Please specify if the event is sold out or not"]
    },

    searchable: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if this event is searchable or not"]
    },

    hideStartDate: { // Field that shows when an event starts or not
        type: Boolean,
        default: false,
        required: [true, "Please specify if the event should show when it starts or not"]
    },

    hideEndDate: { // Field that shows when an event starts or not
        type: Boolean,
        default: false,
        required: [true, "Please specify if the event should show when it ends or not"]
    },

    isFree: { // If the event is free or not
        type: Boolean,
        default: false,
        required: [true, "Please specify if the event is free or not"]
    },

    reservedSeating: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if this event has reserved seating or not"]
    },

    eventSalesStatus: { // Enumeration object that stores the status of the event sales. Event can be on sale, not on sale, sale ended, event is sold out or unavailable

        salesStatus: {
            type: String,
            enum: ["on_sale", "not_on_sale", "sale_ended", "sold_out", "unavailable"],
            required: [true, "Please specify the sales status of the event."]
        },

        salesStart: { // Start date of the ticket sales
            type: Date,
            default: Date.now
        },

        salesEnd: {
            type: Date,
            default: Date.now
        }
    },

    organiser: { // Relationship between the event and the venue at which the event is held at (Event -> Venue)
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    venue: { // Relationship between the event and the venue at which the event is held at (Event -> Venue)
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue"
    },

    ticket: [{type: mongoose.Schema.Types.ObjectId, ref: "Ticket"}],
    review: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}]

}, {
    timestamps: true,
    toJSON: {virtuals: true}
}) 

// Virtual populate
EventSchema.virtual('tickets', {
    ref: 'Ticket',
    foreignField: 'ticket',
    localField: '_id'
});

EventSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'review',
    localField: '_id'
});

EventSchema.virtual('venues', {
    ref: 'Venue',
    foreignField: 'venue',
    localField: '_id'
});

const Event = mongoose.model<EventDocument>("Event", EventSchema);
export {Event}