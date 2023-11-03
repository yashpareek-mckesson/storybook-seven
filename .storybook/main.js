module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/preset-scss",
      options: {
        cssLoaderOptions: {
          modules: true,
        },
        sassLoaderOptions: {
          additionalData: (content) => {
            // paths are relative to root dir in this case
            return (
              `
            @import "src/assets/scss/main.scss";
          ` + content
            ); // content is the individual module.scss file
          },
        },
      },
    },
  ],
  core: {
    builder: "webpack5",
  },
};
