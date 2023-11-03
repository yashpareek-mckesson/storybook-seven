import React from "react";
import PropTypes from "prop-types";
import styles from "./assets/CheckboxGroup.module.scss";

export const CheckboxGroup = (props) => {
  let { id, items, direction, caption, showFlexWrap } = props;

  return (
    <fieldset
      data-testid="checkbox-container"
      className={`${styles["direction-" + direction]} ${
        showFlexWrap && styles.flexWrapStyle
      }`}
    >
      <legend className={styles.captionWrap}>{caption}</legend>
      {items &&
        items.map((item, index) => {
          return (
            <div
              key={id + "-wrapitem-" + index}
              data-testid={id + "-wrapitem-" + index}
              className={`${styles.checkboxWrapper}`}
            >
              <input
                className={
                  item.isChecked && item.isDisabled ? styles.checkedDisable : ""
                }
                type="checkbox"
                id={id + "-labelitem-" + index}
                name={id + "-labelitem-" + index}
                disabled={!item.isChecked && item.isDisabled}
                checked={item.isChecked}
                onChange={item.onChange}
              />
              <label
                htmlFor={id + "-labelitem-" + index}
                className={`${styles.checkbox} ${
                  item.isChecked && item.isDisabled ? styles.pointerEvent : ""
                }`}
              >
                {item.label}
              </label>
            </div>
          );
        })}
    </fieldset>
  );
};

CheckboxGroup.propTypes = {
  id: PropTypes.string.isRequired, // html id for radio group
  items: PropTypes.array.isRequired, //<{isDisabled:boolean,value:string,label:String}>[]
  direction: PropTypes.string, // "row","column"
  caption: PropTypes.string, //heading
  showFlexWrap: PropTypes.bool, // flexwrap design
};

CheckboxGroup.defaultProps = {
  direction: "column",
};
