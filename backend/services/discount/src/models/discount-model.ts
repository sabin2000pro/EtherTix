import mongoose from "mongoose";

interface IDiscountAttributes {
    discount: Object;
}
interface DiscountDocument extends mongoose.Model<IDiscountAttributes> {
    discount: Object; // Discount object
}

// Create the Data Model Schema using Mongoose
const DiscountSchema = new mongoose.Schema<DiscountDocument>({

   discount: { // Discount Object

    type: {
        type: String,
        enum: ["access", "coded", "hold", "public"]
    },

    discountCode: { // The discount code
      type: String,
      default: "abcd",
      required: [true, "Please specify the discount code."]
    },
 
    amountOff: { // How much to take off the price in (ETHER)
        type: Number,
        default: null
    },
 
    percentOff: { // Percentage off for the ticket
        type: String,
        default: null
    },

    applier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

   ticket: { // The ticket to which the discount applies to
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true
   },

   event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
   }

   }

   
}, {timestamps: true, toJSON: {virtuals: true }})

const Discount = mongoose.model<DiscountDocument>("Discount", DiscountSchema);
export {Discount}