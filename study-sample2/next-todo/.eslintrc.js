const { off } = require("process");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  globals: {
    Atomic: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
    "@typescript-eslint/quotes": ["error", "double"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "react/no-array-index": "off",
    "comma-dangle": "off",
    "arrow-body-style": "off",
    "react/no-unescaped-entities": "off",
    "react/props-type": "off",
    "object-curly-newline": "off",
    "react/jsx-one-express-per-line": "off",
    "implicit-arrow-linebreak": "off",
    "no-shadow": "off",
    "spaced-comment": "off",
    "operator-linebreak": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "global-require": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "import/prefer-default-export": "off",
    "no-params-reassign": "off",
    "react/jsx-curly-newline": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
        jsx: "never",
        tsx: "never",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
    },
  },
};
