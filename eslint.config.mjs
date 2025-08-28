// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
        ignores: [
            "dist",
            "node_modules",
            "eslint.config.mjs",
            "jest.config.js",
            "scripts/generateKeys.mjs",
            "scripts/convertPemToken.mjs",
            "scripts/*.mjs",
            "*.spec.ts",
            "tests/",
            "coverage/",
            ".github",
        ],
    },
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                allowDefaultProject: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            noWarnIgnored: true, // tells eslint not to warn on ignored files
        },
        rules: {
            // "no-console": "error",
            // 'dot-notation': 'error',
        },
    },
);
