import mongoose from "mongoose";

const connectAuthDatabase = async (...args: unknown[]) => {

    try {
        return await mongoose.connect("").then(conn => {

            if(conn.connection) {
                return console.log(`Connected to auth database...`)
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

export default connectAuthDatabase;