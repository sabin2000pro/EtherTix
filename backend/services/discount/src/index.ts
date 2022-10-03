import { app } from "./app"

const port = process.env.PORT || 5305;

// Start of authentication server
const startTicketsServer = async () => {

      return app.listen(port, () => {
        console.log('Discount Service Live On Port 5305');
      });

}

startTicketsServer()