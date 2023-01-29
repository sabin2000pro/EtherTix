require('dotenv').config();

import { app } from "./app"
const port = process.env.PORT || 5301;

export const startEventsServer = async () => {

      return app.listen(port, (error) => {

         if(!error) {
          console.log(`Event service live on port ${port} in mode : ${process.env.NODE_ENV}`);
         }

         else {
            return console.error(error);
         }


      });

}

startEventsServer();