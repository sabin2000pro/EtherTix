import dotenv from "dotenv"
dotenv.config({path: '/Users/sabin2000/Documents/ethertix/backend/services/authentication/src/config.ts'})

class Config {
    public DATABASE_URL: string | undefined;
    public JWT_TOKEN: string | undefined;
    public JWT_TOKEN_EXPIRES: string | undefined;

    constructor() {
        
        this.DATABASE_URL = process.env.DATABASE_URL || ""
        this.JWT_TOKEN = process.env.JWT_TOKEN || ""
        this.JWT_TOKEN_EXPIRES = process.env.JWT_TOKEN_EXPIRES || ""
    }
}

export const config = new Config();