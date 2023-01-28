import { BadRequestError, NotFoundError } from '../middleware/error-handler';
import { StatusCodes } from 'http-status-codes';
import {Category} from '../models/categories-model';
import {Request, Response, NextFunction} from 'express'
declare namespace Express {
    export interface Request {
        body: any;
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

  // @description: Returns a list of event categories
  // @parameters: request: Request Object, response: Response Object, next: Next Function, user: User Object, statusCode: Status Code of The request
  // @returns: Server Response - List of categories returned
  // @access: Public (NO Bearer Token Required)

export const fetchAllCategories = async (request: any, response: any, next: NextFunction): Promise<any | Response> => {

    try {

        const categories = await Category.find()
        
        if(!categories) {
            return next(new NotFoundError("No categories found", StatusCodes.NOT_FOUND))
        }

        return response.status(StatusCodes.OK).json({success: true, categories})
    } 
    
    catch(error) {

        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
        }

    }

}

export const fetchCategoryByID = async (request: any, response: any, next: NextFunction): Promise<any | Express.Response> => {

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

export const createNewCategory = async (request: any, response: any, next: NextFunction): Promise<any> => {

    try {

        const event = request.body.event;
        const {name, categoryType, isTrending, isNew} = request.body;

        if(!name || !categoryType || !isTrending || !isNew) {
            return next(new BadRequestError("One of the categories fields are missing, please check again", StatusCodes.NOT_FOUND));
        }

        const category = await Category.create({name, categoryType, isTrending, isNew, event});
        await category.save();

        return response.status(StatusCodes.CREATED).json({success: true, category});
    } 
    
    catch(error) {

        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
       }

    }

}

export const editCategoryByID = async (request: any, response: any, next: NextFunction): Promise<Response| any> => {

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

export const deleteCategoryByID = async (request: any, response: any, next: NextFunction): Promise<any> => {
    try {

        await Category.findByIdAndRemove(request.params.id);
        return response.status(StatusCodes.NO_CONTENT).json({success: true, message: "Category Deleted"});
    }
    
    catch(error) {

        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
       }
    }

}

export const deleteCategories = async (request: any, response: any, next: NextFunction): Promise<Response| any> => {
    try {

        await Category.deleteMany();
        return response.status(StatusCodes.NO_CONTENT).json({success: true, message: "Categories deleted"})
    }
    
    catch(error) {

        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
       }

    }
    
}

export const fetchTrendingCategories = async (request: any, response: any, next: NextFunction): Promise<any> => {
    try {

        const trendingCategories = await Category.find({isTrending: true});

        if(!trendingCategories) {
            return next(new BadRequestError("No trending categories found", StatusCodes.BAD_REQUEST));
        }

        return response.status(StatusCodes.OK).json({success: true, trendingCategories});
    } 
    
    catch(error) {
        
        if(error) {
            return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
       }

    }

}

export const fetchNewCategories = async (request: any, response: any, next: NextFunction): Promise<any> => {
    try {

    } 
    
    catch(error) {

    }
    
}