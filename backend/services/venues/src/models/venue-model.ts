import mongoose from "mongoose";
import geocoder from "node-geocoder";
interface IVenueAttributes {
    venue: Object;
    name: string;
    slug: string;
    email: string; // E-mail Address of the venue
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

    organiser: mongoose.Schema.Types.ObjectId
    event: mongoose.Schema.Types.ObjectId
    ticket: mongoose.Schema.Types.ObjectId
}

interface IVenueDocument extends mongoose.Model<IVenueAttributes> {
    name: string;
    slug: string;
    venue: Object;
    phone: string;
    email: string;
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
          default: Date.now
        },

        closeTime: {  // Closing time of the venue
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

        address: { // Address of the venue
            type: String,
            required: [true, 'Please add a valid address for the venue']
          },

          location: { // GeoJSON Point For the location
            
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

        organiser: { // Event Venue Organiser
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        event: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event"
        },

        ticket: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "ticket"
        }]

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