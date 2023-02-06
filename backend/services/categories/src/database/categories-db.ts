import dotenv from 'dotenv';
dotenv.config({path: 'backend/services/categories/config.env'})
import mongoose from "mongoose";

const CATEGORIES_DB_URI = process.env.CATEGORIES_DB_URI

export const connectCategoriesDatabase = async (...args: unknown[]) => {

    try {

        return await mongoose.connect(CATEGORIES_DB_URI).then(conn => {

            if(conn.connection) {
                return console.log(`Connected to categories database...`)
            }

            else {
                return console.log(`Could not connect to categories schema`)
            }


        })
    } 
    
    catch(error: any) {
        
        if(error) {
            return console.error(error);
        }

    }
}