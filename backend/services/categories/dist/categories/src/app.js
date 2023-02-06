"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const cors_1 = __importDefault(require("cors"));
const categories_routes_1 = require("./routes/categories-routes");
const categories_db_1 = require("./database/categories-db");
(0, categories_db_1.connectCategoriesDatabase)();
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
if (process.env.NODE_ENV === 'production') {
    app.use((0, express_mongo_sanitize_1.default)());
}
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["POST", "PUT", "GET"]
}));
app.get('/', (request, response, next) => {
    return response.status(200).json({ success: true, message: "Categories Root Route" });
});
app.use('/api/v1/categories', categories_routes_1.categoriesRouter);
