require('dotenv').config();
import { app } from "./app"

const ORDERS_SERVICE_PORT = process.env.ORDERS_SERVICE_PORT || 5299;

// Start of authentication server
export const startAuthServer = async () => {

      return app.listen(ORDERS_SERVICE_PORT, () => {
        console.log(`Orders microservice service listening for requests on port:  ${ORDERS_SERVICE_PORT}`);
      });

}

startAuthServer()