module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
