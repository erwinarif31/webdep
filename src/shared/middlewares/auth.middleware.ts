import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http.exception";
import jwt from "jsonwebtoken"

type JWTPayload = {
    userId: string;
    isAdmin: boolean;
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.toString().split(" ")[1];

        if (!token) {
            throw new HttpException(401, "Unauthorized");
        }

        const jwtKey = process.env.JWT_KEY;

        if (!jwtKey) {
            throw new HttpException(500, "No JWT_KEY env found");
        }

        const decoded = jwt.verify(token, jwtKey) as JWTPayload;
        req.userId = decoded.userId;
        req.isAdmin = decoded.isAdmin;
    } catch (e) {
        next(e)
    }
    
    return next();
}

export default authMiddleware;
