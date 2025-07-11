import { Repository } from "typeorm"

import { User } from "../entity/User"
import { UserData } from "../types"
import createHttpError from "http-errors"
import { Roles } from "../constants"
import bcrypt from "bcrypt"

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({
        firstName,
        lastName,
        email,
        password,
    }: UserData): Promise<User> {
        // check  for same email
        const user = await this.userRepository.findOne({
            where: {
                email: email,
            },
        })
        if (user) {
            const err = createHttpError(400, "email already exists!")
            throw err
        }

        // hashed password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        try {
            return await this.userRepository.save({
                /**  awaiting the .save() method but not returning the result.
            And TypeORM’s .save() actually returns the saved entity — with id.*/
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: Roles.CUSTOMER,
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            const error = createHttpError(
                500,
                "Failed to store data in the Database",
            )
            throw error
        }
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOne({
            where: {
                email,
            },
        })
    }
}
