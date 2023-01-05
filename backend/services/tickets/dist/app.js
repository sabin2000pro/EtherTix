"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const error_handler_1 = require("./middleware/error-handler");
const http_status_codes_1 = require("http-status-codes");
const express_1 = __importDefault(require("express"));
const tickets_db_1 = __importDefault(require("./database/tickets-db"));
const morgan_1 = __importDefault(require("morgan"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const cors_1 = __importDefault(require("cors"));
const ticket_routes_1 = require("./routes/ticket-routes");
const error_handler_2 = require("./middleware/error-handler");
(0, tickets_db_1.default)();
const app = (0, express_1.default)();
exports.app = app;
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
    methods: ['GET', 'POST', 'PUT', "DELETE"]
}));
app.use((0, helmet_1.default)());
app.get("/", (request, response) => {
    return response.json({ message: "Tickets Root Route" });
});
app.use('/api/v1/tickets', ticket_routes_1.ticketRouter);
app.use(error_handler_1.errorHandler);
app.all('*', (err, request, response, next) => {
    if (err instanceof error_handler_2.CustomError) {
        return response.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: err.message, errors: err.processErrors(), stack: err.stack });
    }
    return next();
});
