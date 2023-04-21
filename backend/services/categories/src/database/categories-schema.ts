require('dotenv').config();
import mongoose from "mongoose";

const CATEGORIES_SERVICE_DB_URI = process.env.CATEGORIES_SERVICE_DB_URI

export const connectCategoriesDatabase = async (...args: unknown[]) => {

    try {

        const connection = mongoose.connect(CATEGORIES_SERVICE_DB_URI)

            if(conn.connection) {
                return console.log(`Connected to the Categories Service database schema successfully`)
            }

            else {
                return console.log(`Could not connect to categories schema`)
            }


       
    } 
    
    catch(error: any) {
        
        if(error) {
            return console.error(error);
        }

    }
}