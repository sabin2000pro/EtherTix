import { app } from "./app"

const port = process.env.PORT || 5301;

// Start of authentication server
const startAuthServer = async () => {

      return app.listen(port, () => {
        console.log('Events Service Live On Port 5301');
      });

}

startAuthServer()