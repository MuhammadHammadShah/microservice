import { NextFunction, Response } from "express";
import { AuthRequest, RegisterUserRequest } from "../types";
import { UserService } from "../services/userService";
import { Logger } from "winston";

import { validationResult } from "express-validator";
import { JwtPayload } from "jsonwebtoken";

import { TokenService } from "../services/TokenService";
import createHttpError from "http-errors";
import { CredentialService } from "../services/credentialService";
import { Roles } from "../constants";

export class AuthController {
    /*Called dependency injection*/
    /*  This code removes coupling with the Service file, so the code dont depends so much on service file  */
    constructor(
        private userService: UserService,
        private logger: Logger,
        private tokenService: TokenService,
        private credentialService: CredentialService,
    ) {}
    /* Register*/
    async register(
        req: RegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({
                errors: result.array(),
            });
        }

        const { firstName, lastName, email, password } = req.body;

        this.logger.debug("New Request to register a user", {
            firstName,
            lastName,
            email,
            password: "********",
        });
        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
                role: Roles.CUSTOMER,
            });
            this.logger.info("New User has been registere", { id: user.id });

            const payload: JwtPayload = {
                sub: String(user.id),
                role: user.role,
                // add tenant id to the payload
                tenant: user.tenant ? String(user.tenant.id) : "",
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            };

            //access token
            const accessToken = this.tokenService.generateAccessToken(payload);

            //

            // Persist the Refresh Token
            const newRefreshToken =
                await this.tokenService.persistRefreshToken(user);
            //

            // refresh token
            const refreshToken = this.tokenService.generateRefreshToken({
                ...payload,
                id: String(newRefreshToken.id),
            });
            //

            res.cookie("accessToken", accessToken, {
                domain: "localhost", // Config.MAIN_DOMAIN
                sameSite: "strict",
                maxAge: 1000 * 60 * 60, // 1h
                httpOnly: true,
            });
            res.cookie("refreshToken", refreshToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1Y
                httpOnly: true,
            });
            this.logger.info("User has been registered", { id: user.id });

            /** */
            // return res.status(201).json({
            //     id: user.id,
            // })

            res.status(201).json({
                id: user.id,
            });
        } catch (err) {
            next(err);
            return;
        }
    }
    /**/

    //

    /* Login*/

    async login(req: RegisterUserRequest, res: Response, next: NextFunction) {
        //validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({
                errors: result.array(),
            });
        }

        const { email, password } = req.body;

        this.logger.debug("New Request to login a user", {
            email,
            password: "********",
        });

        // check  if username (email) exists in database
        // Compare password
        // Generate tokens
        // Add tokens to Cookies
        // Return the Response (id)

        try {
            const user = await this.userService.findByEmail(email);
            if (!user) {
                const error = createHttpError(
                    400,
                    "Email or Password does not match",
                );
                next(error);
                return;
            }

            // check password

            const passwordMatch = await this.credentialService.comparePassword(
                password,
                user.password,
            );
            if (!passwordMatch) {
                const error = createHttpError(
                    400,
                    "Email or Password does not match",
                );
                next(error);
                return;
            }

            const payload: JwtPayload = {
                sub: String(user.id),
                role: user.role,
                tenant: user.tenant ? String(user.tenant.id) : "",
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            };

            //access token
            const accessToken = this.tokenService.generateAccessToken(payload);

            //

            // Persist the Refresh Token
            const newRefreshToken =
                await this.tokenService.persistRefreshToken(user);
            //

            // refresh token
            const refreshToken = this.tokenService.generateRefreshToken({
                ...payload,
                id: String(newRefreshToken.id),
            });
            //

            res.cookie("accessToken", accessToken, {
                domain: "localhost", // Config.MAIN_DOMAIN
                sameSite: "strict",
                maxAge: 1000 * 60 * 60, // 1h
                httpOnly: true, // very important
            });
            res.cookie("refreshToken", refreshToken, {
                domain: "localhost", // Config.MAIN_DOMAIN
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1Y
                httpOnly: true, // very important
            });

            this.logger.info("User has been logged in", { id: user.id });

            /** */
            // return res.status(200).json({
            //     id: user.id,
            // })
            res.status(200).json({
                id: user.id,
            });
        } catch (err) {
            next(err);
            return;
        }
    }
    /**/

    //

    /* User info "self" */

    async self(req: AuthRequest, res: Response) {
        //token req.auth.id
        // console.log(req.auth)
        const user = await this.userService.findById(Number(req.auth.sub));
        res.json({
            ...user,
            password: undefined,
        });
    }
    /**/

    //

    /* refresh RefreshToken */
    async refresh(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const payload: JwtPayload = {
                sub: req.auth.sub,
                role: req.auth.role,
                tenant: req.auth.tenant,
                firstName: req.auth.firstName,
                lastName: req.auth.lastName,
                email: req.auth.email,
            };
            // access Token
            const accessToken = this.tokenService.generateAccessToken(payload);

            const user = await this.userService.findById(Number(req.auth.sub));
            if (!user) {
                const error = createHttpError(
                    400,
                    "User with the token could not find",
                );
                next(error);
                return;
            }

            // Persist the refresh token
            const newRefreshToken =
                await this.tokenService.persistRefreshToken(user);

            // Delete old refresh token
            await this.tokenService.deleteRefreshToken(Number(req.auth.id));

            const refreshToken = this.tokenService.generateRefreshToken({
                ...payload,
                id: String(newRefreshToken.id),
            });

            res.cookie("accessToken", accessToken, {
                domain: "localhost", //Config.MAIN_DOMAIN,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 1, // 1d
                httpOnly: true, // Very important
            });

            res.cookie("refreshToken", refreshToken, {
                domain: "localhost", //Config.MAIN_DOMAIN,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1y
                httpOnly: true, // Very important
            });
            this.logger.info("User has been logged in", { id: user.id });

            res.json({
                id: user.id,
            });
        } catch (err) {
            next(err);
            return;
        }
    }
    /**/

    //

    /* logout the User */

    async logout(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await this.tokenService.deleteRefreshToken(Number(req.auth.sub));
            this.logger.info("Refresh token has been deleted", {
                id: req.auth.id,
            });

            this.logger.info("User has been logged out", {
                id: req.auth.sub,
            });

            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            res.json({});
        } catch (err) {
            next(err);
            return;
        }
    }

    /**/
}
