import express, {Router} from 'express';
import {fetchAllCategories, fetchCategoryByID} from "../controllers/categories-controller";

export const categoriesRouter: Router = express.Router({});

categoriesRouter.route('/').get(fetchAllCategories)