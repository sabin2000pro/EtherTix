import mongoose from 'mongoose';

export interface IOrderDocument {
    user: mongoose.Schema.Types.ObjectId,
    orderItems: any[],
    
}