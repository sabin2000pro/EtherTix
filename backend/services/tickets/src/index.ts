require('dotenv').config();
import { app } from "./app"

const port = 5303;

// Start of authentication server
const startTicketsServer = async () => {

      return app.listen(5303, () => {
        console.log('Tickets Service Live On Port 5303');
      });

}

startTicketsServer()