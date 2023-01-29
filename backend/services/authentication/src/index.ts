import { app } from "./app"
import dotenv from 'dotenv';
dotenv.config({path: "backend/services/authentication/config.env"});

const port = process.env.PORT || 5299;

// Start of authentication server
export const startAuthServer = async () => {

      return app.listen(port, () => {
        console.log(`Authentication Service Live On Port 5299 in mode: ${process.env.NODE_ENV}`);
      });

}

startAuthServer()