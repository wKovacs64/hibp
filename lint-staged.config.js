module.exports = {
  '*.{js,ts}': ['prettier --write', 'eslint --fix'],
  '*.{html,json,md,yml,yaml}': ['prettier --write'],
};
