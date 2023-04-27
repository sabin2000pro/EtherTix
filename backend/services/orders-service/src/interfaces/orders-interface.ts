import mongoose from 'mongoose';

export interface IOrderDocument extends mongoose.Document {
    user: mongoose.Schema.Types.ObjectId,

    orderItems: Array<{
        name: string,
        quantity: number,
        ticketPrice: number,
        taxPrice: number,
        shippingPrice: number,
        ticket: mongoose.Schema.Types.ObjectId
    }>,

    shippingInformation: {},

    orderStatus: string,
    createdAt: Date,
    paidAt: Date
}