import { HttpException } from "../exceptions/http.exception";
import { NextFunction, Request, Response } from "express";

export function errorMiddleware(error: unknown, req: Request, res: Response, next: NextFunction) {
    const statusCode: number = error instanceof HttpException ? error.statusCode : 500;
    const message: string = error instanceof HttpException ? error.message : "Something went wrong";

    res
        .status(statusCode)
        .json({
            status: "FAILED",
            message: message,
        })

}

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
    next(new HttpException(404, "Endpoint tidak ditemukan"))
}

