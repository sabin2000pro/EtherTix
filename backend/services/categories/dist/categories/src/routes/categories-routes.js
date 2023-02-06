"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const express_1 = __importDefault(require("express"));
const categories_controller_1 = require("../controllers/categories-controller");
exports.categoriesRouter = express_1.default.Router({});
exports.categoriesRouter.route('/').get(categories_controller_1.fetchAllCategories).post(categories_controller_1.createNewCategory);
exports.categoriesRouter.route('/:id').get(categories_controller_1.fetchCategoryByID);
