import express, { NextFunction, Request, Response } from "express"
import { AuthController } from "../controllers/AuthController"
import { UserService } from "../services/userService"
import { AppDataSource } from "../config/data-source"
import { User } from "../entity/User"
import logger from "../config/logger"
import registerValidators from "../validators/register-validator"
import loginValidators from "../validators/login-validator"
import { TokenService } from "../services/TokenService"
import { RefreshToken } from "../entity/RefreshToken"
import { CredentialService } from "../services/credentialService"

const router = express.Router()

const userRepository = AppDataSource.getRepository(User)
const userService = new UserService(userRepository)
const refreshTokenRepository = AppDataSource.getRepository(RefreshToken)
const tokenService = new TokenService(refreshTokenRepository)
const credentialService = new CredentialService()
const authController = new AuthController(
    userService,
    logger(),
    tokenService,
    credentialService,
)

router.post(
    "/register",
    registerValidators,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await authController.register(req, res, next)
        } catch (err) {
            next(err)
        }
    },
)

router.post(
    "/login",
    loginValidators,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await authController.login(req, res, next)
        } catch (err) {
            next(err)
        }
    },
)

// authController k upar safe name ka method call krna hai.

router.get("/self", async (req: Request, res: Response) => {
    await authController.self(req, res)
})
router.get("/", (req, res) => {
    res.send("hi from me")
})

export default router
