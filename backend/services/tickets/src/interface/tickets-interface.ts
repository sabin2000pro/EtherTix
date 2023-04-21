import mongoose from 'mongoose';

export interface ITicketAttributes { // Interface that stores the ticket data
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

export interface ITicketDocument extends mongoose.Model<ITicketAttributes> {
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