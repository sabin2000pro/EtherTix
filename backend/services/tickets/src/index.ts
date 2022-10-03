import { app } from "./app"

const port = process.env.PORT || 5303;

// Start of authentication server
const startTicketsServer = async () => {

      return app.listen(port, () => {
        console.log('Tickets Service Live On Port 5303');
      });

}

startTicketsServer()