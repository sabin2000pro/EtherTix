import mongoose from "mongoose";

interface IDiscountAttributes {
    discount: Object;
    code: string;
    amountOff: string;
    percentOff: string;
}

interface DiscountDocument extends mongoose.Model<IDiscountAttributes> {
    discount: Object;
    code: string;
    amountOff: string;
    percentOff: string;
}

const DiscountSchema = new mongoose.Schema<DiscountDocument>({

   discount: {

    type: {
        type: String,
        enum: ["access", "coded", "hold", "public"]
    }

   },

   code: {
     type: String,
     default: "abcd"
   },

   amountOff: {
     type: String,
     default: null
   },

   percentOff: {
    type: String,
    default: null
  },

})

export default DiscountSchema;