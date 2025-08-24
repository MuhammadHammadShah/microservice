import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/config/data-source";
import createJWKSMock from "mock-jwks";
import app from "../../src/app";
import request from "supertest";
import { User } from "../../src/entity/User";
import { Roles } from "../../src/constants";

// instead of self many also write it as ` whoAmI `
describe("POST /users", () => {
    let connection: DataSource;
    let jwks: ReturnType<typeof createJWKSMock>;

    beforeAll(async () => {
        jwks = createJWKSMock("http://localhost:5501");
        connection = await AppDataSource.initialize();
        // await connection.synchronize(true);
    });

    beforeEach(async () => {
        jwks.start();
        await connection.dropDatabase();
        await connection.synchronize();
    });

    afterEach(() => {
        jwks.stop();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    // happy path

    describe("Given all fields", () => {
        it("should persist the user in the database", async () => {
            const adminToken = jwks.token({
                sub: "1",
                role: Roles.ADMIN,
            });

            const userData = {
                firstName: "Rakesh",
                lastName: "K",
                email: "123@gmail.com",
                password: "secret",
                tenantId: 1,
            };

            //Generate Token

            // Add Token to Cookie

            await request(app)
                .post("/users")
                .set("Cookie", [`accessToken=${adminToken}`])
                .send(userData);

            // Assert

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            expect(users).toHaveLength(1);
            // expect(users[0].role).toBe(Roles.MANAGER);
            expect(users[0].email).toBe(userData.email);
        });
        it("should create a manager user", async () => {
            const adminToken = jwks.token({
                sub: "1",
                role: Roles.ADMIN,
            });

            const userData = {
                firstName: "Rakesh",
                lastName: "K",
                email: "123@gmail.com",
                password: "secret",
                tenantId: 1,
            };

            //Generate Token

            // Add Token to Cookie

            await request(app)
                .post("/users")
                .set("Cookie", [`accessToken=${adminToken}`])
                .send(userData);

            // Assert

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            // expect(users).toHaveLength(1);
            expect(users[0].role).toBe(Roles.MANAGER);
            // expect(users[0].email).toBe(userData.email);
        });

        it.todo("should return 403 if a non-admin user tries to create a user");
    });
});
