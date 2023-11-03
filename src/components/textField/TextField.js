import React from "react";

import { ChakraProvider, Input } from "@chakra-ui/react";
import { theme } from "@mckesson-ontada/ontada-component-library";
import PropTypes from "prop-types";

export const TextField = (props) => {
  return (
    <ChakraProvider theme={theme}>
      <Input
        type={props.type}
        placeholder={props.placeholder}
        variant={props.variant}
        label={props.label}
        onChange={props.onChange}
        data-testid="input"
      />
    </ChakraProvider>
  );
};

TextField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.oneOf(["flushed", "outlined"]),
  type: PropTypes.oneOf(["text", "password"]),
  onChange: PropTypes.func.isRequired,
};

TextField.defaultProps = {
  type: "text",
  placeholder: "",
  label: "",
};
