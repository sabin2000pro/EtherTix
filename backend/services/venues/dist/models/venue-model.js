"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venue = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const VenueSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please include a valid name for the venue"],
        maxlength: 64,
        minlength: 6
    },
    slug: {
        type: String
    },
    website: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    ageRestriction: {
        type: String,
        required: [true, "Please include a valid age restriction for the venue"],
        enum: ["AGE_RESTRICTION_ALL_AGES", "AGE_RESTRICTION_MIN_SIXTEEN", "AGE_RESTRICTION_MIN_SEVENTEEN", "AGE_RESTRICTION_MIN_EIGHTEEN", "AGE_RESTRICTION_MIN_TWENTY_ONE"]
    },
    venueCapacity: {
        type: Number,
        required: [true, "Please specify the capacity of this venue"],
        default: 0
    },
    openTime: {
        type: Date,
        default: Date.now
    },
    closeTime: {
        type: Date,
        default: Date.now
    },
    hasPublicAccess: {
        type: Boolean,
        required: [true, "Please specify if the venue has public access or not"],
        default: false
    },
    smokingAllowed: {
        type: Boolean,
        required: [true, "Please specify if smoking is allowed at the venue"],
        default: false
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    address: {
        type: String,
        required: [true, 'Please add a valid address for the venue']
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    organiser: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    event: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Event" }],
    ticket: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Ticket" }]
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});
VenueSchema.virtual('events', {
    ref: 'Event',
    foreignField: 'event',
    localField: '_id'
});
const Venue = mongoose_1.default.model("Venue", VenueSchema);
exports.Venue = Venue;
