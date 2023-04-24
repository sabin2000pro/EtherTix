import mongoose from "mongoose";

interface IDiscountAttributes {
    type: string,
    discountCode: string,
    amountOff: string,
    percentOff: string,
    issuer: mongoose.Schema.Types.ObjectId,
    ticket: mongoose.Schema.Types.ObjectId
}
interface DiscountDocument extends mongoose.Model<IDiscountAttributes> {
    type: string
    discountCode: string,
    amountOff: number,
    percentOff: string,
    issuer: mongoose.Schema.Types.ObjectId,
    ticket: mongoose.Schema.Types.ObjectId
}

// Create the Data Model Schema using Mongoose
const DiscountSchema = new mongoose.Schema<DiscountDocument>({

    type: {
        type: String,
        enum: ["access", "coded", "hold", "public"]
    },

    discountCode: { // The discount code to apply when purchasing tickets at the checkout
      type: String,
      default: "abcd",
      required: [true, "Please specify the discount code."]
    },
 
    amountOff: {
        type: Number,
        default: 0.0,
        required: [true, "Please specify the discount amount to take off"]
    },
 
    percentOff: { // Percentage off for the ticket (25%)
        type: String,
        required: [true, "Please specify the percentage to take off the ticket"],
        default: null
    },

    issuer: { // The applier of the ticket (User ID)
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

   ticket: { // The ticket to which the discount applies to
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true
   }
   
}, {timestamps: true, toJSON: {virtuals: true }})

const Discount = mongoose.model<DiscountDocument>("Discount", DiscountSchema);
export {Discount}