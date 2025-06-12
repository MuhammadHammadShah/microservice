import express, { NextFunction, Request, Response } from 'express'
import { AuthController } from '../controllers/AuthController'
import { UserService } from '../services/userService'
import { AppDataSource } from '../config/data-source'
import { User } from '../entity/User'
import logger from '../config/logger'
import registerValidators from '../validators/register-validator'
import { TokenService } from '../services/TokenService'

const router = express.Router()

const userRepository = AppDataSource.getRepository(User)
const userService = new UserService(userRepository)
const tokenService = new TokenService()
const authController = new AuthController(userService, logger(), tokenService)

router.post(
    '/register',
    registerValidators,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await authController.register(req, res, next)
        } catch (err) {
            next(err)
        }
    },
)

export default router
