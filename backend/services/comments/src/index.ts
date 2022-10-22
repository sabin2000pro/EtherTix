import { app } from "./app"

const port = process.env.PORT || 5306;

// Start of authentication server
const startCommentsServer = async () => {

      return app.listen(port, () => {
        console.log('Comments Service Live On Port 5306');
      });

}

startCommentsServer()