import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { RequestHandler } from "express";
import { HttpException } from "../exceptions/http.exception";

export function validationMiddleware(type: any): RequestHandler {
    return (req, res, next) => {
        validate(plainToInstance(type, req.body))
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = errors.map((error: ValidationError) => Object.values(error.constraints!)).join(', ');
                    next(new HttpException(400, message));
                } else {
                    next();
                }
            })
    }
}
