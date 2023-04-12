require('dotenv').config();
import mongoose from "mongoose";

const EVENTS_SERVICE_DB_URI = process.env.EVENTS_SERVICE_DB_URI;

export default () => {

    const connectEventsDatabase = async (...args: unknown[]) => {

        try {
    
            return await mongoose.connect(EVENTS_SERVICE_DB_URI as any).then(conn => {
    
                if(conn.connection) {
                    console.log(`Read env var successfully : ${EVENTS_SERVICE_DB_URI}`);

                    return console.log(`Connected to events database...`)
                }
    
                else {
                    return console.log(`Could not connect to events DB`)
                }

                
            })
        } 
        
        catch(error: any) {
            
            if(error) {
                return console.error(error);
            }

    
        }
    }

    connectEventsDatabase();
    
}