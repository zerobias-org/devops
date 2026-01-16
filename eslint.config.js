import baseConfig from '@zerobias-org/eslint-config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  ...baseConfig,
  {
    files: ['**/src/**/*.ts', '**/test/**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        // Node.js globals
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        console: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        module: 'readonly',
        process: 'readonly',
        require: 'readonly',
        // Mocha globals
        after: 'readonly',
        afterEach: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        xit: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': 'off',

      // General rules
      'no-console': 'warn',
      'no-plusplus': 'off',
      'no-underscore-dangle': 'off',
      'no-param-reassign': 'off',
      'no-restricted-syntax': 'off',
      'no-await-in-loop': 'off',
      'no-continue': 'off',
      'no-nested-ternary': 'warn',
      'no-lonely-if': 'off',
      'no-case-declarations': 'off',
      'no-useless-escape': 'warn',
      'no-useless-catch': 'off',
      'no-empty': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // Code style
      'max-len': ['error', { code: 200, ignoreComments: true, ignoreStrings: true }],

      // Class rules
      'class-methods-use-this': 'off',
      'prefer-destructuring': 'warn',
      'radix': 'off',

      // Disable unicorn rules that conflict with codebase
      'unicorn/filename-case': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/no-process-exit': 'off',
      'unicorn/prefer-top-level-await': 'off',
      // TODO: Enable these rules when doing larger migration
      'unicorn/numeric-separators-style': 'off',
      'unicorn/catch-error-name': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prefer-event-target': 'off',
      'unicorn/prefer-logical-operator-over-ternary': 'off',
      'unicorn/prefer-string-slice': 'off',
      'unicorn/prefer-at': 'off',
      'unicorn/prefer-includes': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-keyword-prefix': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prefer-string-replace-all': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/consistent-destructuring': 'off',
      'unicorn/no-array-sort': 'off',
      'unicorn/prefer-single-call': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/prefer-structured-clone': 'off',
      'unicorn/prefer-switch': 'off',
      'unicorn/prefer-set-has': 'off',
      'unicorn/no-array-method-this-argument': 'off',
      'unicorn/prefer-string-raw': 'off',
      'unicorn/prefer-array-some': 'off'
    },
  },
];
