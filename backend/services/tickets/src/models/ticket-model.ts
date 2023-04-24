import mongoose from "mongoose";
import { ITicketDocument } from "../interface/tickets-interface";

export const TicketSchema = new mongoose.Schema<ITicketDocument>({ 

    name: { 
        type: String,
        minlength: [10, "The ticket name must have at least 10 characters"],
        maxlength: [50, "The ticket name cannot exceed 50 characters"],
        required: [true, "Please specify the name of this ticket"]
    },

    ticketClass: { // The ticket class. VIP ones are the most expensive and basic are the cheapest.
        type: String,
        required: [true, "Please specify the ticket class for this ticket"],
        enum: ["premium", "standard", "basic", "vip"]
    },

    currentStock: { // Number of tickets in stock for an event
        type: Number,
        required: [true, "Please specify how many tickets are currently in stock"],
        minlength: [3, "There must be at least 3 tickets of this type in stock"],
        maxlength: [5, "There must be no more than 5 tickets for this class type"],
        default: 1,
    },

    description: { // Ticket Description for an event
        type: String,
        minlength: [50, "Ticket description must have a minimum of 50 characters"],
        maxlength: [150, "Ticket description cannot exceed 150 characters"],
        required: [true, "Please specify the description for this ticket"]
    },

    price: { // The ticket cost in ETHER
        type: Number,
        required: [true, "Please specify the price of a ticket in ETH"],
        default: 0.010       
    },

    onSaleStatus: { // Ticket on sale status can either be available for sale, sold out or pending
        type: String,
        enum: ["Available", "Sold Out", "Pending"],
        default: 'Pending'
    },

    saleStartsAt: {
        type: Date,
        default: Date.now
    },

    saleEndsAt: { 
        type: Date,
        default: Date.now
    },

    ticketSold: { 
        type: Boolean,
        default: false
    },
        
    issuer: { // Issuer of the ticket
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Please specify the Isser ID"]
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
        required: [true, "Please specify the event ID that belongs to this ticket"]
    }

}, {
    timestamps: true
});

const Ticket = mongoose.model<ITicketDocument>("Ticket", TicketSchema);
export {Ticket} // Export the model