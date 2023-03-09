require('dotenv').config();
import express, {Request, Response } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { apiGatewayRouter } from "./routes/api-gateway-routes";

const app: any = express();

if(process.env.API_GATEWAY_NODE_ENV === 'development') {
    app.use(morgan('dev') as any);
}

app.use(express.json());
app.use(mongoSanitize());

app.set('trust proxy', true);
app.use(hpp());

app.use(cors({
    origin: "*",
    methods: ["POST", "PUT", "GET", "DELETE"]
}));

// Mount the API gateway routes
app.use('/api/v1/api-gateway', apiGatewayRouter);

app.use(helmet());

export {app}