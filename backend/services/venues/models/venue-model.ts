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

        organiser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    }


}) 


const Venue = mongoose.model<IVenueDocument>("Venue", VenueSchema);
export {Venue}