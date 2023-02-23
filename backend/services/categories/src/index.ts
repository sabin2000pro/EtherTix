require('dotenv').config();
import { app } from "./app";

const CATEGORIES_SERVICE_PORT = process.env.CATEGORIES_SERVICE_PORT || 5300;

export const startCategoriesServer = async () => {

      return app.listen(CATEGORIES_SERVICE_PORT, (error) => {

          if(!error) {
            return console.log(`Categories service listening for incoming requests on port ${CATEGORIES_SERVICE_PORT}`);
          }

      });

}

startCategoriesServer()