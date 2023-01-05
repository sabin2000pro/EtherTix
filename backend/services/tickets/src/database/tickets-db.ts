import mongoose from "mongoose";

export default () => {

const connectTicketsSchema = async (...args: unknown[]) => {

    try {

        return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ethertix.ahxythi.mongodb.net/auth-db?retryWrites=true&w=majority").then(conn => {

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

}

