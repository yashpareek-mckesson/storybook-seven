import React from "react";
import PropTypes from "prop-types";
import styles from "./assets/styles/InputField.module.scss";
import { CommonUtils } from "../../";
import { IoEllipse } from "react-icons/io5";
import InfoIcon from "../../assets/svg/info.svg";
import { Tooltip } from "../../";
export const InputField = (props) => {
  const {
    id,
    type,
    displayType,
    name,
    label,
    isRequired,
    isDisabled,
    isReadOnly,
    errors,
    validationFn,
    onChangeFn,
    onBlurFn,
    register,
    tooltipText,
    placeholder,
    maxLength,
    size,
    accept,
    autoFocus,
  } = props;

  const computeSize = () => {
    let inputSize = styles[`${errors?.[name] ? "sizeLgError" : "sizeLg"}`];
    switch (size) {
      case "lg":
        inputSize = styles[`${errors?.[name] ? "sizeLgError" : "sizeLg"}`];
        styles.sizeLg;
        break;
      case "md":
        inputSize = styles[`${errors?.[name] ? "sizeMdError" : "sizeMd"}`];
        styles.sizeMd;
        break;
      case "sm":
        inputSize = styles[`${errors?.[name] ? "sizeSmError" : "sizeSm"}`];
        styles.sizeSm;
        break;
      default:
        break;
    }
    return inputSize;
  };

  const computeIconStyle = () => {
    if (!errors?.[name]) {
      return "";
    }
    let iconStyle = styles.iconLg;
    switch (size) {
      case "lg":
        iconStyle = styles.iconLg;
        break;
      case "md":
        iconStyle = styles.iconMd;
        break;
      case "sm":
        iconStyle = styles.iconSm;
        break;
      default:
        break;
    }
    return iconStyle;
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={"input-" + id}
          data-testid={"label-testid-" + id}
          className={`${styles.label}`}
        >
          {label}{" "}
          {isRequired && (
            <IoEllipse
              className={styles.requiredIcon}
              data-testid={"required-icon-" + id}
            />
          )}
          {tooltipText && (
            <Tooltip
              body={tooltipText}
              key={"input-tooltip-" + id}
              placement="top"
            >
              <button
                type="button"
                aria-label="information"
                className={styles.ml4}
              >
                <InfoIcon />
              </button>
            </Tooltip>
          )}
        </label>
      )}
      <div className={`${styles.inputFieldContainer}`}>
        <input
          id={"input-" + id}
          aria-required={isRequired}
          onInput={(e) => {
            type === "number"
              ? (e.target.value = e.target.value.slice(0, maxLength))
              : {};
          }}
          aria-describedby={errors?.[name] ? "error-" + id : null}
          aria-invalid={CommonUtils.isNonEmptyObject(errors?.[name])}
          data-testid={"input-testid-" + id}
          type={type}
          className={`${styles.inputField} ${computeSize()} ${
            styles[displayType]
          } ${errors?.[name] ? styles[displayType + "Error"] : ""}
          ${errors?.[name] ? styles.icon : ""} ${computeIconStyle()}
          `}
          disabled={isDisabled}
          readOnly={isReadOnly}
          {...register(name, {
            validate: (value) =>
              isDisabled || isReadOnly ? null : validationFn(value),
            onChange: () =>
              isDisabled || isReadOnly ? null : onChangeFn(name),
            onBlur: () => (isDisabled || isReadOnly ? null : onBlurFn()),
          })}
          placeholder={placeholder ? placeholder : label}
          maxLength={maxLength ? maxLength.toString() : ""}
          autoFocus={autoFocus}
          {...(type === "file" && { accept: accept })}
        />
      </div>
      {errors?.[name] && (
        <p
          data-testid={"error-testid-" + id}
          id={"error" + id}
          className={`${styles.errorText}`}
        >
          {errors?.[name]?.message}
          <span className="sr-only">{errors?.[name]?.message}</span>
        </p>
      )}
    </div>
  );
};

InputField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  displayType: PropTypes.oneOf(["outline", "underline"]),
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  errors: PropTypes.any,
  register: PropTypes.any,
  validationFn: PropTypes.func,
  onChangeFn: PropTypes.func,
  onBlurFn: PropTypes.func,
  placeholder: PropTypes.string,
  tooltipText: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
  accept: PropTypes.string,
  autoFocus: PropTypes.bool,
};
InputField.defaultProps = {
  type: "text",
  displayType: "outline",
  placeholder: "",
  label: "",
  tooltipText: "",
  isRequired: false,
  maxLength: "",
  size: "lg",
  autoFocus: false,
};
