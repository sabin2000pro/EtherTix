require('dotenv').config();
import { app } from "./app"

const BOOKINGS_SERVICE_PORT = process.env.BOOKINGS_SERVICE_PORT || 5050;

// Start of authentication server
export const startBookingsServer = async () => {

      return app.listen(BOOKINGS_SERVICE_PORT, () => {
        console.log(`Bookings Service Live On Port ${BOOKINGS_SERVICE_PORT} in mode : ${process.env.BOOKINGS_SERVICE_DEV_MODE}`);
      });

}

startBookingsServer()