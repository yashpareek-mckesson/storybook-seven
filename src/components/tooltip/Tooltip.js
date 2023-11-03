import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  ChakraProvider,
  Text,
  Tooltip as ChakraTooltip,
} from "@chakra-ui/react";
import { theme } from "@mckesson-ontada/ontada-component-library";
import styles from "./assets/styles/Tooltip.module.scss";

export const Tooltip = (props) => {
  const {
    body,
    children,
    defaultIsOpen,
    placement,
    size,
    title,
    variant,
    isDisabled,
    openDelay,
    alignText,
    maxW,
  } = props;

  const composeLabel = () => {
    return (
      <Box className={`${styles["tooltipTextAlign-" + alignText]}`}>
        {title && (
          <Box>
            <Box
              className={styles.titleContent}
              sx={{
                fontSize: "1.4rem",
                fontWeight: "400",
                letterSpacing: "0.03em",
                lineHeight: "1.8rem",
                color:
                  variant !== "error"
                    ? "var(--brand-color-text-dark-slate)"
                    : "themeColors.red2",
              }}
            >
              {title}
            </Box>
            <Box
              sx={{
                borderTopColor: "themeColors.warmGrey1",
                borderTop: "1px solid",
                marginBottom: "6px",
                marginTop: "6px",
              }}
            >
              {null}
            </Box>
          </Box>
        )}
        <Text className={styles.bodyContent}>{body}</Text>
      </Box>
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <ChakraTooltip
        className={styles.root}
        data-testid={`tooltip-${variant}`}
        defaultIsOpen={defaultIsOpen}
        hasArrow={true}
        isDisabled={isDisabled}
        openDelay={openDelay}
        label={composeLabel()}
        placement={placement}
        sx={{
          width: size === "standard" ? "280px" : "",
          maxW: maxW ? maxW : "",
        }}
        variant={variant}
      >
        {children}
      </ChakraTooltip>
    </ChakraProvider>
  );
};

Tooltip.propTypes = {
  children: PropTypes.any.isRequired,
  body: PropTypes.any,
  defaultIsOpen: PropTypes.bool,
  placement: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.string,
  isDisabled: PropTypes.bool,
  openDelay: PropTypes.number,
  maxW: PropTypes.string,
  alignText: PropTypes.string,
};

Tooltip.defaultProps = {
  defaultIsOpen: false,
  placement: "bottom",
  size: "standard",
  variant: "default",
  isDisabled: false,
  alignText: "center",
};
