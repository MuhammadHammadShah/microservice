import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createHttpError, { HttpError } from "http-errors";
import logger from "./config/logger";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";

const app = express();
app.use(cookieParser());
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get("/", (req, res, next) => {
    // const err = createHttpError(401, 'You cannot access this route.') // if the middleware function is async use next() instead of throw()
    // next(err)
    // throw err
    res.send("Welcome to auth==============service");
});

app.use("/auth", authRouter);

// global error handler

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger().error(err.message);
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                msg: err.message,
                path: "",
                location: "",
            },
        ],
    });
});

export default app;
