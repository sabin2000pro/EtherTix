require('dotenv').config();
import {app} from './app';

const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT || 5299;

// Start of authentication server
export const startAuthServer = async () => {

      return app.listen(AUTH_SERVICE_PORT, () => {
        console.log(`Authentication Service Live On Port ${AUTH_SERVICE_PORT}`);
      });

}

startAuthServer()