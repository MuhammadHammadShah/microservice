//data-source

import "reflect-metadata";
import { DataSource } from "typeorm";
import { Config } from ".";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: Config.DB_HOST,
    port: Number(Config.DB_PORT),
    username: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    database: Config.DB_NAME,

    /* Don't use this in production `synchronize` , always keep `false`  */
    synchronize: false,
    logging: false,
    entities: ["src/entity/*.{ts,js}"], // Whenever, We create an entity, we have to register it here.
    migrations: ["src/migration/*.{ts,js}"],
    subscribers: [],
});
