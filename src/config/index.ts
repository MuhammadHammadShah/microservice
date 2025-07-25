import { config } from "dotenv";
import path from "path";

config({
    path: path.join(__dirname, `../../.env.${process.env.NODE_ENV || "dev"}`),
});

const {
    PORT,
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    REFRESH_TOKEN_SECRET,
    JWKS_URI,
    CLIENT_UI_DOMAIN,
    ADMIN_UI_DOMAIN,
    MAIN_DOMAIN,
} = process.env;

export const Config = {
    PORT,
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    REFRESH_TOKEN_SECRET,
    JWKS_URI,
    CLIENT_UI_DOMAIN,
    ADMIN_UI_DOMAIN,
    MAIN_DOMAIN,
};
