require('dotenv').config();
import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectCategoriesDatabase = async (...args: unknown[]) => {

    try {

        return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ethertix.ahxythi.mongodb.net/auth-db?retryWrites=true&w=majority").then(conn => {

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