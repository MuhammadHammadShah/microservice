import request from 'supertest'
import app from '../../src/app'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../../src/config/data-source'
import { User } from '../../src/entity/User'
import { Roles } from '../../src/constants'
import { isJwt } from '../utils'

//
describe('POST /auth/register', () => {
    let connection: DataSource

    beforeAll(async () => {
        connection = await AppDataSource.initialize()
        await connection.synchronize(true)
    })

    beforeEach(async () => {
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
        // favourite one to be copied
        it('should store the hashed passowrd in the database', async () => {
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

            expect(users[0].password).not.toBe(userData.password)
            expect(users[0].password).toHaveLength(60)
            expect(users[0].password).toMatch(/^\$2b\$\d+\$/)
        })

        it('should return 400 status code if "email" already exits in database', async () => {
            /* Arrange */
            const userData = {
                firstName: 'Rakesh',
                lastName: 'K',
                email: '123@gmail.com',
                password: 'secret',
            }

            const userRepository = connection.getRepository(User)
            await userRepository.save({ ...userData, role: Roles.CUSTOMER })

            /* Act */

            const response = await request(app)
                .post('/auth/register')
                .send(userData)

            /* Assert */
            const users = await userRepository.find()
            expect(response.statusCode).toBe(400)
            expect(users).toHaveLength(1)
        })
        it('should return the access token and refresh token in a cookie', async () => {
            /* Arrange */
            const userData = {
                firstName: 'Rakesh',
                lastName: 'K',
                email: '123@gmail.com',
                password: 'secret',
            }

            /* Act */

            // we need the headers within response
            const response = await request(app)
                .post('/auth/register')
                .send(userData)

            /* Assert */
            let accessToken = null
            let refreshToken = null
            const cookies =
                (response.headers['set-cookie'] as unknown as string[]) || []

            cookies.forEach((cookie) => {
                if (cookie.startsWith('accessToken=')) {
                    accessToken = cookie.split(';')[0].split('=')[1] // this line does the below
                    // it first split the token by ; then get the first element then split it by = and get the second element which a token value
                }

                if (cookie.startsWith('refreshToken=')) {
                    refreshToken = cookie.split(';')[0].split('=')[1]
                }
            })

            expect(accessToken).not.toBeNull()
            expect(refreshToken).not.toBeNull()
            console.log(accessToken)
            expect(isJwt(accessToken)).toBeTruthy()
            // expect(isJwt(refreshToken)).toBeTruthy()
        })
    })

    //
    describe('Fields are Missing', () => {
        it('should return 400 status code if email field is missing', async () => {
            /* Arrange */
            const userData = {
                firstName: 'Rakesh',
                lastName: 'K',
                email: '',
                password: 'secret',
            }

            /* Act */

            const response = await request(app)
                .post('/auth/register')
                .send(userData)

            /* Assert */

            expect(response.statusCode).toBe(400)
            const userRepository = connection.getRepository(User)

            const users = await userRepository.find()
            expect(users).toHaveLength(0)
        })
    })
    describe('Fields are not in Proper format', () => {
        it('should trim the email field `remove white spaces `', async () => {
            /* Arrange */
            const userData = {
                firstName: 'Rakesh',
                lastName: 'K',
                email: ' 123@gmail.com ',
                password: 'secret',
            }

            /* Act */

            await request(app).post('/auth/register').send(userData)

            /* Assert */
            const userRepository = connection.getRepository(User)
            const users = await userRepository.find()
            const user = users[0]
            expect(user.email).toBe('123@gmail.com')
        })
    })
})
