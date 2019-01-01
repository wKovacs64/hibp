module.exports = {
  env: {
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: 'pluggable-babel-eslint',
  parserOptions: {
    plugins: ['typescript'],
  },
  plugins: ['typescript'],
  rules: {
    'valid-jsdoc': [
      'error',
      {
        prefer: {
          arg: 'param',
          argument: 'param',
          return: 'returns',
        },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        'no-undef': 'off',
        'typescript/class-name-casing': 'error',
        'typescript/explicit-function-return-type': [
          'error',
          { allowExpressions: true },
        ],
        'typescript/interface-name-prefix': 'error',
        'typescript/no-angle-bracket-type-assertion': 'error',
        'typescript/no-empty-interface': 'error',
        'typescript/no-inferrable-types': [
          'error',
          { ignoreProperties: false, ignoreParameters: false },
        ],
        'typescript/no-namespace': 'error',
        'typescript/no-non-null-assertion': 'error',
        'typescript/no-parameter-properties': 'error',
        'typescript/no-triple-slash-reference': 'error',
        'typescript/no-unused-vars': 'error',
        'typescript/no-var-requires': 'error',
        'typescript/prefer-namespace-keyword': 'error',
        'typescript/type-annotation-spacing': 'error',
      },
    },
  ],
  settings: {
    'import/resolver': {
      jest: {
        jestConfigFile: './jest.config.js',
      },
      node: {
        extensions: ['.js', '.ts'],
        paths: ['src', 'src/__mocks__'],
      },
    },
  },
};
