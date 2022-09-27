import mongoose from "mongoose"
import { app } from "./app"

const startAuthServer = async () => {

      return app.listen(3000, () => {
        console.log('Authentication Service Live On Port 3000');
      });

}

startAuthServer()