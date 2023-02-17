import { NextFunction } from 'express';
import asyncHandler from 'express-async-handler'
import axios from 'axios';

export const fetchCustomerOrders = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    
})