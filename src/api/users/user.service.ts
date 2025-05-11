import { PrismaClient } from "@prisma/client";
import CreateUserDto from "./dto/create-user.dto";
import { HttpException } from "../../shared/exceptions/http.exception";
import bcrypt from "bcrypt";
import LoginDto from "./dto/login.dto";
import jwt from "jsonwebtoken";

export interface IUser {
    name: string;
    username: string;
    password: string;
    email: string;
}

export class UserService {
    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    async insertNewUser(user: CreateUserDto) {
        try {
            const existingUser = await this.db.user.findUnique({
                where: {
                    username: user.username,
                },
            });

            if (existingUser) {
                throw new HttpException(400, "User already exist");
            }

            const hashedPassword = await this.hashPassword(user.password);

            const newUser = await this.db.user.create({
                data: {
                    username: user.username,
                    password: hashedPassword,
                    name: user.name,
                    email: user.email,
                },
            });

            return newUser.username;
        } catch (error) {
            throw error;
        }
    }

    async getAllUser() {
        const users = await this.db.user.findMany({
            select: {
                id: true,
                name: true,
                created_at: true,
                username: true,
            },
        });

        return users;
    }

    async login(loginData: LoginDto) {
        const user = await this.db.user.findUnique({
            where: {
                username: loginData.username,
            },
        });

        if (!user) {
            throw new HttpException(404, "User not found");
        }

        const isPasswordCorrect = await this.comparePassword(
            loginData.password,
            user.password,
        );

        if (!isPasswordCorrect) {
            throw new HttpException(400, "Username or password incorrect");
        }

        return this.createJwtToken(user.id);
    }

    async updateUser(id: string, user: IUser) {
        try {
            if (user.password) {
                user.password = await this.hashPassword(user.password);
            }

            const updatedUser = await this.db.user.update({
                where: {
                    id,
                },
                data: {
                    username: user.username,
                    password: user.password,
                    name: user.name,
                },
            });

            return updatedUser.username;
        } catch (e) {
            throw e;
        }
    }

    async deleteUser(id: string) {
        try {
            const deletedUser = await this.db.user.delete({
                where: {
                    id,
                },
            });

            return deletedUser.username;
        } catch (e) {
            throw e;
        }
    }

    async getUserById(id: string) {
        try {
            const user = await this.db.user.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    name: true,
                    username: true,
                },
            });

            if (!user) {
                throw new HttpException(404, "User not found");
            }

            return user;
        } catch (e) {
            throw e;
        }
    }

    private hashPassword(plainPassword: string) {
        return bcrypt.hash(plainPassword, 10);
    }

    private comparePassword(plainPassword: string, hashedPassword: string) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    private createJwtToken(userId: string) {
        const jwtKey = process.env.JWT_KEY;
        if (!jwtKey) {
            throw new HttpException(500, "JWT_KEY env not found");
        }
        return jwt.sign({ userId }, jwtKey, {
            expiresIn: "1h",
        });
    }
}
