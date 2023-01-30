import dotenv from 'dotenv';
dotenv.config({path: "/Users/sabin2000/Documents/ethertix/backend/services/events/config.env"});
import mongoose from "mongoose";

const EVENT_DB_URI = process.env.EVENT_DB_URI;

export default () => {

    const connectEventsDatabase = async (...args: unknown[]) => {

        try {
    
            return await mongoose.connect(EVENT_DB_URI).then(conn => {
    
                if(conn.connection) {
                    console.log(`Read env var successfully : ${EVENT_DB_URI}`);

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