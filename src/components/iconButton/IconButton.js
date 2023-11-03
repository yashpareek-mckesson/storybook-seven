import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  IconButton as ODSButton,
  theme,
} from "@mckesson-ontada/ontada-component-library";

export const IconButton = (props) => {
  return (
    <ChakraProvider theme={theme}>
      <ODSButton {...props} />
    </ChakraProvider>
  );
};
