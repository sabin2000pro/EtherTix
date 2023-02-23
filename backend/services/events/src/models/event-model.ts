import mongoose from "mongoose";
interface EventAttributes { // Interface for the event attributes
    name: string
    summary: string;
    description: string;
    event_url: string;
    startAt: Date;
    endsAt: Date;
    createdAt: Date;
    changedAt: Date;
    publishedAt: Date;
    eventStatus: string;
    currency: string;
    isOnline: boolean; // True or false if the event is online
    event_logo: string;
    eventLocation: string;
    format: string;
    capacity: number;
    slotsAvailable: boolean;
    hasSeating: boolean;
    slug: string;
    hasAvailableTickets: boolean;
    isSoldOut: boolean;
    searchable: boolean;
    averageRating: number;
    averageCost: number
    hideStartDate: boolean;
    hideEndDate: boolean;
    isLocked: boolean;
    isFree: boolean;
    isPremium: boolean;
    salesStatus: string,
    eventSchedule: any,
    isTrending: boolean;
    salesStart: Date,
    salesEnd: Date
    likes: [],
    followers: [],
    bookmarks: [],

    organiser: mongoose.Schema.Types.ObjectId; // Organiser ID (User) of the specific event
    venue: mongoose.Schema.Types.ObjectId; // Venue ID of the specific Event
    ticket: mongoose.Schema.Types.ObjectId; // The Ticket ID of the specific Event
    category: mongoose.Schema.Types.ObjectId; // Category ID of the Specifid Event
}
interface EventDocument extends mongoose.Model<EventAttributes> {
    name: string;
    summary: string;
    description: string;
    event_url: string;
    startAt: Date;
    endsAt: Date;
    createdAt: Date;
    publishedAt: Date;
    changedAt: Date;
    eventStatus: string;
    hasSeating: boolean;
    currency: string;
    event_logo: string;
    slug: string;
    averageRating: number;
    averageCost: number
    isOnline: boolean;
    format: string;
    capacity: number;
    eventLocation: string;
    eventSchedule: any;
    minCapacity: number;
    slotsAvailable: boolean;
    hasAvailableTickets: boolean;
    isSoldOut: boolean;
    searchable: boolean;
    hideStartDate: boolean;
    hideEndDate: boolean;
    isLocked: boolean;
    reservedSeating: boolean;
    isFree: boolean;
    salesStatus: string;
    salesStart: Date;
    salesEnd: Date;
    isPremium: boolean;
    likes: [];
    followers: [];

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
    
    // eventLocation: {
    //     type: String,
    //     required: [true, "Please specify the location of the event"]
    // },

    slug: String,

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

    eventStatus: { // Status of the event
        type: String,
        default: "pending",
        enum: ["draft", "live", "started", "ended", "completed", "canceled", "pending"],
        required: [true, "Please specify the status that the event is in"]
    },

    // eventSchedule: { // Schedule 

    //     hostName: { // Host name of the event (Mike Andrews)
    //         type: String,
    //         required: [true, "Please specify the host name of the event"]
    //     },
        
    //     performanceTime: { // Time at which the host of the event is performing
    //         type: Date,
    //         default: Date.now
    //     },

    //     isVIP: { // Is the performer a VIP or not
    //         type: Boolean,
    //         default: false,
    //         required: [true, "Please specify if the host of the event is a VIP or not"]
    //     }

    // },

    currency: { // The type of currency that the event takes payment in
        type: String,
        required: [true, "Please specify the currency that this event will take payment in"],
        enum: ['GBP', 'ETH'],
        default: 'ETH'
    },

    event_logo: {
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

    capacity: {
        type: Number,
        required: [true, "Please specify the maximum number of people that can attend the event"],
        min: [3, "There must be at least 3 minimum people at the event"],
        max: [250, "There cannot be more than 250 people at the current event"]
    },

    // hasSeating: {
    //     type: Boolean,
    //     required: [true, "Please specify if the event has seating or not"]
    // },

    slotsAvailable: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if there are any available slots left for this event"]
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

    averageRating: {
        type: Number,
        default: 0
    },

    averageCost: {
        type: Number,
        default: 0
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

        salesStatus: {
            type: String,
            enum: ["on_sale", "not_on_sale", "pending", "sale_ended", "sold_out", "unavailable"],
            required: [true, "Please specify the sales status of the event."]
        },

        salesStart: { // Start date of event ticket sales
            type: Date,
            default: Date.now
        },

        salesEnd: { // The date at which the event ticket sales end
            type: Date,
            default: Date.now
        },

        likes: [],
        followers: [],

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

    // review: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Review",
    //     required: [true, "Please specifgy a valid Review ID for this event"]
    // }

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