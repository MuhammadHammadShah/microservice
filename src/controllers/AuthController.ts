import { Response } from 'express'
import { RegisterUserRequest } from '../types'
import { UserService } from '../services/userService'

export class AuthController {
    /*Called dependency injection*/
    /*  This code removes coupling with the Service file, so the code dont depends so much on service file  */
    constructor(private userService: UserService) {}
    /**/
    async register(req: RegisterUserRequest, res: Response) {
        try {
            const { firstName, lastName, email, password } = req.body
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            })
            return res.status(201).json({
                id: user.id,
            })
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}
