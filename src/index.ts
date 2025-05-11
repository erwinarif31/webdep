import express, { Application, Request, Response } from "express";
import {
    errorMiddleware,
    notFoundMiddleware,
} from "./shared/middlewares/error.middleware";
import { UserController } from "./api/users/user.controller";
import Logger from "./shared/utils/logger";
import morganMiddleware from "./shared/middlewares/morgan.middleware";

const cors = require("cors");

class Server {
    private app: Application;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.registerMiddlewares();
        this.routes();
        this.registerErrorMiddlewares();
    }

    private registerMiddlewares() {
        this.app.use(express.json());
        this.app.use(morganMiddleware);
    }

    private registerErrorMiddlewares() {
        this.app.use(notFoundMiddleware);
        this.app.use(errorMiddleware);
    }

    private routes() {
        this.app.use(new UserController().router);
        // create simple api /api/test
        this.app.get("/api/test", (req: Request, res: Response) => {
            res.status(200).json({
                message: "Hello World",
            });
        });
    }

    public run() {
        this.app.listen(3001, () => {
            Logger.debug(`Server is up and running @ http://localhost:3001`);
        });
    }
}

const server = new Server();
server.run();
