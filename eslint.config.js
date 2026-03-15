// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from 'eslint/config';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import reactRefresh from 'eslint-plugin-react-refresh';

export default defineConfig([
  globalIgnores(['dist', 'submission', 'storybook-static']),
  // Register AirBnB Extended plugins (config objects that register each plugin)
  plugins.stylistic,
  plugins.importX,
  plugins.react,
  plugins.reactA11y,
  plugins.reactHooks,
  // AirBnB Extended: Base recommended (core JS rules + imports + stylistic)
  ...configs.base.recommended,
  // AirBnB Extended: React recommended (React + Hooks + JSX-A11y)
  ...configs.react.recommended,
  // Vite React Refresh (not part of AirBnB)
  reactRefresh.configs.vite,
  // Project-specific overrides
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',

      'react/prop-types': 'off',

      'no-console': 'warn',

      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],

      'func-style': 'off',

      'import-x/prefer-default-export': 'off',

      'no-param-reassign': ['error', {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      }],

      'jsx-a11y/label-has-associated-control': ['error', {
        assert: 'either',
      }],

      'react/no-danger': 'off',
    },
  },
  // Test files: allow devDependencies imports
  {
    files: ['**/*.test.{js,jsx}', '**/setupTests.js'],
    rules: {
      'import-x/no-extraneous-dependencies': ['error', {
        devDependencies: true,
      }],
    },
  },
  // Cypress E2E: allow globals and devDependencies
  {
    files: ['cypress/**/*.{js,jsx}', 'cypress.config.js'],
    languageOptions: {
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        before: 'readonly',
        after: 'readonly',
        expect: 'readonly',
      },
    },
    rules: {
      'import-x/no-extraneous-dependencies': ['error', {
        devDependencies: true,
      }],
    },
  },
  ...storybook.configs["flat/recommended"]
]);
