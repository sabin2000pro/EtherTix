import mongoose from "mongoose";

interface ITicketAttributes {
    name: String,
    ticketClass: String,
    ticketToken: String,
    capacity: Number,
    minimumQuantityPurchase: Number,
    maximumQuantityPurchase: Number,
    description: String,
    cost: Number,
    isFree: Boolean,
    deliveryMethods: String,
    onSaleStatus: String,
    saleStartsAt: Date,
    saleEndsAt: Date,
    confirmationMessage: String,
    ticketSold: Boolean,
    event: mongoose.Schema.Types.ObjectId,
    issuer: mongoose.Schema.Types.ObjectId
}

interface ITicketDocument extends mongoose.Model<ITicketAttributes> {
   name: String,
   ticketClass: String,
   ticketToken: String,
   capacity: Number,
   minimumQuantityPurchase: Number,
   maximumQuantityPurchase: Number,
   description: String,
   cost: Number,
   isFree: Boolean,
   deliveryMethods: String,
   onSaleStatus: String,
   saleStartsAt: Date,
   saleEndsAt: Date,
   confirmationMessage: String,
   ticketSold: Boolean,
   event: mongoose.Schema.Types.ObjectId,
   issuer: mongoose.Schema.Types.ObjectId
}

const TicketSchema = new mongoose.Schema<ITicketDocument>({ // Ticket Data Schema Model
        name: { // Name of the ticket
            type: String,
            required: true
        },

        ticketClass: { // The ticket class. VIP ones are the most expensive and basic are the cheapest.
            type: String,
            required: true,
            enum: ["premium", "standard", "basic", "vip"]
        },

        ticketToken: { // The format of the ticket that will be sent to the buyer
            type: String,
            required: true,
            enum: ["Barcode", "QR Code", "Image", "PDF"]
        },

        capacity: { // Number of tickets for sale (0, 1, 2,3)
            type: Number,
            required: true,
            default: 0,
        },

        minimumQuantityPurchase: {
            type: Number,
            required: true,
            default: 1
        },

        maximumQuantityPurchase: {
            type: Number,
            required: true,
            default: 5
        },

        description: { // Ticket Description for an event
            type: String,
            required: true
        },

        cost: { // The ticket cost in ETHER
            type: Number,
            required: true,
            default: 0.010       
         },

        isFree: {
            type: Boolean,
            required: true,
            default: false
        },

        deliveryMethods: { // Methods of ticket delivery
            type: String,
            required: true,
            default: "SMS",
            enum: ["Will Call", "SMS", "Electronic", "E-mail"]
        },

        onSaleStatus: { // Ticket on sale status can either be available for sale, sold out or pending
            type: String,
            enum: ["AVAILABLE", "SOLD_OUT", "PENDING"],
            required: true
        },

        saleStartsAt: {
            type: Date,
            default: Date.now
        },

        saleEndsAt: { // The timestamp at which the ticket sale ends
            type: Date,
            default: Date.now
        },

        confirmationMessage: {
            type: String,
            required: true,
            minlength: [10, "Minimum of 10 characters for the confirmation message"],
            maxlength: [200, "Confirmation message cannot exceed 200 characters"]
        },

        ticketSold: { // Determines if the ticket ahs been sold or not
            type: Boolean,
            default: false
        },

        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        },

        issuer: { // The issuer of the ticket
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    
}, {
    timestamps: true
});

const Ticket = mongoose.model<ITicketDocument>("Ticket", TicketSchema);
export {Ticket} // Export the model