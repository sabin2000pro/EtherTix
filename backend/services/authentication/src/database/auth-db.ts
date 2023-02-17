import mongoose from "mongoose";

const AUTH_DB_URI = process.env.AUTH_DB_URI;

export const connectAuthDatabase = async (...args: unknown[]) => {

    try {

        console.log(`Debug Auth DB URI : `, AUTH_DB_URI);

        return await mongoose.connect(AUTH_DB_URI).then(conn => {

            if(conn.connection) {
                console.log(`Aftter connection to DB : `, AUTH_DB_URI);
                return console.log(`Connected to authentication service database...`)
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