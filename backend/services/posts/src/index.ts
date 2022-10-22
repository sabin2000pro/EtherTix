import { app } from "./app"

const port = process.env.PORT || 5305;

// Start of authentication server
const startPostsServer = async () => {

      return app.listen(port, () => {
        console.log('Posts Service Live On Port 5305');
      });

}

startPostsServer()