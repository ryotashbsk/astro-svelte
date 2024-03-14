module.exports = {
  printWidth: 120,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'none',
  plugins: [require.resolve('prettier-plugin-astro'), require.resolve('prettier-plugin-svelte')]
};
