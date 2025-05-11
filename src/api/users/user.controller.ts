import { NextFunction, Request, Response, Router } from "express";
import { IUser, UserService } from "./user.service";
import { validationMiddleware } from "../../shared/middlewares/validation.middleware";
import CreateUserDto from "./dto/create-user.dto";
import { constants, createResponse } from "../../shared/utils";
import { HttpException } from "../../shared/exceptions/http.exception";
import LoginDto from "./dto/login.dto";
import authMiddleware from "../../shared/middlewares/auth.middleware";

export class UserController {
    private path: string;
    private userService: UserService;
    public router: Router;

    constructor() {
        this.path = "/api/users";
        this.userService = new UserService();
        this.router = Router();
        this.registerRoute();
    }

    private registerRoute() {
        this.router.post(
            this.path,
            validationMiddleware(CreateUserDto),
            this.createUser,
        );

        this.router.get(
            this.path,
            this.getAllUsers,
        );

        this.router.post(
            this.path + "/login",
            this.login,
        );

        this.router.delete(
            this.path + "/:id",
            this.deleteUser,
        );

        this.router.put(
            this.path + "/:id",
            this.updateUser,
        );

        this.router.get(
            this.path + "/info",
            this.getUserInfo,
        );
    }

    private createUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const userData: CreateUserDto = req.body;
        try {
            const userEmail = await this.userService.insertNewUser(userData);
            if (userEmail) {
                return res
                    .status(200)
                    .json(
                        createResponse(
                            constants.SUCCESS_MESSAGE,
                            `Successfully create new user with user name ${userEmail}`,
                        ),
                    );
            }

            throw new HttpException(500, "Something went wrong");
        } catch (e) {
            next(e);
        }
    };

    private getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        console.log(true);
        const users = await this.userService.getAllUser();

        return res
            .status(200)
            .json(createResponse(constants.SUCCESS_MESSAGE, users));
    };

    private login = async (req: Request, res: Response, next: NextFunction) => {
        const loginData: LoginDto = req.body;

        try {
            const token = await this.userService.login(loginData);
            if (token) {
                return res
                    .status(200)
                    .json(
                        createResponse(constants.SUCCESS_MESSAGE, {
                            token: token,
                        }),
                    );
            }
            throw new HttpException(500, "Something went wrong");
        } catch (error) {
            next(error);
        }
    };

    private deleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const deletedUsername = await this.userService.deleteUser(id);
            if (deletedUsername) {
                return res
                    .status(200)
                    .json(
                        createResponse(
                            constants.SUCCESS_MESSAGE,
                            `Sucessfully delete user with username ${deletedUsername}`,
                        ),
                    );
            }
        } catch (e) {
            return next(e);
        }
    };

    private updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const userData = req.body;

        try {
            const user: IUser = {
                username: userData.username,
                name: userData.name,
                password: userData.password,
                email: userData.email,
            };

            const username = await this.userService.updateUser(id, user);

            if (username) {
                return res
                    .status(200)
                    .json(
                        createResponse(
                            constants.SUCCESS_MESSAGE,
                            `Successfully update user with username ${username}`,
                        ),
                    );
            }
        } catch (e) {
            return next(e);
        }
    };

    private getUserInfo = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const id = req.userId!;
        try {
            const user = await this.userService.getUserById(id);
            if (user) {
                return res
                    .status(200)
                    .json(createResponse(constants.SUCCESS_MESSAGE, user));
            }
        } catch (e) {
            return next(e);
        }
    };
}
