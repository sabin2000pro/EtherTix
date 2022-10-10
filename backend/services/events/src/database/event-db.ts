import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({path: '../../config.env'});

export default () => {

    const connectEventsDatabase = async (...args: unknown[]) => {

        try {
    
            return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ethertix.ahxythi.mongodb.net/auth-db?retryWrites=true&w=majority").then(conn => {
    
                if(conn.connection) {
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

