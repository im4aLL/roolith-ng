import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angularESLint from 'angular-eslint';
import jsdoc from 'eslint-plugin-jsdoc';
import rxjs from '@smarttools/eslint-plugin-rxjs';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      '**/dist',
      '**/out-tsc',
      '**/*.spec.ts',
      '**/mocks/**/*',
      '.pi/**',
      '.pi/**/*',
      '**/.pi/**',
      'src/app/mock/**/*',
      'eslint.config.mjs',
      '.opencode/**',
      'ai/**',
      '.angular/**',
    ],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angularESLint.configs.tsRecommended,
    ],
    // Enables linting of inline Component templates (template: `...`) with the HTML rules
    processor: angularESLint.processInlineTemplates,
    plugins: {
      jsdoc,
      rxjs,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: ['rng'],
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: ['rng'],
          style: 'kebab-case',
        },
      ],
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: false,
            ArrowFunctionExpression: false,
            FunctionExpression: true,
          },

          checkConstructors: false,
          exemptEmptyFunctions: true,
        },
      ],

      'jsdoc/tag-lines': 'off',
      'rxjs/no-nested-subscribe': 'error',
      'rxjs/no-subject-unsubscribe': 'error',
      'rxjs/no-ignored-observable': 'error',
      'rxjs/no-unsafe-switchmap': 'error',
      'rxjs/no-unsafe-takeuntil': 'error',
      'rxjs/no-unsafe-subject-next': 'error',

      'rxjs/finnish': [
        'error',
        {
          functions: true,
          methods: false,

          names: {
            '^(canActivate|canActivateChild|canDeactivate|canLoad|intercept|resolve|validate)$': false,
          },

          parameters: true,
          properties: true,
          strict: false,

          types: {
            '^EventEmitter$': false,
          },

          variables: true,
        },
      ],

      'rxjs/suffix-subjects': [
        'error',
        {
          parameters: true,
          properties: true,
          suffix: 'Subject',

          types: {
            '^EventEmitter$': false,
          },

          variables: true,
        },
      ],

      'rxjs/no-ignored-error': 'warn',
      'rxjs/throw-error': 'warn',
      'no-nested-ternary': 'warn',

      'max-lines-per-function': [
        'warn',
        {
          max: 30,
        },
      ],

      'max-nested-callbacks': [
        'error',
        {
          max: 3,
        },
      ],

      complexity: ['error', 10],
      'max-params': ['error', 3],
      'max-depth': ['error', 2],
      'dot-notation': 'error',
      'object-shorthand': ['error'],
      'prefer-spread': 'error',
      'prefer-arrow-callback': 'error',
      eqeqeq: 'error',
      'no-extra-boolean-cast': 'error',
      'no-unsafe-negation': 'error',

      'id-length': [
        'error',
        {
          properties: 'never',
          exceptions: ['x', 'i', 'j', 'k', '_', 'a', 'b'],
        },
      ],

      'prefer-const': 'error',
      'no-var': 'error',
      'no-new-object': 'error',
      'no-array-constructor': 'error',
      'prefer-destructuring': 'error',
      'no-new-func': 'error',
      'no-undef': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],

          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        // {
        //   selector: 'typeAlias',
        //   format: ['PascalCase'],
        //
        //   custom: {
        //     regex: '^I[A-Z]',
        //     match: true,
        //   },
        // },
        {
          selector: ['variable'],
          types: ['boolean'],
          format: [],
          prefix: ['is', 'has', 'can'],
        },
        {
          selector: ['function', 'variable', 'method'],
          modifiers: ['private', 'protected'],
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
      ],

      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: ['signature', 'decorated-field', 'field', 'constructor', 'method'],
        },
      ],

      '@typescript-eslint/no-restricted-types': 'error',
      'no-alert': 'error',

      'no-console': [
        'warn',
        {
          allow: ['error'],
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angularESLint.configs.templateRecommended,
      ...angularESLint.configs.templateAccessibility,
    ],
    // Override or add template rules here
    rules: {},
  },
);
