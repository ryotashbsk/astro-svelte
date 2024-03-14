module.exports = {
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-recess-order',
    'stylelint-config-html',
    'stylelint-prettier',
    'stylelint-scss'
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'selector-pseudo-class-no-unknown': null,
    'selector-class-pattern': null,
    'media-query-no-invalid': null,
    'no-descending-specificity': null,
    'import-notation': null
  }
};
