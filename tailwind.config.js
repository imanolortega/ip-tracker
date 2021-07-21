module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        "nice-gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%);",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
