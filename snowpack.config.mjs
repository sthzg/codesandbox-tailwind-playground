/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  root: 'src',
  devOptions: {
    tailwindConfig: './tailwind.config.js',
  },
  plugins: [
    '@snowpack/plugin-postcss',
  ],
};