import { app } from "./app"

const port = process.env.PORT || 5299;

// Start of authentication server
export const startAuthServer = async () => {

      return app.listen(port, () => {
        console.log('Authentication Service Live On Port 5299');
      });

}

startAuthServer()