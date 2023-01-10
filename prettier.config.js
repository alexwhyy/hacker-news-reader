module.exports = {
  tabWidth: 2,
  trailingComma: 'es5',
  semi: true,
  singleQuote: false,
  "importOrder": ["^[./]"],
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
}