/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */

const config = {
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  rules: {
    "import/prefer-default-export": "off",
    "react/function-component-definition": "off",
    "react/jsx-filename-extension": "off",
    "react/require-default-props": "off",
    "import/extensions": "off",
    "react/jsx-props-no-spreading": "off",
    "@typescript-eslint/no-var-requires": "off",
    "react/no-array-index-key": "off",
  },
};

module.exports = config;
