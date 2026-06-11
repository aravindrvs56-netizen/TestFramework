import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: [
      'allure-report/**',
      'playwright-report/**',
      'test-results/**',
      'node_modules/**',
    ],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
  },
  {
    files: ['tests/**/*.js', 'pages/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
