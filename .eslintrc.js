/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "jest", "jsx-a11y"],
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: false,
    "jest/globals": true,
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: "module",
  },
  globals: {
    strapi: true,
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": [
      "error",
      { "ts-ignore": "allow-with-description" },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "prettier/prettier": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "object-shorthand": ["error", "always"],
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    "prefer-destructuring": [
      "error",
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    "no-undef-init": "error",
    "dot-notation": "error",
    "no-else-return": [
      "error",
      {
        allowElseIf: false,
      },
    ],
    eqeqeq: ["error", "smart"],
    "no-implicit-coercion": "error",
    "no-multi-spaces": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "require-await": "error",
    "no-nested-ternary": "error",
    "block-scoped-var": "error",
    "no-duplicate-imports": "error",
    "no-var": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "switch",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "if",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "export",
      },
      {
        blankLine: "any",
        prev: "export",
        next: "export",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "try",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "while",
      },
      {
        blankLine: "always",
        prev: "import",
        next: "*",
      },
      {
        blankLine: "never",
        prev: "import",
        next: "import",
      },
      {
        blankLine: "always",
        prev: ["const", "let", "var"],
        next: "*",
      },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
    ],
    "max-statements-per-line": [
      "error",
      {
        max: 1,
      },
    ],
    "max-params": ["error", 3],
    "max-depth": ["error", 3],
    "no-magic-numbers": [
      "warn",
      {
        enforceConst: true,
        ignore: [0],
      },
    ],
    "no-alert": "error",
    "max-classes-per-file": ["error", 1],
    curly: "error",
    "no-console": "warn",
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",
    "react/boolean-prop-naming": "error",
    "react/destructuring-assignment": "error",
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "react/hook-use-state": "error",
    "react/iframe-missing-sandbox": "error",
    "react/jsx-boolean-value": "error",
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-handler-names": "error",
    "react/jsx-no-constructed-context-values": "error",
    "react/jsx-no-script-url": "error",
    "react/jsx-no-target-blank": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/no-danger": "error",
    "react/no-multi-comp": "error",
    "react/no-typos": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
  },
};
