// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';

export default {
  root: true,
  ignorePatterns: ['dist', 'node_modules'],
  plugins: ['react-hooks', 'react-refresh', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Ensure Prettier is last to override conflicting rules
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021, // Adjust based on your project needs
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  rules: {
    'prettier/prettier': 'error', // Integrate Prettier as an ESLint rule
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Adjust based on your preference
    'react-hooks/rules-of-hooks': 'error', // Enforce Hooks rules
    'react-hooks/exhaustive-deps': 'warn', // Enforce dependency rules in Hooks
    // Add or customize additional rules as needed
  },
};
