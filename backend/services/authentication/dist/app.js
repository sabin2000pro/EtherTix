"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const http_status_codes_1 = require("http-status-codes");
require('dotenv').config();
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const cors_1 = __importDefault(require("cors"));
const auth_db_1 = require("./database/auth-db");
const auth_routes_1 = require("./routes/auth-routes");
const error_handler_1 = require("./middleware/error-handler");
const app = (0, express_1.default)();
exports.app = app;
(0, auth_db_1.connectAuthDatabase)();
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
if (process.env.NODE_ENV === 'production') {
    app.use((0, express_mongo_sanitize_1.default)()); // Prevent against NoSQL Injection attacks in production environment
}
app.use(express_1.default.json());
app.set('trust proxy', true);
app.use((0, hpp_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["POST", "PUT", "GET", "DELETE"]
}));
app.use((0, helmet_1.default)());
app.use((0, cookie_session_1.default)({
    keys: ['session']
}));
app.get("/", (request, response) => {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Auth Root Route API" });
});
// Error Handler middleware
app.use('/api/v1/auth', auth_routes_1.authRouter);
app.use(error_handler_1.errorHandler);
