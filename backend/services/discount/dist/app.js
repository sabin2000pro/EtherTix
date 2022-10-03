"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var hpp_1 = __importDefault(require("hpp"));
var helmet_1 = __importDefault(require("helmet"));
var express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
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
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
// Include error handling middleware here for the venues
app.get("/", function (request, response) {
    return response.json({ message: "Discount Root Route" });
});
