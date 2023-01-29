import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({path: 'backend/services/events/config.env'});

const EVENT_DB_URI = process.env.EVENT_DB_URI;

export default () => {

    const connectEventsDatabase = async (...args: unknown[]) => {

        try {
    
            return await mongoose.connect(EVENT_DB_URI).then(conn => {
    
                if(conn.connection) {
                    console.log(`Read env var successfully`);
                    
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