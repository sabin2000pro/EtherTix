import { app } from "./app"
import dotenv from 'dotenv';
dotenv.config({path: "backend/services/authentication/config.env"});

const port = process.env.API_GATEWAY_PORT || 6000;

// Start the API Gateway service server
export const startApiGatewayServer = async () => {

      return app.listen(port, () => {
          console.log(`API Gateway Port Live On Port ${port} in mode: ${process.env.NODE_ENV}`);
      });

}

startApiGatewayServer();