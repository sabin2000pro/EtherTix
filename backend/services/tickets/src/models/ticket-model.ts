import mongoose from "mongoose";

interface ITicketAttributes { // Interface that stores the ticket data
    name: String,
    ticketClass: String,
    ticketToken: String,
    capacity: Number,
    quantityPurchase: String,
    description: String,
    cost: Number,
    isFree: Boolean,
    deliveryMethods: String,
    onSaleStatus: String,
    saleStartsAt: Date,
    saleEndsAt: Date,
    confirmationMessage: string,
    ticketSold: boolean,
    event: mongoose.Schema.Types.ObjectId,
    issuer: mongoose.Schema.Types.ObjectId,
    venue: mongoose.Schema.Types.ObjectId
}

interface ITicketDocument extends mongoose.Model<ITicketAttributes> {
   name: String,
   ticketClass: String,
   ticketToken: String,
   capacity: Number,
   quantityPurchase: Number,
   description: String,
   cost: Number,
   isFree: Boolean,
   deliveryMethods: String,
   onSaleStatus: String,
   saleStartsAt: Date,
   saleEndsAt: Date,
   confirmationMessage: String,
   ticketSold: Boolean,
   event: mongoose.Schema.Types.ObjectId, // The Event ID that this ticket is associated to
   issuer: mongoose.Schema.Types.ObjectId,
   venue: mongoose.Schema.Types.ObjectId
   discount: mongoose.Schema.Types.ObjectId;
}

export const TicketSchema = new mongoose.Schema<ITicketDocument>({ // Ticket Data Schema Model

        name: { // Name of the ticket
            type: String,
            required: [true, "Please specify the name of this ticket"]
        },

        ticketClass: { // The ticket class. VIP ones are the most expensive and basic are the cheapest.
            type: String,
            required: [true, "Please specify the ticket class for this ticket"],
            enum: ["premium", "standard", "basic", "vip"]
        },

        ticketToken: { // The format of the ticket that will be sent to the buyer
            type: String,
            required: [true, "Please specify how this ticket is going to be delivered"],
            enum: ["Barcode", "QR Code", "Image", "PDF"]
        },

        capacity: { // Number of tickets for sale (0, 1, 2,3)
            type: Number,
            required: [true, "Please specify how many tickets can be placed for sale"],
            default: 1,
            min: [1, "At least one single ticket must be placed for sale"],
            max: [10, "You cannot place more than 10 tickets for sale at once"]
        },

        quantityPurchase: { // The minimum and maximum amount of tickets that can be purchased
            type: Number,
            required: [true, "Please specify how many tickets can be bought at a single time"],
            default: 1,
            min: 1,
            max: 5
        },

        description: { // Ticket Description for an event
            type: String,
            required: [true, "Please specify the description for this ticket"]
        },

        cost: { // The ticket cost in ETHER
            type: Number,
            required: true,
            default: 0.010       
         },

        isFree: { // Is the ticket free or not
            type: Boolean,
            required: [true, "Please specify if this ticket is free or not"],
            default: false
        },

        deliveryMethods: { // Methods of ticket delivery
            type: String,
            required: true,
            default: "SMS",
            enum: ["Phone", "SMS", "Electronic", "E-mail"]
        },

        onSaleStatus: { // Ticket on sale status can either be available for sale, sold out or pending
            type: String,
            enum: ["AVAILABLE", "SOLD_OUT", "PENDING"],
            required: [true, "Please specfify whether or not the event is available, sold out or pending to start"]
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

        event: { // Relationship between the Ticket and Event
            type: mongoose.Schema.Types.ObjectId,
            ref: "event",
            required: [true, "Please specify the event that this ticket is related to"]
        },

        issuer: { // Relationship between the Event Ticket and the Event ID
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "Please specify who the issuer ID of this ticket is"]
        },

        venue: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "venue",
            required: [true, "Please specify the venue ID that this ticket is associated to"]
        }
    
}, {
    timestamps: true
});

const Ticket = mongoose.model<ITicketDocument>("Ticket", TicketSchema);
export {Ticket} // Export the model