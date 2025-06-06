// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
        ignores: [
            'dist',
            'node_modules',
            'eslint.config.*',
            'log',
            'app.spec.ts',
            'jest.config.js',
        ],
    },
    {
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json'],
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // 'no-console': 'error',
            'dot-notation': 'error',
        },
    },
)
