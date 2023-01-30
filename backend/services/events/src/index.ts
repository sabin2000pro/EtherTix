import dotenv from 'dotenv';
dotenv.config({path: "backend/services/events/config.env"});
import { app } from "./app"

const port = process.env.PORT || 5301;

export const startEventsServer = async () => {

      return app.listen(port, (error) => {

         if(!error) {
            console.log(`Events Service is live on port ${port} in mode : ${process.env.NODE_ENV}`);
         }

         else {
            return console.error(error);
         }


      });

}

startEventsServer();