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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategories = exports.deleteCategoryByID = exports.editCategoryByID = exports.createNewCategory = exports.fetchCategoryByID = exports.fetchAllCategories = void 0;
const http_status_codes_1 = require("http-status-codes");
const categories_model_1 = require("../models/categories-model");
const error_handler_1 = require("../middleware/error-handler");
const fetchAllCategories = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_model_1.Category.find();
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, categories });
    }
    catch (error) {
    }
});
exports.fetchAllCategories = fetchAllCategories;
const fetchCategoryByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const category = yield categories_model_1.Category.findById(id);
        if (!category) {
            return next(new error_handler_1.NotFoundError("Category with that ID cannot be found", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        return response.status(http_status_codes_1.StatusCodes).json({ success: true, category });
    }
    catch (error) {
    }
});
exports.fetchCategoryByID = fetchCategoryByID;
const createNewCategory = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = request.body;
    }
    catch (error) {
    }
});
exports.createNewCategory = createNewCategory;
const editCategoryByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.editCategoryByID = editCategoryByID;
const deleteCategoryByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteCategoryByID = deleteCategoryByID;
const deleteCategories = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteCategories = deleteCategories;
