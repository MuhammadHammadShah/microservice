import { NextFunction, Response, Request } from "express";
import { UserService } from "../services/userService";

import { CreateUserRequest, UserQueryParams } from "../types";
import { Roles } from "../constants";
import { matchedData } from "express-validator";
import { Logger } from "winston";

export class UserController {
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {}

    async create(req: CreateUserRequest, res: Response, next: NextFunction) {
        const { firstName, lastName, email, password, tenantId } = req.body;

        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
                role: Roles.MANAGER,
                tenantId,
            });
            res.status(201).json({ id: user.id });
        } catch (err) {
            next(err);
            return;
        }
    }

    //

    async getAll(req: Request, res: Response, next: NextFunction) {
        const validatedQuery = matchedData(req, { onlyValidData: true });

        try {
            const [users, count] = await this.userService.getAll(
                validatedQuery as UserQueryParams,
            );

            this.logger.info("All users have been fetched");
            res.json({
                currentPage: validatedQuery.currentPage as number,
                perPage: validatedQuery.perPage as number,
                total: count,
                data: users,
            });
        } catch (err) {
            next(err);
        }
    }
}
