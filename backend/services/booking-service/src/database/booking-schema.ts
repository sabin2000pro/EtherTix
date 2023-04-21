require('dotenv').config();
import mongoose from "mongoose";

const BOOKING_SERVICE_DB_URI = process.env.BOOKING_SERVICE_DB_URI;

export const connectBookingSchema = async (): Promise<any> => {

    try {

        const conn = await mongoose.connect(BOOKING_SERVICE_DB_URI as any)

            if(conn.connection) {
                return console.log(`Connected to booking service database...`)
            }

            else {
                return console.log(`Could not connect to the bookings service database schema`)
            }
    } 
    
    catch(error: any) {
        
        if(error) {
            return console.error(error);
        }

    }
}