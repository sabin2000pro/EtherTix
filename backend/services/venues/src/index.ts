require('dotenv').config();
import { app } from "./app"

const VENUES_SERVICE_PORT = process.env.VENUES_SERVICE_PORT || 5302;

// Start of authentication server
export const startVenueServer = async () => {

      return app.listen(VENUES_SERVICE_PORT, (error) => {
        
           if(!error) {
              return console.log('Venues Service listening for incoming requests On Port 5302');
           }

         else {
            return console.log(`Could not listen for incoming HTTP requests on venues service`)
         }


      });
}

startVenueServer();