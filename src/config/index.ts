import { config } from "dotenv";
import path from "path";
import fs from "fs";

// Prefer env-specific .env.<NODE_ENV>, fall back to .env
const envName = process.env.NODE_ENV || "dev";
const envSpecific = path.join(__dirname, `../../.env.${envName}`);
const envDefault = path.join(__dirname, "../../.env");

if (fs.existsSync(envSpecific)) {
    config({ path: envSpecific });
} else if (fs.existsSync(envDefault)) {
    config({ path: envDefault });
} // else: rely on process env

function resolvePrivateKey(): string | undefined {
    const raw = process.env.PRIVATE_KEY; // may be PEM or base64
    const b64 = process.env.PRIVATE_KEY_BASE64; // optional alt name

    // Prefer explicit *_BASE64 if provided
    if (b64 && b64.trim()) {
        try {
            return Buffer.from(b64, "base64").toString("utf8");
        } catch {
            /* ignore */
        }
    }

    if (!raw) return undefined;

    // If looks like a PEM already, return as-is
    if (raw.includes("BEGIN") && raw.includes("END")) return raw;

    // Otherwise try base64-decode PRIVATE_KEY
    try {
        const decoded = Buffer.from(raw, "base64").toString("utf8");
        if (decoded.includes("BEGIN") && decoded.includes("END"))
            return decoded;
    } catch {
        /* ignore */
    }

    return undefined; // not a valid key
}

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
    JWKS_URI: JWKS_URI || "http://localhost:5501/.well-known/jwks.json",
    PRIVATE_KEY: resolvePrivateKey(),
};
