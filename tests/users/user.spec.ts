import { DataSource } from "typeorm"
import { AppDataSource } from "../../src/config/data-source"
import createJWKSMock from "mock-jwks"
import app from "../../src/app"
import request from "supertest"
import { User } from "../../src/entity/User"
import { Roles } from "../../src/constants"

// instead of self many also write it as ` whoAmI `
describe("GET /auth/self", () => {
    let connection: DataSource
    let jwks: ReturnType<typeof createJWKSMock>

    beforeAll(async () => {
        jwks = createJWKSMock("http://localhost:5501")
        connection = await AppDataSource.initialize()
        await connection.synchronize(true)
    })

    beforeEach(async () => {
        jwks.start()
        await connection.dropDatabase()
        await connection.synchronize()
    })

    afterEach(() => {
        jwks.stop()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    // happy path

    describe("Given all fields", () => {
        it("should return  the return the 200 status code", async () => {
            const response = await request(app).get("/auth/self").send()
            expect(response.statusCode).toBe(200)
        })

        it("should return the user data", async () => {
            // Register user
            const userData = {
                firstName: "Rakesh",
                lastName: "K",
                email: "123@gmail.com",
                password: "secret",
            }
            const userRepository = connection.getRepository(User)
            const data = await userRepository.save({
                ...userData,
                role: Roles.CUSTOMER,
            })
            //Generate Token

            const accessToken = jwks.token({
                sub: String(data.id),
                role: data.role,
            })
            // Add Token to Cookie

            const response = await request(app)
                .get("/auth/self")
                .set("Cookie", [`accessToken=${accessToken};`])
                .send()

            // Assert
            // check if user id matches with registered user
            expect((response.body as Record<string, string>).id).toBe(data.id)
        })
    })
})
