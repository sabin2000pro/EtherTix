import { app } from "./app"

const port = process.env.PORT || 5300;

export const startCategoriesServer = async () => {

      return app.listen(port, () => {
           console.log('Categories Service Live On Port 5300');
      });

}

startCategoriesServer()