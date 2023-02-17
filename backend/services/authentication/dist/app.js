"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('dotenv').config();
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const cors_1 = __importDefault(require("cors"));
const auth_schema_1 = require("./database/auth-schema");
const auth_routes_1 = require("./routes/auth-routes");
const error_handler_1 = require("./middleware/error-handler");
const http_status_codes_1 = require("http-status-codes");
const app = (0, express_1.default)();
exports.app = app;
(0, auth_schema_1.connectAuthSchema)();
if (process.env.AUTH_SERVICE_NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use((0, express_mongo_sanitize_1.default)());
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
app.get('/', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Authentication Service Root Route" });
}));
// Error Handler middleware
app.use('/api/auth', auth_routes_1.authRouter);
app.use(error_handler_1.errorHandler);
