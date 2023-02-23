require('dotenv').config();
import mongoose from "mongoose";

const TICKETS_SERVICE_DB_URI = process.env.TICKETS_SERVICE_DB_URI;


export const connectTicketsSchema = async (...args: unknown[]) => {

    try {

        return await mongoose.connect(TICKETS_SERVICE_DB_URI).then(conn => {

            if(TICKETS_SERVICE_DB_URI === undefined) {
                return console.log(`The tickets DB URI is undefined`)
            }

            if(conn.connection) {
                return console.log(`Connected to ticket schema...`)
            }

            else {
                return console.log(`Could not connect to DB`)
            }

        })

    } 
    
    catch(error: any) {
        
        if(error) {
            
            return console.error(error);
        }

    }
}

connectTicketsSchema();

