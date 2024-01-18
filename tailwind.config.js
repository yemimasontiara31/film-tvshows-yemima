// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      fontSize: {
          "2xl": ["1.5rem", { lineHeight: "2rem" }],
          "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
          "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      },
      fontWeight: {
          "2xlBold": 900,
      },
      colors: {
          gray1: "#333333",
          gray2: "#4F4F4F",
          gray3: "#C4C4C4",
          gray4: "#BDBDBD",
          gray5: "#E0E0E0",
          gray6: "#F2F2F2",
          graychat: "#F8F8F8",
          menublue: "#2F80ED",
          blue1: "#2F80ED",
          lightblue: "#E9F3FF",
          yellow: "#E5A443",
          lightyellow: "#FCEED3",
          green: "#43B78D",
          lightgreen: "#D2F2EA",
          inboxactive: "#8785FF",
          taskactive: "#F8B76B",
          red: "#EB5757",
          purple: "#9B51E0",
          lightpurple: "#EEDCFF",
      },

      fontFamily: {
        custom: ['Lato', 'ui-sans-serif'],
      },
  },
  },
  plugins: [
    function ({ addBase }) {
        addBase({
          h1: { fontSize: '100px' },
          h2: { fontSize: '24px' },
          h3: { fontSize: '20px' },
          h4: { fontSize: '14px' },
          h5: { fontSize: '12px' },              
        });
    },
]
};