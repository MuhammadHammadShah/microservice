import { Repository } from 'typeorm'

import { User } from '../entity/User'
import { UserData } from '../types'
import createHttpError from 'http-errors'

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({
        firstName,
        lastName,
        email,
        password,
    }: UserData): Promise<User> {
        try {
            return await this.userRepository.save({
                /**  awaiting the .save() method but not returning the result.
            And TypeORM’s .save() actually returns the saved entity — with id.*/
                firstName,
                lastName,
                email,
                password,
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            const error = createHttpError(
                500,
                'Failed to store data in the Database',
            )
            throw error
        }
    }
}
