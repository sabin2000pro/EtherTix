import mongoose from "mongoose";

interface IVenueAttributes {
    venue: Object;
}

interface IVenueDocument extends mongoose.Model<IVenueAttributes> {
    venue: Object;
}

const VenueSchema = new mongoose.Schema<IVenueDocument>({

    venue: { // Venue Object

        name: {
            type: String,
            required: [true, "Please include a valid name for the name"]
        },

        slug: String,

        ageRestrictions: { // Venue entry age restriction
            type: String,
            required: [true, "Please include a valid age restriction for the venue"],
            enum: ["AGE_RESTRICTION_ALL_AGES", "AGE_RESTRICTION_MIN_SIXTEEN", "AGE_RESTRICTION_MIN_SEVENTEEN", "AGE_RESTRICTION_MIN_EIGHTEEN", "AGE_RESTRICTION_MIN_TWENTY_ONE"]
        },

        venueCapacity: { // The capacity amount of people in the venue
            type: Number,
            required: [true, "Please specify the capacity of this venue"],
            default: 0
        },

        address: {
            type: String,
            required: [true, 'Please add an address']
          },

          location: {
            // GeoJSON Point
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

        organiser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    }


}) 


const Venue = mongoose.model<IVenueDocument>("Venue", VenueSchema);
export {Venue}