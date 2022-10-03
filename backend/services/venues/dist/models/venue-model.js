"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venue = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var VenueSchema = new mongoose_1.default.Schema({
    venue: {
        name: {
            type: String,
            required: [true, "Please include a valid name for the name"]
        },
        slug: String,
        ageRestrictions: {
            type: String,
            required: [true, "Please include a valid age restriction for the venue"],
            enum: ["AGE_RESTRICTION_ALL_AGES", "AGE_RESTRICTION_MIN_SIXTEEN", "AGE_RESTRICTION_MIN_SEVENTEEN", "AGE_RESTRICTION_MIN_EIGHTEEN", "AGE_RESTRICTION_MIN_TWENTY_ONE"]
        },
        venueCapacity: {
            type: Number,
            required: [true, "Please specify the capacity of this venue"],
            default: 0
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
        }
    }
});
var Venue = mongoose_1.default.model("Venue", VenueSchema);
exports.Venue = Venue;
