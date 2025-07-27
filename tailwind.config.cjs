// tailwind.config.cjs
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css,html}'],
  theme: { extend: {} },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
