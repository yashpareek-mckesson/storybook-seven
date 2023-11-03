import React from "react";
import PropTypes from "prop-types";
import styles from "./assets/RadioGroup.module.scss";
import { Dropdown } from "../dropdown/Dropdown";
import { CommonUtils } from "../../common/utils/CommonUtils";
export const RadioGroup = (props) => {
  let {
    id,
    items,
    onChangeValue,
    direction,
    caption,
    value,
    radioBtnWidth,
    showFlexWrap,
    otherTextValue,
    onOtherTextChange,
    onSubRadioFieldChange,
    dataSchema,
    masterListsMeta,
    isRequired,
  } = props;

  const onChangeRadio = (event, isOtherFieldChange) => {
    onChangeValue(event.target.value);
  };

  const getListOptions = (control) => {
    if (CommonUtils.isNonEmptyObject(masterListsMeta)) {
      return CommonUtils.isNonEmptyArray(masterListsMeta[control.dataSource])
        ? masterListsMeta[control.dataSource]
        : [];
    }
    return [];
  };

  return (
    <fieldset
      onChange={onChangeRadio}
      className={`${styles["direction-" + direction]} ${
        showFlexWrap && styles.flexWrapStyle
      }`}
      data-testid="radio-container"
    >
      <legend className={styles.captionWrap}>
        {caption}
        {isRequired && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
          >
            <circle cx="3" cy="3" r="3" fill="#DB3A29" />
          </svg>
        )}
      </legend>

      {items &&
        items.map((item, index) => {
          return (
            <div
              key={id + "-item-" + index}
              className={styles.radioGroupWrapper}
            >
              <div
                data-testid={id + "-item-" + index}
                className={`${styles.radioWrapper} ${
                  item.isDisabled && styles.disabledDiv
                }  ${styles["radioBtnWidth-" + radioBtnWidth]}`}
              >
                <input
                  type="radio"
                  id={id + "-item-" + index}
                  name={id + "-item"}
                  value={item.value}
                  disabled={item.isDisabled}
                  checked={item.value === value}
                  onChange={() => {}} // ignored as fieldset is handling the onChange, this is dummy event to suppress html error
                />
                <label htmlFor={id + "-item-" + index}>{item.label}</label>
              </div>
              {item.isOther &&
              value.trim().toLowerCase() === item.value.trim().toLowerCase() ? (
                <div className={styles.radioGroupCustomWrapper}>
                  <div className={styles.radioGroupCustomLabel}>
                    {item.otherLabel}
                  </div>
                  <input
                    id={id + "-item-input-" + index}
                    data-testid={id + "-item-input-" + index}
                    placeholder={item.otherPlaceholder}
                    type={item.otherType ? item.otherType : "text"}
                    size="md"
                    onInput={(e) => {
                      item.otherType === "number"
                        ? (e.target.value = e.target.value.slice(
                            0,
                            item.maxLength
                          ))
                        : {};
                    }}
                    maxLength={item.maxLength ? item.maxLength : "100"}
                    value={otherTextValue}
                    onChange={(e) => {
                      onOtherTextChange(e.target.value, true);
                      e.stopPropagation();
                    }}
                    className={styles.radioGroupOtherInput}
                  />
                </div>
              ) : null}
              {item.isSubRadioField &&
              value.trim().toLowerCase() === item.value.trim().toLowerCase() //dataschema value === uischema value
                ? item.subRadioFields.map((content, index) => {
                    return (
                      <div className={styles.dropdownSubField}>
                        <Dropdown
                          id={id + "-sub-radio-field-" + index}
                          name={content.fieldGroupId}
                          label={content.fieldLabel}
                          placeholder={content.placeholder}
                          isRequired={false}
                          options={
                            content.apiDriven
                              ? getListOptions(content)
                              : content.dataSource
                          }
                          value={
                            CommonUtils.isNonEmptyObject(content) &&
                            masterListsMeta[content.dataSource] &&
                            CommonUtils.isNonEmptyObject(dataSchema)
                              ? dataSchema[item.optionKey].value.text[
                                  content.fieldKey
                                ].value
                              : ""
                          }
                          onChange={(e) =>
                            onSubRadioFieldChange(
                              e,
                              content.fieldGroupId,
                              content.fieldKey
                            )
                          }
                          isDisabled={false}
                          size="xs"
                        />
                      </div>
                    );
                  })
                : null}
            </div>
          );
        })}
    </fieldset>
  );
};

RadioGroup.propTypes = {
  id: PropTypes.string.isRequired, // html id for radio group
  items: PropTypes.array.isRequired, //<{isDisabled:boolean,value:string,label:String}>[]
  value: PropTypes.string, // value is a string from given items
  onChangeValue: PropTypes.func, // for getting the selected item . it will accpt a callback function
  direction: PropTypes.string, // "row","column"
  caption: PropTypes.string, //heading
  showFlexWrap: PropTypes.bool,
  radioBtnWidth: PropTypes.string,
  otherTextValue: PropTypes.any,
  onOtherTextChange: PropTypes.func,
  onSubRadioFieldChange: PropTypes.func,
  masterListsMeta: PropTypes.any,
  dataSchema: PropTypes.any,
};

RadioGroup.defaultProps = {
  direction: "column",
  otherTextValue: "",
};
