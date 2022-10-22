import { app } from "./app"

const port = process.env.PORT || 5307;

// Start of authentication server
const startDiscountServer = async () => {

    return app.listen(port, () => {
       console.log('Discount Service Live On Port 5307');
    });

}

startDiscountServer()