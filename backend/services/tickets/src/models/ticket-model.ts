import mongoose, { Model } from "mongoose";

type TicketTypes = {
    
}
interface ITicketAttributes {
    ticket: Object
}

interface ITicketDocument extends mongoose.Model<ITicketAttributes> {
    ticket: Object
}

const TicketSchema = new mongoose.Schema<ITicketDocument>({ // Ticket Data Schema Model
    ticket: { // Ticket Object

        name: {
            type: String
        },

        capacity: { // Number of tickets for sale
            type: String;
        }
    }
}, {
    timestamps: true
});

const Ticket = mongoose.model<ITicketDocument>("Ticket", TicketSchema);
export {Ticket} // Export the model