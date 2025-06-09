import express from 'express'
import { AuthController } from '../controllers/AuthController'
import { UserService } from '../services/userService'
import { AppDataSource } from '../config/data-source'
import { User } from '../entity/User'

const router = express.Router()

const userRepository = AppDataSource.getRepository(User)
const userService = new UserService(userRepository)
const authController = new AuthController(userService)

router.post('/register', async (req, res, next) => {
    try {
        await authController.register(req, res)
    } catch (err) {
        next(err)
    }
})

export default router
