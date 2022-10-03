import mongoose from "mongoose";

type TicketTypes = {
    
}
interface ITicketAttributes {

}


interface ITicketDocument extends mongoose.Model<ITicketAttributes> {

}

const TicketSchema = new mongoose.Schema<ITicketDocument>({

});

const Ticket = mongoose.model<ITicketDocument>("Ticket", TicketSchema);
export {Ticket}