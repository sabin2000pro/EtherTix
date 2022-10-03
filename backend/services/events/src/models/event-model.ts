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
    isOnline: Boolean; // True or false if the event is online
    event_logo: string;
    format: Object;
    category: Object;

    maxCapacity: Number;
    minCapacity: Number;

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
    isOnline: Boolean;
    format: Object;
    category: Object;

    maxCapacity: Number;
    minCapacity: Number;
    showRemaining: Boolean;
    ticketAvailability: Object;
    isSoldOut: Boolean;
    searchable: Boolean;
    
    hideStartDate: Boolean;
    hideEndDate: Boolean;
    isLocked: Boolean;
    reservedSeating: Boolean;
    isFree: Boolean;

    eventSalesStatus: Object;
    isPremium: boolean;

    organiser: mongoose.Schema.Types.ObjectId;
    venue: mongoose.Schema.Types.ObjectId;
    ticket: mongoose.Schema.Types.ObjectId;
    issue: mongoose.Schema.Types.ObjectId;
    review: mongoose.Schema.Types.ObjectId;
}

const EventSchema = new mongoose.Schema<EventDocument>({

    name: { // Event Name
        type: String,
        required: [true, "Please specify the name of the event"]
    },

    summary: { // Event Summary
        type: String,
        required: [true, "Please provide a summary for the event"],
        minlength: [25, "Minimum summary length of 25 characters"],
        maxlength: [50, "Maximum length for the summary of 50 characters."],
    },

    description: { // Event Description with text object inside

        text: {
            type: String,
            required: [true, "Please include a description for the event"],
            minlength: [20, "Minimum length for the event text description is 20 characters"],
            maxlength: [100, "Max length for the event description is 100 characters"],
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
        },

        minimumTicketPrice: {

           currency: {
                type: String,
                required: [true, "Please specify the event currency in ether"],
                default: "ETH",
           },

           price: {
             type: Number,
             required: [true, "Please specify the minimum cost of the ticket price in ETH FORMAT"],
             default: 0.024
           }

        },

        maximumTicketPrice: {

            currency: {
                type: String,
                default: "ETH", // The default currency is ETH as this is what payments will be made in using Web3 and meta mask wallet
               },
    
               price: {
                 type: Number,
                 default: 0.0041 // The default price is in ETHER value (0.041 => £50GBP)
               }
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

    eventSalesStatus: { // Enumeration object that stores the status of the event sales. Event can be on sale, not on sale, sale ended, event is sold out or unavailable

        salesStatus: {
            type: String,
            enum: ["on_sale", "not_on_sale", "sale_ended", "sold_out", "unavailable"]
        },

        salesStart: {
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
        ref: "User",
        required: true
    },

    venue: { // Relationship between the event and the venue at which the event is held at (Event -> Venue)
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue",
        required: true
    },

    ticket: [{type: mongoose.Schema.Types.ObjectId, ref: "Ticket"}],
    review: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}]

}, {
    timestamps: true,
    toJSON: {virtuals: true}
}) 

const Event = mongoose.model<EventDocument>("Event", EventSchema);
export {Event}