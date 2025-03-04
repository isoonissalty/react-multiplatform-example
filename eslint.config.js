const { FlatCompat } = require('@eslint/eslintrc');
const eslint = require('@eslint/js');
const prettier = require('eslint-config-prettier');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  eslint.configs.recommended,
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  ...compat.extends('plugin:prettier/recommended'),
  prettier,
  {
    ignores: [
      // Dependency directories
      'node_modules/',
      '.pnp/',
      '.pnp.js',

      // Build outputs
      'dist/',
      'build/',
      'out/',
      '.next/',
      '.nuxt/',
      '.cache/',

      // Coverage directory
      'coverage/',

      // Misc
      '.DS_Store',

      // Package files
      'package-lock.json',
      'yarn.lock',
    ],
  },
];
