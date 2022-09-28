import { app } from "./app"

const startAuthServer = async () => {

      return app.listen(5300, () => {
        console.log('Authentication Service Live On Port 5300');
      });

}

startAuthServer()