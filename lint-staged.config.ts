// lint-staged.config.js
module.exports = {
  "*.{js,ts,jsx,tsx}": ["eslint --fix", "prettier --write"],
};
