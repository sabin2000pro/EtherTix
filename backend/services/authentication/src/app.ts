import cookieSession from 'cookie-session';
import express, { Application, Request, Response } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import cors from "cors";
import path from "path";

const app: Application = express();

app.use(express.json());

app.set('trust proxy', true);
app.use(morgan('dev'));
app.use(hpp());
app.use(cors());
app.use(helmet());
app.use(cookieSession({
    keys: ['session']
}));

app.get("/", (request: Request, response: Response) => {
    return response.json({message: "Root Route"})
})

export {app}