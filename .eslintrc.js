module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/prettier',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { "argsIgnorePattern": "^_" }],
        'comma-dangle': [2, 'always-multiline'],
        'camelcase': 'off',
    },
}
