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

    code: { // The discount code
      type: String,
      default: "abcd"
    },
 
    amountOff: { // How much to take off the price in (ETHER)
      type: String,
      default: null
    },
 
    percentOff: {
     type: String,
     default: null
   }

   }


})

const Discount = mongoose.model<DiscountDocument>("Discount", DiscountSchema);
export {Discount}