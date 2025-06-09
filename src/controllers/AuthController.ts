import { NextFunction, Response } from 'express'
import { RegisterUserRequest } from '../types'
import { UserService } from '../services/userService'
import { Logger } from 'winston'

export class AuthController {
    /*Called dependency injection*/
    /*  This code removes coupling with the Service file, so the code dont depends so much on service file  */
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {}
    /**/
    async register(
        req: RegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
        const { firstName, lastName, email, password } = req.body
        this.logger.debug('New Request to register a user', {
            firstName,
            lastName,
            email,
            password: '********',
        })
        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            })
            this.logger.info('User has been registered', { id: user.id })
            return res.status(201).json({
                id: user.id,
            })
        } catch (err) {
            next(err)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}
