import mongoose from "mongoose";

interface ITicketAttributes { // Interface that stores the ticket data
    name: string,
    ticketClass: string,
    currentStock: number,
    description: string,
    price: number,
    onSaleStatus: string,
    ticketSold: boolean
    saleStartsAt: Date,
    saleEndsAt: Date,
    confirmationMessage: string,
    event: mongoose.Schema.Types.ObjectId,
    issuer: mongoose.Schema.Types.ObjectId,
}
interface ITicketDocument extends mongoose.Model<ITicketAttributes> {
   name: string,
   ticketClass: string,
   capacity: number,
   description: string,
   price: number,
   currentStock: number,
   ticketSold: boolean,
   onSaleStatus: string,
   saleStartsAt: Date,
   saleEndsAt: Date,
   confirmationMessage: string,
   event: mongoose.Schema.Types.ObjectId,
   issuer: mongoose.Schema.Types.ObjectId,
}

export const TicketSchema = new mongoose.Schema<ITicketDocument>({ 

        name: { 
            type: String,
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
            default: 1,
        },

        description: { // Ticket Description for an event
            type: String,
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
        
        issuer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "Please specify the Isser ID"]
        }

}, {
    timestamps: true
});

const Ticket = mongoose.model<ITicketDocument>("Ticket", TicketSchema);
export {Ticket} // Export the model