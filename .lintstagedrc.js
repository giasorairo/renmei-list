module.exports = {
  "*": "prettier --ignore-unknown --write",
  "**/*.scss": "stylelint --fix",
  "**/*.{js,jsx,ts,tsx}": "eslint --fix",
};
