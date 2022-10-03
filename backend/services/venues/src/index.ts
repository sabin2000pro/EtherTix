import { app } from "./app"

const port = process.env.PORT || 5302;

// Start of authentication server
const startVenueServer = async () => {

      return app.listen(port, () => {
        console.log('Venues Service Live On Port 5302');
      });

}

startVenueServer()