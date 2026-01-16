module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  },
  theme: {
    extend: {
      colors: {
        primary: '#F8F05F',
        secondary: '#D31F25',
        accent: '#FFCD01',
      },
      animation: {
        'fade-black-gray': 'fadeBlackGray 1.5s infinite',
      },
      keyframes: {
        fadeBlackGray: {
          '0%, 100%': { color: '#000000' },
          '50%': { color: '#808080' },
        },
      },
      fontFamily: {
        'sans': ['DINRoundOT', 'sans-serif'],
      },
    },
  },
};