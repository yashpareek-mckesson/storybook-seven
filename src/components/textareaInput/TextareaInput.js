import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import styles from "./assets/styles/TextareaInput.module.scss";
import { ReactComponent as RequiredLogo } from "./assets/svg/required.svg";
import { ReactComponent as InfoIcon } from "./assets/svg/info.svg";
import { Tooltip } from "../../";
import { CommonUtils } from "../../common/utils";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "../../assets/theme/MuiTheme";

export const TextareaInput = (props) => {
  const [contentLength, setContentLength] = useState(0);
  const {
    id,
    displayType,
    label,
    isRequired,
    isDisabled,
    isReadOnly,
    onChangeFn,
    onBlurFn,
    tooltipText,
    placeholder,
    maxCharWarningLimit,
    maxCharLimit,
    maxCharHelperText,
    maxLimitReachedHelpertext,
    value,
    isSingleFormField,
    isRequiredText,
    minRows,
  } = props;

  useEffect(() => {
    let element = document.getElementById("textarea-" + id);
    if (element) {
      element.style.minHeight = getElementMinHeight() + "px";
    }
  }, []);

  const getElementMinHeight = () => {
    let linesHeight = 18 * minRows;
    return linesHeight + 14;
  };

  useEffect(() => {
    setContentLength(props?.value ? props.value.length : 0);
  }, [value]);

  const onKeyUpElement = () => {
    let element = document.getElementById("textarea-" + id);
    if (element) {
      let elemScrollHeight = element.scrollHeight;
      let minElemHeight = getElementMinHeight();
      element.style.height = "1px";
      element.style.height = elemScrollHeight + "px";
      element.style.minHeight = minElemHeight + "px";
    }
  };

  const renderHelperText = () => {
    return (
      <p
        className={` ${styles.errorWrapper}`}
        data-testid={"helpettext-testid-" + id}
        id={"textarea-helpettext" + id}
      >
        <span>
          <span
            data-testid={"charlimithelper-testid-" + id}
            className={` ${styles.errorText1} ${
              contentLength >= maxCharLimit && styles.error
            } `}
          >
            {contentLength < maxCharLimit
              ? maxCharHelperText
              : maxLimitReachedHelpertext}
          </span>
          <span
            data-testid={"charcount-testid-" + id}
            className={` ${styles.errorText2} ${
              contentLength > maxCharWarningLimit && styles.error
            } `}
          >
            {contentLength > 0 && ` (${contentLength}/${maxCharLimit})`}
          </span>
        </span>
      </p>
    );
  };

  const renderLabel = () => {
    if (!CommonUtils.isNonEmptyString(label)) {
      return (
        <label
          htmlFor={"textarea-" + id}
          data-testid={"label-testid-" + id}
          className={`sr-only`}
        >
          {""}
        </label>
      );
    }
    let labelUi;
    if (isRequired) {
      if (isSingleFormField) {
        labelUi = (
          <span className={`${styles.singleField}`}>
            <span>
              {label}{" "}
              {tooltipText && (
                <Tooltip
                  body={tooltipText}
                  key={"textarea-tooltip-" + id}
                  placement="top"
                >
                  <button
                    type="button"
                    aria-label="information"
                    className="ml-4"
                  >
                    <InfoIcon />
                  </button>
                </Tooltip>
              )}
            </span>
            <span>
              <RequiredLogo className={styles.requiredIcon} />{" "}
              <span className={styles.requiredText}>{isRequiredText}</span>
            </span>
          </span>
        );
      } else {
        labelUi = (
          <span>
            {label}{" "}
            {isRequired && <RequiredLogo className={styles.requiredIcon} />}
            {tooltipText && (
              <Tooltip
                body={tooltipText}
                key={"textarea-tooltip-" + id}
                placement="top"
              >
                <button type="button" aria-label="information" className="ml-4">
                  <InfoIcon />
                </button>
              </Tooltip>
            )}
          </span>
        );
      }
    } else {
      labelUi = (
        <span>
          {label}
          {tooltipText && (
            <Tooltip
              body={tooltipText}
              key={"textarea-tooltip-" + id}
              placement="top"
            >
              <button type="button" aria-label="information" className="ml-4">
                <InfoIcon />
              </button>
            </Tooltip>
          )}
        </span>
      );
    }
    return (
      <label
        htmlFor={"textarea-" + id}
        data-testid={"label-testid-" + id}
        className={`${styles.label}`}
      >
        {labelUi}
      </label>
    );
  };

  return (
    <div className={styles.textareaWrapper}>
      {renderLabel()}
      <div className={`${styles.textareaFieldContainer}`}>
        <ThemeProvider theme={muiTheme}>
          <TextareaAutosize
            id={"textarea-" + id}
            aria-required={isRequired}
            aria-describedby={"textarea-helpettext" + id}
            data-testid={"textarea-testid-" + id}
            className={`${styles.textareaField} ${styles[displayType]}`}
            disabled={isDisabled}
            readOnly={isReadOnly}
            value={value}
            onChange={onChangeFn ? (e) => onChangeFn(e.target.value) : null}
            onBlur={onBlurFn ? onBlurFn : null}
            placeholder={placeholder ? placeholder : ""}
            maxLength={maxCharLimit}
            minRows={minRows ? minRows : 3}
            onKeyUp={onKeyUpElement}
          />
        </ThemeProvider>
      </div>
      {renderHelperText()}
    </div>
  );
};

TextareaInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  displayType: PropTypes.oneOf(["outline", "underline"]),
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isSingleFormField: PropTypes.bool,
  onChangeFn: PropTypes.func,
  onBlurFn: PropTypes.func,
  placeholder: PropTypes.string,
  tooltipText: PropTypes.string,
  maxCharLimit: PropTypes.number,
  maxCharWarningLimit: PropTypes.number,
  maxCharHelperText: PropTypes.string,
  maxLimitReachedHelpertext: PropTypes.string,
  isRequiredText: PropTypes.string,
  minRows: PropTypes.number,
};
TextareaInput.defaultProps = {
  displayType: "outline",
  placeholder: "",
  label: "",
  tooltipText: "",
  isRequired: false,
};
