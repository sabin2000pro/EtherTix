import mongoose from "mongoose";
interface ITicketAttributes {
    name: String;
    ticketClass: String;
    ticketToken: String;
    capacity: Number;
    minimumQuantityPurchase: Number;
    maximumQuantityPurchase: Number;
    description: String;
    cost: Number;
    isFree: Boolean;
    deliveryMethods: String;
    onSaleStatus: String;
    saleStartsAt: Date;
    saleEndsAt: Date;
    confirmationMessage: String;
    ticketSold: Boolean;
    event: mongoose.Schema.Types.ObjectId;
    issuer: mongoose.Schema.Types.ObjectId;
}
interface ITicketDocument extends mongoose.Model<ITicketAttributes> {
    name: String;
    ticketClass: String;
    ticketToken: String;
    capacity: Number;
    minimumQuantityPurchase: Number;
    maximumQuantityPurchase: Number;
    description: String;
    cost: Number;
    isFree: Boolean;
    deliveryMethods: String;
    onSaleStatus: String;
    saleStartsAt: Date;
    saleEndsAt: Date;
    confirmationMessage: String;
    ticketSold: Boolean;
    event: mongoose.Schema.Types.ObjectId;
    issuer: mongoose.Schema.Types.ObjectId;
}
declare const Ticket: mongoose.Model<ITicketDocument, {}, {}, {}, any>;
export { Ticket };
