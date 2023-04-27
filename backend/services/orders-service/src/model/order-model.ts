import { IOrderDocument } from './../interfaces/orders-interface';
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema<IOrderDocument>({

    orderItems: [{

        name: { // Name of the product being ordered
            type: String,
            required: [true, "Please provide the ticket name as part of the order items"]
        },

        quantity: {
            type: Number,
            default: 0,
            required: [true, "Please include the quantity of the ticket that belongs to this order item"]
        },
    
        ticketPrice: {
            type: Number,
            default: 0.0,
            required: [true, "Please specify the cost of the ticket that belongs to this order"]
        },
    
        taxPrice: {
            type: Number,
            default: 0.0,
            required: [true, "Please specify the tax price associated with this ticket that is part of the order"]
        },
    
        shippingPrice: {
            type: Number,
            default: 0.0,
            required: [true, "Please specify the shipping price associated with this ticket"]
        },

        ticket: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
            required: [true, "Please specify the Ticket ID that belongs to this order"]
          }

    }],

    shippingInformation: {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please specify the User ID that belongs to this order"]
        },

        address: {
            type: String,
            required: [true, "Please specify the shipping address for this order"],
            default: ""
        },

        city: {
            type: String,
            required: [true, "Specify the city for this order"],
            default: ""  
        },

        phoneNo: {
            type: String,
            required: [true, "Please specify your phone number for this order"],
            default: ''
        },

        postalCode: {
            type: String,
            required: [true, "Please specify the postal code for this order"],
            default: ''
        }

    },

    orderStatus: { // The status the order is in. It can take 6 values as outlined below
        type: String,
        enum: ['received', 'pending', 'completed', 'processing', 'canceled', 'refunded'],
        default: 'received' // By default, when an order is placed, it is received
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    paidAt: { // Date at which the order has been paid at
        type: Date,
        default: Date.now
    }

})

const Order = mongoose.model<IOrderDocument>("Order", OrderSchema);
export {Order}