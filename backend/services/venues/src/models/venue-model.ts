import mongoose from "mongoose";
import geocoder from "node-geocoder";

interface IVenueAttributes {
    name: string;
    slug: string;
    venueCapacity: number;
    phone: string;
    ageRestriction: string;
    openTime: Date,
    closeTime: Date,
    hasPublicAccess: boolean;
    smokingAllowed: boolean;
    photo: string;
    createdAt: Date;
    website: string;
    location: Object;
    address: string

    organiser: mongoose.Schema.Types.ObjectId // Organiser -> Venue Relationship
    event: mongoose.Schema.Types.ObjectId
    ticket: mongoose.Schema.Types.ObjectId
}

interface IVenueDocument extends mongoose.Model<IVenueAttributes> {
    name: string;
    slug: string;
    venue: Object;
    phone: string;
    website: string;
    openTime: Date;
    closeTime: Date;
    hasPublicAccess: boolean;
    smokingAllowed: boolean;
    photo: string;
    createdAt: Date;

    venueCapacity: number;
    ageRestriction: string;
    address: string;
    location: Object;
    organiser: mongoose.Schema.Types.ObjectId
    event: mongoose.Schema.Types.ObjectId
    ticket: mongoose.Schema.Types.ObjectId
}

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

        openTime: { // The opening time of the venue
           type: Date,
           default: Date.now,
           required: [true, "Please specify the date at which the Venue Opens"]
        },

        closeTime: {  // The current time at which the venue shuts
           type: Date,
           default: Date.now,
           required: [true, "Please specify the date at which the shuts"]
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

        organiser: { // Event Venue Organiser: One venue at a time can have only one organiser
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please specify the Organiser ID at this Venue"]
        },

        event: { // One venue can have multiple events being hosted at different dates
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
          required: [true, "Please specify a valid Event ID which is being hosted at this event at a given time"]
        },

        ticket: { // One venue can have many tickets available associated to it
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ticket",
          required: [true, "Please specify a valid Ticket ID for this venue"]
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

const Venue = mongoose.model<IVenueDocument>("Venue", VenueSchema);
export {Venue}