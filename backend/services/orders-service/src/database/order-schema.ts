require('dotenv').config();
import mongoose from 'mongoose';


const ORDERS_SERVICE_DB_URI = process.env.ORDERS_SERVICE_DB_URI;

export const connectOrderSchema = async () => {
    
    try {
        const currConnection = await mongoose.connect(ORDERS_SERVICE_DB_URI as any);

        if(currConnection.connection) {
            console.log(`Connected to the orders microservice schema ..`);
        }

        else {
            console.log(`Could not connect to the database - closing the connection..`)
            mongoose.connection.close(); // Otherwise if cannot connect, just close connection to db

            process.exit(1);
        }


    } 
    
    catch(error: any) {


    if(error) {
        throw new Error(error);
    }


    }

}