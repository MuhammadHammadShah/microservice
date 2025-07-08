import { DataSource } from "typeorm"
import { AppDataSource } from "../../src/config/data-source"

import app from "../../src/app"
import request from "supertest"

describe("GET /auth/self", () => {
    // instead of self many also write it as ` whoAmI `
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

    // happy path

    describe("Given all fields", () => {
        it("should return  the return the 200 status code", async () => {
            const response = await request(app).get("/auth/self").send()
            expect(response.statusCode).toBe(200)
        })

        // it("should return the user data", async()=>{
        // Register user
        //Generate Token
        // Add Token to Cookie

        //  const response = await request(app).get("/auth/self").send()

        // Assert
        // check if user id matches with registered user

        // })
    })
})
