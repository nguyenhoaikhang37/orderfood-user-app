module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-3deg)',
          },
          '50%': {
            transform: 'rotate(3deg)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
