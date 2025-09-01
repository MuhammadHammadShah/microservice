import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import { HttpError } from "http-errors";
import logger from "./config/logger";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import tenantRouter from "./routes/tenant";
import userRouter from "./routes/user";

const app = express();
app.use(
    cors({
        // todo move to .env file

        origin: ["http://localhost:5173"],
        credentials: true,
    }),
);
// app.options("*", cors());
app.use(express.static("public", { dotfiles: "allow" }));

app.use(express.json());
app.use(cookieParser());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get("/", (req, res, next) => {
    // const err = createHttpError(401, 'You cannot access this route.') // if the middleware function is async use next() instead of throw()
    // next(err)
    // throw err
    res.send("Welcome to auth==============service");
});

app.use("/auth", authRouter);
app.use("/tenants", tenantRouter);
app.use("/users", userRouter);

// global error handler

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger().error(err.message);
    const statusCode = err.statusCode || err.status || 500;

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
