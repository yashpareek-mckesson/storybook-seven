import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Button as ODSButton,
  theme,
} from "@mckesson-ontada/ontada-component-library";
import PropTypes from "prop-types";
import {
  textStyles,
  buttonOverriddenStyles,
  TEXT_TRANSFORM_STYLES,
} from "./assets/constants/buttonStylesConstants";
import { paddingStyles } from "./assets/constants/paddingStylesConstants";
import { CommonUtils } from "../../";

export const Button = (props) => {
  const {
    size,
    isODSButton,
    isModalButton,
    buttonWidth,
    textTransform,
    variant,
  } = props;
  const {
    isODSButton: isODSButtonDup,
    isModalButton: isModalButtonDup,
    buttonWidth: buttonWidthDup,
    ...rest
  } = props;

  const computePaddingStyle = () => {
    let paddingStyle = {};

    if (CommonUtils.isNonEmptyString(buttonWidth)) {
      paddingStyle = {
        ...paddingStyle,
        width: buttonWidth,
      };
    }

    if (!isModalButton) {
      return paddingStyle;
    }

    switch (size) {
      case "lg":
        paddingStyle = {
          ...paddingStyle,
          ...paddingStyles.paddingLarge,
        };
        break;
      case "md":
        paddingStyle = {
          ...paddingStyle,
          ...paddingStyles.paddingMedium,
        };
        break;
      case "sm":
        paddingStyle = {
          ...paddingStyle,
          ...paddingStyles.paddingSmall,
        };
        break;
      case "xs":
        paddingStyle = {
          ...paddingStyle,
          ...paddingStyles.paddingExtraSmall,
        };
        break;
      default:
        paddingStyle = {
          ...paddingStyle,
        };
        break;
    }

    return paddingStyle;
  };

  const computeTextStyle = () => {
    let textStyle = {};

    if (isODSButton) {
      return textStyle;
    }

    switch (size) {
      case "lg":
        textStyle = textStyles.allCapsBoldLarge;
        break;
      case "md":
        textStyle = textStyles.allCapsBoldMedium;
        break;
      case "sm":
        textStyle = textStyles.allCapsBoldSmall;
        break;
      case "xs":
        textStyle = textStyles.allCapsBoldExtraSmall;
        break;
      default:
        textStyle = textStyles.allCapsBoldMedium;
        break;
    }
    if (
      textTransform === TEXT_TRANSFORM_STYLES.uppercase ||
      textTransform === TEXT_TRANSFORM_STYLES.lowercase ||
      textTransform === TEXT_TRANSFORM_STYLES.capitalize ||
      textTransform === TEXT_TRANSFORM_STYLES.none
    ) {
      textStyle = {
        ...textStyle,
        textTransform,
      };
    }

    if (variant === "text") {
      textStyle = {
        ...textStyle,
        backgroundColor: "transparent",
        letterSpacing: "-0.016px",
      };
    }
    return textStyle;
  };

  return (
    <ChakraProvider theme={theme}>
      <ODSButton
        {...rest}
        {...buttonOverriddenStyles}
        style={computeTextStyle()}
        {...computePaddingStyle()}
      />
    </ChakraProvider>
  );
};

Button.propTypes = {
  size: PropTypes.string,
  isODSButton: PropTypes.bool,
  isModalButton: PropTypes.bool,
  buttonWidth: PropTypes.string,
  textTransform: PropTypes.string,
};

Button.defaultProps = {
  size: "md",
  isODSButton: false,
  isModalButton: false,
  buttonWidth: null,
  textTransform: "uppercase",
};
