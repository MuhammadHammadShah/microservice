// login.spec.ts

import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/config/data-source";

describe("POST /auth/register", () => {
    let connection: DataSource;

    beforeAll(async () => {
        connection = await AppDataSource.initialize();
        await connection.synchronize(true);
    });

    beforeEach(async () => {
        await connection.dropDatabase();
        await connection.synchronize();
    });

    afterAll(async () => {
        if (connection) {
            await connection.destroy();
        }
    });

    // happy path

    describe("Given all fields", () => {
        it.todo("should login the user");
    });
});
