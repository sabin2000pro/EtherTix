import { app } from "./app"

const port = process.env.PORT || 5301;

// Start of authentication server
const startAuthServer = async () => {

      return app.listen(port, () => {
        console.log(`Event service live on port ${port}`);
      });

}

startAuthServer()