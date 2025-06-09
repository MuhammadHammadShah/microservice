import request from 'supertest'
import app from '../../src/app'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../../src/config/data-source'
import { User } from '../../src/entity/User'
import { Roles } from '../../src/constants'

//
describe('POST /auth/register', () => {
    let connection: DataSource

    // hook, run before or after any test suit
    beforeAll(async () => {
        connection = await AppDataSource.initialize()
        await connection.synchronize(true) // ⚠️ THIS RECREATES SCHEMA EACH TIME
    })

    /*An important step to reset database for each test, so data within database won't matched up*/
    beforeEach(async () => {
        // Database truncate
        await connection.dropDatabase()
        await connection.synchronize()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    describe('Given all Fields', () => {
        it('should return 201 status code', async () => {
            // AAA

            /* Arrange */
            const userData = {
                firstName: 'Rakesh',
                lastName: 'K',
                email: '123@gmail.com',
                password: 'secret',
            }

            /* Act */

            const response = await request(app)
                .post('/auth/register')
                .send(userData)

            /* Assert */

            expect(response.statusCode).toBe(201)
        })
        it('should return valid JSON responses', async () => {
            // AAA

            /* Arrange */
            const userData = {
                firstName: 'Rakesh',
                lastName: 'K',
                email: '123@gmail.com',
                password: 'secret',
            }

            /* Act */

            const response = await request(app)
                .post('/auth/register')
                .send(userData)

            /* Assert */

            expect(
                (response.headers as Record<string, string>)['content-type'],
            ).toEqual(expect.stringContaining('json'))
        })
        it('should persist the user in the database', async () => {
            /* Arrange */
            const userData = {
                firstName: 'Rakesh',
                lastName: 'K',
                email: '123@gmail.com',
                password: 'secret',
            }

            /* Act */

            await request(app).post('/auth/register').send(userData)

            /* Assert */
            const userRepository = connection.getRepository(User)
            const users = await userRepository.find()
            expect(users).toHaveLength(1)
            expect(users[0].firstName).toBe(userData.firstName)
            expect(users[0].lastName).toBe(userData.lastName)
            expect(users[0].email).toBe(userData.email)
        })
        it('should return an id of the created user', async () => {
            /**
             * interface for safety of res.body
             */
            interface RegisteredResponse {
                id: number
            }

            /* Arrange */
            const userData = {
                firstName: 'Rakesh',
                lastName: 'K',
                email: '123@gmail.com',
                password: 'secret',
            }

            /* Act */

            const response = await request(app)
                .post('/auth/register')
                .send(userData)

            const responseBody = response.body as RegisteredResponse
            /* Assert */

            const userRepository = connection.getRepository(User)
            const users = await userRepository.find()
            expect(users).toHaveLength(1)
            expect(responseBody).toHaveProperty('id')
            expect(typeof responseBody.id).toBe('number')
        })
        it('should assign a customer role', async () => {
            /* Arrange */
            const userData = {
                firstName: 'Rakesh',
                lastName: 'K',
                email: '123@gmail.com',
                password: 'secret',
            }

            /* Act */

            await request(app).post('/auth/register').send(userData)

            /* Assert */

            const userRepository = connection.getRepository(User)
            const users = await userRepository.find()

            expect(users[0]).toHaveProperty('role')
            expect(users[0].role).toBe(Roles.CUSTOMER)
        })
    })

    //
    describe('Fields are Missing', () => {})
})
