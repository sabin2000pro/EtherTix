require('dotenv').config();
import mongoose from "mongoose";

const EVENTS_SERVICE_DB_URI = process.env.EVENTS_SERVICE_DB_URI;

export default () => {

    const connectEventsSchema = async (...args: unknown[]) => {

        try {
    
            const currConnection = await mongoose.connect(EVENTS_SERVICE_DB_URI as any)
    
                if(currConnection.connection) {
                    return console.log(`Connected to events database...`)
                }
    
                else {
                    return console.log(`Could not connect to events DB`)
            }
            
        } 
        
        catch(error: any) {
            
            if(error) {
                return console.error(error);
            }

    
        }
    }

    connectEventsSchema();
    
}