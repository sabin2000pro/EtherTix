import express, {Router} from 'express';
import {fetchAllCategories, fetchCategoryByID, createNewCategory} from "../controllers/categories-controller";

export const categoriesRouter: Router = express.Router({});

categoriesRouter.route('/').get(fetchAllCategories as any).post(createNewCategory as any);
categoriesRouter.route('/:id').get(fetchCategoryByID as any);