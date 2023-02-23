require('dotenv').config();
import { app } from "./app"

const TICKETS_SERVICE_PORT = process.env.TICKETS_SERVICE_PORT || 5303;

// Start of authentication server
const startTicketsServer = async () => {

      return app.listen(TICKETS_SERVICE_PORT, (error) => {
        if(!error) {
         return console.log('Tickets Service Live On Port 5303');
        }

        else {
          return console.error(error);
        }
        
      });

}

startTicketsServer()