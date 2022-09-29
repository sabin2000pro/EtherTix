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

    organiser: mongoose.Schema.Types.ObjectId;
    venue: mongoose.Schema.Types.ObjectId;
    ticket: mongoose.Schema.Types.ObjectId;
    issue: mongoose.Schema.Types.ObjectId;

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
    
    organiser: mongoose.Schema.Types.ObjectId;
    venue: mongoose.Schema.Types.ObjectId;
    ticket: mongoose.Schema.Types.ObjectId;
    issue: mongoose.Schema.Types.ObjectId;
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

    category: {

        id: {
            type: String
        },

        name: {
            type: String,
            required: [true, "Please specify the category of the event"],
            enum: ["Food / Drink", "Sports", "Free", "Charity", ""]
        }
    },

    isOnline: {
        type: Boolean,
        required: [true, "Please specify whether or not the event is online"],
        default: false
    },

    organiser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

}, {
    timestamps: true
}) 

export default EventSchema;