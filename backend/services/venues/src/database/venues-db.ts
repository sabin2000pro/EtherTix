require('dotenv').config();
import mongoose from "mongoose";

const VENUES_SERVICE_DB_URI = process.env.VENUES_SERVICE_DB_URI;

export const connectVenuesSchema = async (...args: unknown[]) => {

        try {
    
            return await mongoose.connect(VENUES_SERVICE_DB_URI as any).then(conn => {

                if(VENUES_SERVICE_DB_URI === undefined) {
                    throw new Error(`The venues service environment variable for connecting to the database is undefined`)
                }
    
                if(conn.connection) {
                    console.log(`Venues service connected to the database successfully`)
                }
    
                else {
                    return console.log(`Could not connect to venues DB`)
                }

            })
        } 
        
        catch(error: any) {
            
            if(error) {
                console.error(error);
                throw new Error(error);
            }
    
        }
    }


  connectVenuesSchema();
    

