import express, { Application, Request, Response } from "express";
import {
    errorMiddleware,
    notFoundMiddleware,
} from "./shared/middlewares/error.middleware";
import { UserController } from "./api/users/user.controller";
import Logger from "./shared/utils/logger";
import morganMiddleware from "./shared/middlewares/morgan.middleware";
const cors = require("cors");

// Create Express app
const app = express();

// Apply middlewares
app.use(cors());
app.use(express.json());
app.use(morganMiddleware);

// Define routes
app.use(new UserController().router);
app.get("/api/test", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Hello World",
    });
});

// Health check route - useful for debugging
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Server is running");
});

// Register error middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// For local development only
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        Logger.debug(`Server is up and running @ http://localhost:${PORT}`);
    });
}

// Export the Express app
export default app;
