require('dotenv').config();
import { app } from "./app"

const API_GATEWAY_PORT = process.env.API_GATEWAY_PORT || 6000;

// Start the API Gateway service server
export const startApiGatewayServer = async () => {

      return app.listen(API_GATEWAY_PORT, () => {
          console.log(`API Gateway Port Live On Port ${API_GATEWAY_PORT} in mode: ${process.env.API_GATEWAY_NODE_ENV}`);
      });

}

startApiGatewayServer();