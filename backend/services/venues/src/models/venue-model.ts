import mongoose from "mongoose";
import { IVenueDocument } from "../types/venue-types";

const VenueSchema = new mongoose.Schema<IVenueDocument>({

        name: { // Name of the venue that will be created
            type: String,
            trim: true,
            required: [true, "Please include a valid name for the venue"],
            maxlength: 64,
            minlength: 6
        },
        
        slug: String,
  
        website: { // Website URL of the venue
          type: String,
          match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Please use a valid URL with HTTP or HTTPS']
        },

        email: {
          type: String,
          required: [true, "Please specify the e-mail address of the venue"]
        },

        phone: { // Phone number for the venue
          type: String,
          max: [20, 'Phone number can not be longer than 20 characters'],
          min: [6, "Phone number must have at least 6 characters"]
        },

        ageRestriction: { // Venue entry age restriction
            type: String,
            required: [true, "Please include a valid age restriction for the venue"],
            enum: ["AGE_RESTRICTION_ALL_AGES", "AGE_RESTRICTION_MIN_SIXTEEN", "AGE_RESTRICTION_MIN_SEVENTEEN", "AGE_RESTRICTION_MIN_EIGHTEEN", "AGE_RESTRICTION_MIN_TWENTY_ONE"]
        },

        venueCapacity: { // The capacity amount of people in the venue
            type: Number,
            required: [true, "Please specify the capacity of this venue"],
            default: 0
        },

        openTime: { 
           type: Date,
           default: Date.now,
           required: [true, "Please specify the date at which the venue opens"]
        },

        closeTime: {  // The current time at which the venue shuts
           type: Date,
           default: Date.now,
           required: [true, "Please specify the date at which the closes"]
        },

        hasPublicAccess: { // Field that identifies if the venue allows public access or not
           type: Boolean,
           required: [true, "Please specify if the venue has public access or not"],
           default: false
        },

        smokingAllowed: { // Field identifies if smoking is allowed at the venue grounds
           type: Boolean,
           required: [true, "Please specify if smoking is allowed at the venue"],
           default: false
        },

        photo: { // Photo field is useful to show how the venue looks like before purchasing tickets
           type: String,
           default: 'no-photo.jpg'
        },

        address: { // Address of the venue
            type: String,
            required: [true, 'Please add a valid address for the venue']
          },

          location: { // GeoJSON Point For the location
            
            type: {
               type: String,
               enum: ['Point']
            },

            coordinates: { // Coordinates of the venue that will be used for real-time map functionality
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

          createdAt: { // The date at which the event was created
            type: Date,
            default: Date.now
          },

        event: { // One venue can have multiple events being hosted at different dates
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
          required: [true, "Please specify a valid Event ID which is being hosted at this event at a given time"]
        }

}, {

  timestamps: true,
  toJSON: {virtuals: true}
}) 

VenueSchema.virtual('events', {
  ref: 'Event',
  foreignField: 'event',
  localField: '_id'
});

// Middleware to geocode the address for the venue that the event is being held at.

VenueSchema.pre('save', async function(next) {

})


const Venue = mongoose.model<IVenueDocument>("Venue", VenueSchema);
export {Venue}