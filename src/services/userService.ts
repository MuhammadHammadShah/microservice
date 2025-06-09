import { Repository } from 'typeorm'

import { User } from '../entity/User'
import { UserData } from '../types'

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({
        firstName,
        lastName,
        email,
        password,
    }: UserData): Promise<User> {
        return await this.userRepository.save({
            /**  awaiting the .save() method but not returning the result.
            And TypeORM’s .save() actually returns the saved entity — with id.*/
            firstName,
            lastName,
            email,
            password,
        })
    }
}
