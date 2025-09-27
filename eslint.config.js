import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  // Ignore patterns
  {
    ignores: ['dist', 'node_modules'],
  },

  // Base configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Main configuration
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      perfectionist: perfectionist,
      prettier: prettier,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      sonarjs: sonarjs,
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'warn',
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',

      // React rules
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Perfectionist sorting rules
      'perfectionist/sort-classes': [
        'warn',
        {
          groups: [
            'index-signature',
            ['property'],
            'constructor',
            'method',
            'get-method',
            'set-method',
            'static-method',
            'protected-method',
            'private-method',
            'function-property',
            'protected-function-property',
            'private-function-property',
            'unknown',
          ],
          order: 'asc',
          type: 'alphabetical',
        },
      ],

      'perfectionist/sort-enums': 'warn',

      'perfectionist/sort-exports': 'warn',

      'perfectionist/sort-imports': 'warn',
      'perfectionist/sort-interfaces': [
        'warn',
        {
          groups: ['required-property', 'optional-property'],
          order: 'asc',
        },
      ],
      'perfectionist/sort-intersection-types': 'warn',
      'perfectionist/sort-jsx-props': 'warn',
      'perfectionist/sort-named-imports': 'warn',
      'perfectionist/sort-object-types': [
        'warn',
        {
          groups: ['required-property', 'optional-property'],
          order: 'asc',
        },
      ],
      'perfectionist/sort-objects': 'warn',
      'perfectionist/sort-union-types': [
        'warn',
        {
          groups: [
            'conditional',
            'function',
            'import',
            'intersection',
            'named',
            'object',
            'operator',
            'literal',
            'keyword',
            'tuple',
            'union',
            'nullish',
          ],
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      // Prettier rules
      'prettier/prettier': 'error',
      // React Refresh rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 'off',
      // SonarJS rules
      'sonarjs/cognitive-complexity': ['warn', 15],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
