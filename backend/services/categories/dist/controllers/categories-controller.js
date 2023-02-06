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
exports.fetchNewCategories = exports.fetchTrendingCategories = exports.deleteCategories = exports.deleteCategoryByID = exports.editCategoryByID = exports.createNewCategory = exports.fetchCategoryByID = exports.fetchAllCategories = void 0;
const error_handler_1 = require("../middleware/error-handler");
const http_status_codes_1 = require("http-status-codes");
const categories_model_1 = require("../models/categories-model");
// @description: Returns a list of event categories
// @parameters: request: Request Object, response: Response Object, next: Next Function, user: User Object, statusCode: Status Code of The request
// @returns: Server Response - List of categories returned
// @access: Public (NO Bearer Token Required)
const fetchAllCategories = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_model_1.Category.find();
        if (!categories) {
            return next(new error_handler_1.NotFoundError("No categories found", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, categories });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
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
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.fetchCategoryByID = fetchCategoryByID;
const createNewCategory = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = request.body.event;
        const { name, categoryType, isTrending, isNew } = request.body;
        if (!name || !categoryType || !isTrending || !isNew) {
            return next(new error_handler_1.BadRequestError("One of the categories fields are missing, please check again", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        const category = yield categories_model_1.Category.create({ name, categoryType, isTrending, isNew, event });
        yield category.save();
        return response.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, category });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.createNewCategory = createNewCategory;
const editCategoryByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        let category = yield categories_model_1.Category.findById(id);
        if (!category) {
            return next(new error_handler_1.BadRequestError("Category with that ID cannot be found on the server-side", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        category = yield categories_model_1.Category.findByIdAndUpdate(id, request.body, { new: true, runValidators: true });
        yield category.save();
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.editCategoryByID = editCategoryByID;
const deleteCategoryByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield categories_model_1.Category.findByIdAndRemove(request.params.id);
        return response.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ success: true, message: "Category Deleted" });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.deleteCategoryByID = deleteCategoryByID;
const deleteCategories = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield categories_model_1.Category.deleteMany();
        return response.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ success: true, message: "Categories deleted" });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.deleteCategories = deleteCategories;
const fetchTrendingCategories = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trendingCategories = yield categories_model_1.Category.find({ isTrending: true });
        if (!trendingCategories) {
            return next(new error_handler_1.BadRequestError("No trending categories found", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, trendingCategories });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.fetchTrendingCategories = fetchTrendingCategories;
const fetchNewCategories = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
});
exports.fetchNewCategories = fetchNewCategories;
