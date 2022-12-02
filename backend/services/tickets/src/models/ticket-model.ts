import mongoose from "mongoose";


interface ITicketAttributes {
    ticket: Object
}

interface ITicketDocument extends mongoose.Model<ITicketAttributes> {
    ticket: Object
}

const TicketSchema = new mongoose.Schema<ITicketDocument>({ // Ticket Data Schema Model

    ticket: { // Ticket Object

        name: { // Name of the ticket
            type: String,
            required: [true, "Please specify the name of the ticket class"],
            default: null
        },

        ticketClass: { // The ticket class. VIP ones are the most expensive and basic are the cheapest.
            type: String,
            required: [true, "Please specify the ticket class for this event"],
            enum: ["premium", "standard", "basic", "vip"]
        },

        ticketToken: { // The format of the ticket that will be sent to the buyer
            type: String,
            required: [true, "Please specify the format of the ticket"],
            enum: ["Barcode", "QR Code", "Image", "PDF"]
        },

        capacity: { // Number of tickets for sale (0, 1, 2,3)
            type: Number,
            required: [true, "Please specify the number of tickets available for sale"],
            default: 0,
        },

        minimumQuantityPurchase: {
            type: Number,
            required: [true, "Please specify the minimum number of tickets that can be purchased for this event"],
            default: 1
        },

        maximumQuantityPurchase: {
            type: Number,
            required: [true, "Please specify the maximum number of tickets that can be purchased for this event"],
            default: 5
        },

        description: { // Ticket Description for an event
            type: String,
            required: [true, "Provide a valid description for the ticket"]
        },

        cost: { // The ticket cost in ETHER
            type: Number,
            required: [true, "Please specify how much the ticket costs"],
            default: 0.010       
         },

        isFree: {
            type: Boolean,
            required: [true, "Please specify if the ticket is free or not"],
            default: false
        },

        deliveryMethods: { // Methods of ticket delivery
            type: String,
            required: [true, "Please specify the type of delivery method"],
            default: "SMS",
            enum: ["Will Call", "SMS", "Electronic", "E-mail"]
        },

        onSaleStatus: { // Ticket on sale status can either be available for sale, sold out or pending
            type: String,
            enum: ["AVAILABLE", "SOLD_OUT", "PENDING"],
            required: [true, "Please specify the on sale status of the ticket"]
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
            required: [true, "Please specify the confirmation message for the purchased event ticket"],
            minlength: [10, "Minimum of 10 characters for the confirmation message"],
            maxlength: [200, "Confirmation message cannot exceed 200 characters"]
        },

        ticketSold: {
            type: Boolean,
            default: false,
            required: [true, "Please specify if the ticket has been sold or not"]
        },

        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        },

        issuer: { // The issuer of the ticket
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }

    }
    
}, {
    timestamps: true,
    toJSON: {virtuals: true}
});

const Ticket = mongoose.model<ITicketDocument>("Ticket", TicketSchema);
export {Ticket} // Export the model