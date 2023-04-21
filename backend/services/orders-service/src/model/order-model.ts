import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    
    orderItems: [{

    }]

})

const Order = mongoose.model("Order", OrderSchema);
export {Order}