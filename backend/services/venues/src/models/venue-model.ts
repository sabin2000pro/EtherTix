import mongoose from "mongoose";
import geocoder from "node-geocoder";

interface IVenueAttributes {
    venue: Object;
    location: Object;
    address: string
}

interface IVenueDocument extends mongoose.Model<IVenueAttributes> {
    venue: Object;
    address: string;
    location: Object;
}

const VenueSchema = new mongoose.Schema<IVenueDocument>({

    venue: { // Venue Object

        name: {
            type: String,
            required: [true, "Please include a valid name for the name"]
        },
        
        slug: String,
  
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
          default: false
        },

        smokingAllowed: {
          type: Boolean,
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

        event: [{type: mongoose.Schema.Types.ObjectId, ref: "Event"}]

    }


}) 

// Geocode & create location field
VenueSchema.pre('save', async function(next) {

  const loc = await geocoder.geocode(this.address);

  this.location = {

    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };

  // Do not save address in DB
  this.address = undefined;
  return next();
});



// Virtual populate
VenueSchema.virtual('Organiser', {
  ref: 'User',
  foreignField: 'user',
  localField: '_id'
});

VenueSchema.virtual('events', {
  ref: 'Event',
  foreignField: 'event',
  localField: '_id'
});


const Venue = mongoose.model<IVenueDocument>("Venue", VenueSchema);
export {Venue}