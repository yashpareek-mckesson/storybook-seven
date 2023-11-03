import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styles from "./assets/styles/Dropdown.module.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IoEllipse } from "react-icons/io5";
import { ReactComponent as DropdownArrow } from "./assets/svg/DropdownArrowDown.svg";
import { ReactComponent as DropdownArrowAdmin } from "./assets/svg/DropdownArrowAdmin.svg";
import { ReactComponent as DropdownArrowDisabled } from "./assets/svg/DropdownArrowDownDisabled.svg";

export const Dropdown = (props) => {
  const {
    id,
    value,
    label,
    onChange,
    options,
    isRequired,
    placeholder,
    showRequiredLabel,
    size,
    errorMessage,
    error,
    isDisabled,
    defaultValue,
    isShowLabel,
    menuWidthStyle,
    isReadOnly,
    isAdminDropdown,
  } = props;

  const inputComponent = useRef(null);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition(
      inputComponent.current
        ? inputComponent.current.getBoundingClientRect().left
        : 0
    );
  }, [inputComponent, window.width]);

  const handleResize = () => {
    setPosition(
      inputComponent.current
        ? inputComponent.current.getBoundingClientRect().left
        : 0
    );
    return () => window.removeEventListener("resize", handleResize);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const handleOpen = () => {
    setPosition(
      inputComponent.current
        ? inputComponent.current.getBoundingClientRect().left
        : 0
    );
  };

  const getSizeStyle = () => {
    let style = {};

    switch (size) {
      case "xs":
        style = {
          padding: "11px 26px 11px 10px",
          fontSize: "var(--brand-font-size--small)",
          lineHeight: "var(--brand-font-size--extra-small)",
          letterSpacing: "0.001em",
        };
        break;
      case "sm":
        style = {
          padding: "5px 26px 5px 8px",
          fontSize: "var(--brand-font-size--extra-small)",
          lineHeight: "var(--brand-line-height--medium)",
          letterSpacing: "0.001em",
        };
        break;
      case "md":
        style = {
          padding: "7px 28px 7px 10px",
          fontSize: "var(--brand-font-size--small)",
          lineHeight: "var(--brand-line-height--large)",
        };
        break;
      case "lg":
        style = {
          padding: "9px 30px 9px 12px",
          fontSize: "var(--brand-font-size--default)",
          lineHeight: "var(--brand-line-height--m-large)",
          letterSpacing: "-0.001em",
        };
    }
    return {
      ...style,
      color: error
        ? "var(--brand-color-warning-orange-4)"
        : isAdminDropdown
        ? "var(--brand-color-text-black)"
        : "var(--brand-color-text-light-slate)",
    };
  };

  const getMenuItemSizeStyle = () => {
    let style = {};

    switch (size) {
      case "xs":
        style = {
          fontWeight: "var(--brand-font-weight-400)",
          fontSize: "var(--brand-font-size--extra-small)",
          lineHeight: "var(--brand-line-height--medium)",
          letterSpacing: " 0.001em",
        };
        break;
      case "sm":
        style = {
          fontWeight: "var(--brand-font-weight-400)",
          fontSize: "var(--brand-font-size--extra-small)",
          lineHeight: "var(--brand-line-height--medium)",
          letterSpacing: " 0.001em",
        };
        break;
      case "md":
        style = {
          fontWeight: "var(--brand-font-weight-400)",
          fontSize: "var(--brand-font-size--small)",
          lineHeight: "var(--brand-line-height--large)",
        };
        break;
      case "lg":
        style = {
          fontWeight: "var(--brand-font-weight-400)",
          fontSize: "var(--brand-font-size--small)",
          lineHeight: "var(--brand-line-height--large)",
        };
    }
    return {
      ...style,
    };
  };

  const dropdownTheme = createTheme({
    components: {
      MuiSelect: {
        styleOverrides: {
          root: {
            width: "100%",
            "& .MuiSelect-select": {
              fontFamily: "Nunito",
              fontStyle: "normal",
              fontWeight: isAdminDropdown
                ? "var(--brand-font-weight-600)"
                : "var(--brand-font-weight-400)",
              ...getSizeStyle(),
              minHeight: "inherit !important",
            },
            "&.Mui-focused .MuiSelect-select": {
              fontWeight: "var(--brand-font-weight-600)",
              color: "var(--brand-color-text-black)",
              borderRadius: "4px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid",
              borderRadius: "4px !important",
              borderColor: error
                ? "var(--brand-color-warning-orange-4)"
                : "var(--brand-color-text-light-slate)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--brand-color-text-dark-slate)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "2px solid var(--brand-color-secondary-active-yellow-1)",
              outline: "none",
            },
            "& .MuiSelect-icon": {
              transform: "none",
            },
            "& :focus-visible": {
              outline: "none !important",
            },
            "&.Mui-focused": {
              outline: "none",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            border: "1px solid var(--brand-color-text-dark-slate)",
            borderRadius: "4px",
            boxShadow: "none",
            marginTop: "4px",
            padding: "0px",
            width: "min-content",
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: "0px",
            maxHeight: "146px",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: "9px 16px",
            borderBottom: "1px solid var(--brand-color-text-cool-grey)",
            color: "var(--brand-color-text-dark-slate)",
            whiteSpace: "unset",
            wordBreak: "break-all",
            fontFamily: "Nunito",
            fontStyle: "normal",
            ...getMenuItemSizeStyle(),
            "&:last-child": {
              borderBottom: "none",
            },
            "& span.sub-label": {
              color: "var(--brand-color-text-light-slate) !important",
              fontWeight: "var(--brand-font-weight-400) !important",
            },
            "&.Mui-focusVisible": {
              outline: "none !important",
              background: "var(--brand-color-background-white)",
              color: "var(--brand-color-text-black)",
              fontWeight: "var(--brand-font-weight-600)",
            },
            "&.Mui-focusVisible.Mui-selected": {
              outline: "none !important",
              background: "var(--brand-color-secondary-active-yellow-3)",
              color: "var(--brand-color-text-black)",
              fontWeight: "var(--brand-font-weight-600)",
            },
            "&.Mui-selected": {
              outline: "none !important",
              background:
                "var(--brand-color-secondary-active-yellow-3) !important",
              color: "var(--brand-color-text-black)",
              fontWeight: "var(--brand-font-weight-600)",
            },
            "&.Mui-selected span.sub-label": {
              color: "var(--brand-color-text-black) !important",
              fontWeight: "var(--brand-font-weight-400) !important",
            },
            "&:hover": {
              outline: "none !important",
              background: "var(--brand-color-background-white)",
              color: "var(--brand-color-text-black)",
              fontWeight: "var(--brand-font-weight-600)",
            },
          },
        },
      },
    },
  });

  const prefilledDisableStyle = {
    ".Mui-disabled": {
      background: "#F2F6FA",
      "-webkit-text-fill-color": "#627386 !important",
      cursor: "not-allowed",
    },
    ".MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled":
      { border: "1px solid" },
  };
  const disableStyle = {
    ".Mui-disabled": { background: "#F2F6FA" },
  };

  const renderMenuItems = () => {
    return options.map((option, index) => {
      const { label, value, endLabel } = option;

      if (endLabel) {
        return (
          <MenuItem key={id + "-opt-" + index} value={value}>
            <span className={styles.endLabelContainer}>
              <span className={styles.endLabel}>{label}</span>
              <span className={styles.endLabelSuffix}>{endLabel}</span>
            </span>
          </MenuItem>
        );
      }

      return (
        <MenuItem key={id + "-opt-" + index} value={value}>
          <span>
            {label}{" "}
            {option.subLabel && (
              <span className={"sub-label"}>{option.subLabel}</span>
            )}
          </span>
        </MenuItem>
      );
    });
  };

  return (
    <div data-testid={"dropdown-container-" + id}>
      {isShowLabel && (
        <label
          id={"dropdown-label-" + id}
          htmlFor={"dropdown-" + id}
          data-testid={"dropdown-label-testid-" + id}
          className={`${styles.label} ${styles["size-" + size]} ${
            showRequiredLabel ? styles.showRequiredLabel : ""
          }`}
        >
          {label}
          <span>
            {isRequired && label && (
              <IoEllipse className={styles.requiredIcon} />
            )}{" "}
            {showRequiredLabel && "Required"}
          </span>
        </label>
      )}
      <ThemeProvider theme={dropdownTheme}>
        <Select
          ref={inputComponent}
          className={`${!value ? "" : styles.hasValue} ${
            !error ? "" : styles.hasError
          }`}
          MenuProps={{
            PaperProps: {
              "data-testid": "dropdown-paper-" + id,
              sx: {
                left: `${position}px !important`,
                maxWidth: menuWidthStyle,
              },
            },
          }}
          sx={isReadOnly ? prefilledDisableStyle : disableStyle}
          id={"dropdown-" + id}
          data-testid={"dropdown-select-" + id}
          value={value}
          IconComponent={
            isReadOnly
              ? DropdownArrowDisabled
              : isAdminDropdown
              ? DropdownArrowAdmin
              : DropdownArrow
          }
          displayEmpty
          defaultValue={defaultValue}
          disabled={isDisabled || isReadOnly}
          readOnly={isReadOnly}
          renderValue={(value) => {
            if (!value) return placeholder;

            let selectedOpt = options?.find((opt) => opt.value === value);

            return selectedOpt ? (
              <span>
                {selectedOpt.label ? selectedOpt.label : ""}{" "}
                {selectedOpt.subLabel && (
                  <span className={"sub-label"}>{selectedOpt.subLabel}</span>
                )}
              </span>
            ) : (
              ""
            );
          }}
          onChange={(e) => onChange(e.target.value)}
          onOpen={(e) => handleOpen()}
        >
          {renderMenuItems()}
        </Select>
        {errorMessage && (
          <p
            data-testid={"error-testid-" + id}
            id={"error" + id}
            className={`${styles.errortext} ${styles["errortext-" + size]}`}
          >
            {errorMessage}
            <span className="sr-only">{errorMessage}</span>
          </p>
        )}
      </ThemeProvider>
    </div>
  );
};

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  helperMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool, // Handles whether or not to show a red required indicator next to the dropdown label.
  showRequiredLabel: PropTypes.bool, // will show the required text and will be placed to right end of the label.
  label: PropTypes.string.isRequired, // Label to show next to the dropdown.
  placeholder: PropTypes.string, //Options are: top, left
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  size: PropTypes.oneOf(["lg", "md", "sm", "xs"]).isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  isShowLabel: PropTypes.bool,
  menuWidthStyle: PropTypes.string,
  isReadOnly: PropTypes.bool,
  /**
     * Default value for the dropdown 
     * value= {
            label: 'Option 1',
            value: 'option-1'
          }
     */
};

Dropdown.defaultProps = {
  isRequired: false,
  placeholder: "Select",
  showRequiredLabel: false,
  size: "sm",
  isShowLabel: true,
  menuWidthStyle: "inherit",
  isReadOnly: false,
  isAdminDropdown: false,
};
