module.exports = {
  '*.{js,ts}': ['prettier --write', 'eslint --fix', 'git add'],
  '*.{html,json,md,yml,yaml}': ['prettier --write', 'git add'],
};
