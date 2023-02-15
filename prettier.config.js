module.exports = {
  tabWidth: 2,
  trailingComma: "es5",
  semi: true,
  singleQuote: false,
  importOrder: ["^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    require("@trivago/prettier-plugin-sort-imports"),
    require("prettier-plugin-tailwindcss"),
  ],
};