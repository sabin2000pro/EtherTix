import express from 'express';
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import cors from "cors";

const app: any = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
 
app.use(express.json());
app.set('trust proxy', true);

app.use(hpp());
app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"]
}));

app.use(helmet());

// Include error handling middleware here for the venues

app.get("/", (request: any, response: any) => {
    return response.json({message: "Discount Root Route Endpoint"})
})

export {app}