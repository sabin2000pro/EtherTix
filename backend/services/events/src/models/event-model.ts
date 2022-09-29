import mongoose from "mongoose";

interface EventAttributes {
    name: string
    summary: string;
    description: string;
    event_url: string;
    startAt: Date;
    endsAt: Date;
    createdAt: Date;
    changedAt: Date;
    publishedAt: Date;
    event_status: string;
    currency: string;
    isOnline: Boolean;
    event_logo: string;
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
    isFree: Boolean;

    eventSalesStatus: Object;

    organiser: mongoose.Schema.Types.ObjectId;
    venue: mongoose.Schema.Types.ObjectId;
    ticket: mongoose.Schema.Types.ObjectId;
    issue: mongoose.Schema.Types.ObjectId;
    review: mongoose.Schema.Types.ObjectId;

}

interface EventDocument extends mongoose.Model<EventAttributes> {
    name: string;
    summary: string;
    description: string
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

    organiser: mongoose.Schema.Types.ObjectId;
    venue: mongoose.Schema.Types.ObjectId;
    ticket: mongoose.Schema.Types.ObjectId;
    issue: mongoose.Schema.Types.ObjectId;
    review: mongoose.Schema.Types.ObjectId;
}

const EventSchema = new mongoose.Schema<EventDocument>({

    name: {
        type: String,
        required: [true, "Please specify the name of the event"]
    },

    summary: {
        type: String,
        required: [true, "Please provide a summary for the event"],
        minlength: [25, "Minimum summary length of 25 characters"],
        maxlength: [50, "Maximum length for the summary of 50 characters."],
    },

    description: {

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
        enum: ["draft", "live", "started", "ended", "completed", "canceled"],
        required: [true, "Please specify the status that the event is in"]
    },

    currency: {
        type: String,
        required: [true, "Please specify the currency that this event will take payment in"],
        default: 'ETH'
    },

    event_logo: {
        type: String,
        required: [true, "Please upload a valid event logo"],
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
            enum: ["Food / Drink", "Sports", "Free", "Charity", ""]
        }

    },

    isOnline: { // Determines if the event is online or not
        type: Boolean,
        required: [true, "Please specify whether or not the event is online"],
        default: false
    },

    maxCapacity: {
        type: Number,
        required: [true, "Please specify the maximum number of people that can attend the event"],
        default: 100
    },

    minCapacity: {
        type: Number,
        required: [true, "Please specify the minimum number of people that can attend the event"],
        default: 20
    },

    showRemaining: {
        type: Boolean,
        default: false
    },

    ticketAvailability: {

        hasAvailableTickets: {
            type: Boolean,
            default: false,
            required: [true, "Please specify if this event has available tickets"]
        },

        minimumTicketPrice: {

           currency: {
                type: String,
                required: [true, "Please specify the maximum cost of the ticket price in ETH FORMAT"],
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

    isLocked: {
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


    eventSalesStatus: {

        salesStatus: {
            type: String,
            enum: ["on_sale", "not_on_sale", "sale_ended", "sold_out", "unavailable"]
        },

        salesStart: {
            timezone: {
                type: String
            },

            utc: {
                type: String
            }

        }
    },

    organiser: { // Relationship between the event and organiser of the event (user) (Event -> Organiser ID)
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    venue: { // Relationship between the event and the venue at which the event is held at (Event -> Venue)
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue",
        required: true
    },

    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    },

    issue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
        required: true
    },

    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required: true
    }

}, {
    timestamps: true
}) 

export default EventSchema;