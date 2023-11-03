import React from "react";
import PropTypes from "prop-types";
import styles from "./assets/styles/Switch.module.scss";
import { styled } from "@mui/system";
import clsx from "clsx";
import { useSwitch } from "@mui/base";

const BasicSwitchRoot = styled("span")(
  ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
  background: #BAC5CC;
  border-radius: 1.6rem;
  cursor: pointer;
  &.Switch-focusVisible {
    outline: 2px solid #007CC1;
    outline-offset:2px;
  }
  &.Switch-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Switch-checked {
    background: #007CC1;
  }
  `
);

const BasicSwitchInput = styled("input")`
  cursor: inherit;
  position: absolute;
  width: 100% !important;
  height: 100% !important;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  clip: inherit !important;
`;

const BasicSwitchThumb = styled("span")`
  display: block;
  width: 22px;
  height: 22px;
  top: 3px;
  left: 3px;
  border-radius: 1.6rem;
  background-color: #fff;
  position: relative;
  transition: all 200ms ease;

  &.Switch-checked {
    left: 22px;
    top: 3px;
    background-color: #fff;
  }
`;

function BasicSwitch(props) {
  BasicSwitch.propTypes = {
    checked: PropTypes.bool,
  };
  const { getInputProps, focusVisible, disabled } = useSwitch(props);
  const { checked, ...rest } = props;
  const stateClasses = {
    "Switch-checked": checked,
    "Switch-disabled": disabled,
    "Switch-focusVisible": focusVisible,
  };

  return (
    <BasicSwitchRoot className={clsx(stateClasses)}>
      <BasicSwitchThumb className={clsx(stateClasses)} />
      <BasicSwitchInput {...rest} {...getInputProps()} />
    </BasicSwitchRoot>
  );
}
export const Switch = ({
  handleToggle,
  id,
  value,
  label,
  labelPosition = "left",
  size = "lg",
  ...rest
}) => {
  Switch.propTypes = {
    handleToggle: PropTypes.func,
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.bool,
    labelPosition: PropTypes.string,
  };
  const composeFormLabel = (labelPosition, isDisabled) => {
    return (
      <label
        data-testid={id}
        htmlFor={id}
        className={styles.bodySemiBoldMedium + ` d-none d-md-block`}
      >
        {label}
      </label>
    );
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.checked = !event.target.checked;
      handleToggle(event);
    }
  };

  return (
    <>
      <div className={styles.switchbox}>
        {label &&
          labelPosition === "left" &&
          composeFormLabel(labelPosition, rest.isDisabled)}
        <BasicSwitch
          checked={value}
          role="switch"
          onChange={handleToggle}
          {...rest}
          aria-checked={value}
          type="checkbox"
          id={id}
          data-check-switch=""
          onKeyPress={handleKeyDown}
        />
        {label &&
          labelPosition === "right" &&
          composeFormLabel(labelPosition, rest.isDisabled)}
      </div>
    </>
  );
};

Switch.propTypes = {
  size: PropTypes.string,
  checked: PropTypes.bool,
};
