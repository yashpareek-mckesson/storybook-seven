module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    [
      "inline-react-svg",
      {
        svgo: {
          plugins: [
            {
              name: "removeAttrs",
              params: { attrs: "(data-name)" },
            },
            "cleanupIDs",
          ],
        },
      },
    ],
  ],
};
