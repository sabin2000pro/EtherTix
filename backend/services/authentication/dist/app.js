"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: 'config.env' });
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
app.use((0, morgan_1.default)('dev'));
app.use((0, express_mongo_sanitize_1.default)()); // Prevent againiojoijoijoijst NoSQL Injection attacks in production environment
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
// Error Handler middleware
app.use('/api/auth', auth_routes_1.authRouter);
app.use(error_handler_1.errorHandler);
