import { NextFunction } from "express";

export const protectAuth = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    let token;
}

export const restrictRolesTo = (...roles) => {

}
