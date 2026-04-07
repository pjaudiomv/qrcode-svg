import globals from 'globals'
import prettier from 'eslint-config-prettier'

export default [
    { ignores: ['dist/**', 'node_modules/**'] },
    prettier,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2022,
            },
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
                extraFileExtensions: ['.js'],
            },
        },
        rules: {
            'no-var': ['warn'],
            'prefer-const': ['warn'],
        },
    },
    {
        files: ['src/qrcode.js'],
        rules: {
            'no-var': 'off',
            'prefer-const': 'off',
        },
    },
]
