import { BadRequestError } from '../middleware/error-handler';
import { StatusCodes } from 'http-status-codes';
import {Category} from '../models/categories-model';
import {Request, Response, NextFunction} from 'express'
import { NotFoundError } from '../middleware/error-handler';

declare namespace Express {
    export interface Request {
        user: any;
        body: any;
        session: any;
        params: any;
        method: any;
        query: any;
        files?: Record<any,any>
    }
    export interface Response {
        status: any;
        json: any;
        response: any
    }

  }

export const fetchAllCategories = async (request: any, response: Express.Response, next: NextFunction): Promise<any | Response> => {

    try {

        const categories = await Category.find();
        return response.status(StatusCodes.OK).json({success: true, categories})
    } 
    
    catch(error) {

    }

}

export const fetchCategoryByID = async (request: Express.Request, response: Express.Response, next: NextFunction): Promise<any | Express.Response> => {

    try {

      const id = request.params.id;
      const category = await Category.findById(id);

      if(!category) {
         return next(new NotFoundError("Category with that ID cannot be found", StatusCodes.NOT_FOUND));
      }

        return response.status(StatusCodes).json({success: true, category});
    } 
    
    catch(error) {

       if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
       }

    }


}

export const createNewCategory = async (request: Express.Request, response: Express.Response, next: NextFunction): Promise<Response | any> => {

    try {
        
        const body = request.body;
        const category = await Category.create(body);

        return response.status(StatusCodes.CREATED).json({success: true, category});
    } 
    
    catch(error) {

        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
       }

    }


}

export const editCategoryByID = async (request: Express.Request, response: Express.Response, next: NextFunction): Promise<Response| any> => {

    try {
        const id = request.params.id;
        let category = await Category.findById(id);

        if(!category) {
            return next(new BadRequestError("Category with that ID cannot be found on the server-side", StatusCodes.BAD_REQUEST));
        }

        category = await Category.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});
        await category.save();

    } 
    
    catch(error) {

        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
       }

    }


}

export const deleteCategoryByID = async (request: Express.Request, response: Express.Response, next: NextFunction): Promise<Response| any> => {
    try {

    }
    
    catch(error) {

    }
}

export const deleteCategories = async (request: Express.Request, response: Express.Response, next: NextFunction): Promise<Response| any> => {
    try {

    }
    
    catch(error) {

    }
    
}