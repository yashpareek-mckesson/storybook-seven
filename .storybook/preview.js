import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import muiTheme from "../src/assets/theme/MuiTheme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { sort: "requiredFirst" },
};

const withMui = (StoryFn) => {
  return (
    <ThemeProvider theme={muiTheme}>
      <StoryFn />
    </ThemeProvider>
  );
};

export const decorators = [withMui];
