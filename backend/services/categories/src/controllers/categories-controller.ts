import { StatusCodes } from 'http-status-codes';
import {Category} from '../models/categories-model';
import {Request, Response, NextFunction} from 'express'

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

export const fetchCategoryByID = async (request: Express.Request, response: Response, next: NextFunction) => {
    try {

      const id = request.params.id;
      let category = await Category.findById(id);

      if(!category) {

      }
      
    } 
    
    catch(error) {

    }


}

export const createNewCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {

    } 
    
    catch(error) {

    }


}