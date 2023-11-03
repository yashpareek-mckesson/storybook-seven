import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { MaskedInput, createDefaultMaskGenerator } from "react-hook-mask";
import { Button } from "../button/Button";
import Dialog from "@mui/material/Dialog";
import { DateRange } from "react-date-range";
import { addYears, subDays } from "date-fns";
import * as locales from "react-date-range/dist/locale";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import "react-date-range/dist/styles.css"; // main css file
import "./assets/styles/DateRangePickerTheme.scss"; // theme css file
import styles from "./assets/styles/DateRangePicker.module.scss";
import { DateUtils } from "../../common/utils/DateUtil";
import { ReactComponent as CalendarIcon } from "./assets/svgs/calendarIcon.svg";
import { ReactComponent as CloseIcon } from "./assets/svgs/closeIcon.svg";
import { ReactComponent as ClearIcon } from "./assets/svgs/clearIcon.svg";
import { ReactComponent as RequiredLogo } from "./assets/svgs/required_dot.svg";
import { ReactComponent as RightIcon } from "./assets/svgs/rightIcon.svg";
import { ReactComponent as WarningIcon } from "./assets/svgs/warningIcon.svg";
import { dateTypes } from "./assets/const/datePickerConst";
import useWindowSize from "../../common/hook/UseWindowSize";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);

const maskGenerator = createDefaultMaskGenerator("99/99/9999");

export const DateRangePicker = (props) => {
  let windowSize = useWindowSize();
  let initialRange = [
    {
      startDate: subDays(new Date(), 1),
      endDate: subDays(new Date(), 1),
      key: "selection",
    },
  ];
  const {
    startDateLabel,
    endDateLabel,
    isStartDateSuccess,
    isEndDateSuccess,
    startDateHelperMessage,
    endDateHelperMessage,
    isStartDateError,
    isEndDateError,
    isDisabled,
    isReadonly,
    isRequired,
    isShowRequiredLabel,
    dateFormat,
    onChange,
    size,
    dateRange,
    id,
    isCustomInput,
    renderInput,
    isDateRangeCleared,
    requiredLabel,
    clearLabel,
    confirmLabel,
    extraClassName,
    lang,
    containerWidth,
  } = props;

  const [localDateRange, setLocalDateRange] = useState(initialRange);
  const [localStartDate, setLocalStartDate] = useState("");
  const [localEndDate, setLocalEndDate] = useState("");
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isIconClick, setIsIconClick] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(null);
  const [isSameDateSelected, setIsSameDateSelected] = useState(false);

  const isMobileView = windowSize.width <= 576;
  const isModalMobileView = windowSize.width <= 767;

  useEffect(() => {
    if (isDateRangeCleared) {
      setLocalDateRange(initialRange);
      setLocalStartDate("");
      setLocalEndDate("");
    }
  }, [isDateRangeCleared]);

  useEffect(() => {
    let isStartDateAvailable = dateRange[0] !== "";
    let isEndDateAvailable = dateRange[1] !== "";
    if (isStartDateAvailable) {
      if (DateUtils.isValidDate(dateRange[0], dateFormat)) {
        setLocalStartDate(dayjs(dateRange[0]).format(dateFormat));
      } else {
        setLocalStartDate(dateRange[0]);
      }
    }
    if (isEndDateAvailable) {
      if (DateUtils.isValidDate(dateRange[1], dateFormat)) {
        setLocalEndDate(dayjs(dateRange[1]).format(dateFormat));
      } else {
        setLocalEndDate(dateRange[1]);
      }
    }
  }, [dateRange]);

  const handleCalendarOpen = () => {
    let tempStartDate = "";
    let tempEndDate = "";
    if (localStartDate === "" && localEndDate === "") {
      // when start date and end dates are empty
      tempStartDate = initialRange[0].startDate;
      tempEndDate = initialRange[0].endDate;
    }
    if (localStartDate !== "" && localEndDate === "") {
      // when start date is not and end date is empty
      if (DateUtils.isValidDate(localStartDate, dateFormat)) {
        tempStartDate = new Date(localStartDate);
        tempEndDate = new Date(localStartDate);
      } else {
        tempStartDate = initialRange[0].startDate;
        tempEndDate = initialRange[0].endDate;
      }
    }
    if (localStartDate === "" && localEndDate !== "") {
      // when start date is empty and end date is not
      if (DateUtils.isValidDate(localEndDate, dateFormat)) {
        tempStartDate = new Date(localEndDate);
        tempEndDate = new Date(localEndDate);
      } else {
        tempStartDate = initialRange[0].startDate;
        tempEndDate = initialRange[0].endDate;
      }
    }
    if (localStartDate !== "" && localEndDate !== "") {
      // when start date and end date is not empty
      if (
        DateUtils.isValidDate(localStartDate, dateFormat) &&
        DateUtils.isValidDate(localEndDate, dateFormat)
      ) {
        // both dates are valid
        tempStartDate = new Date(localStartDate);
        tempEndDate = new Date(localEndDate);
      }
      if (
        DateUtils.isValidDate(localStartDate, dateFormat) &&
        !DateUtils.isValidDate(localEndDate, dateFormat)
      ) {
        // when start date is valid
        tempStartDate = new Date(localStartDate);
        tempEndDate = new Date(localStartDate);
      }
      if (
        !DateUtils.isValidDate(localStartDate, dateFormat) &&
        DateUtils.isValidDate(localEndDate, dateFormat)
      ) {
        // when end date is valid
        tempStartDate = new Date(localEndDate);
        tempEndDate = new Date(localEndDate);
      }
      if (
        !DateUtils.isValidDate(localStartDate, dateFormat) &&
        !DateUtils.isValidDate(localEndDate, dateFormat)
      ) {
        // both dates are invalid
        tempStartDate = localDateRange[0].startDate;
        tempEndDate = localDateRange[0].endDate;
      }
    }
    setLocalDateRange([
      {
        startDate: tempStartDate,
        endDate: tempEndDate,
        key: "selection",
      },
    ]);
    setIsCalendarOpen(true);
  };

  const handleCalendarClose = () => {
    if (isIconClick) {
      setIsIconClick(false);
      return;
    }
    setIsCalendarOpen(false);
  };

  const handleOnChange = (ranges) => {
    let { selection } = ranges;
    if (isMobileView) {
      if (fieldFocused === dateTypes.START_DATE) {
        selection = {
          ...selection,
          startDate: selection.startDate,
          endDate: dateRange[1] ? dateRange[1] : selection.startDate,
        };
      }
      if (fieldFocused === dateTypes.END_DATE) {
        selection = {
          ...selection,
          startDate: dateRange[0] ? dateRange[0] : selection.endDate,
          endDate: selection.endDate,
        };
      }
      setLocalDateRange([selection]);
    } else {
      if (fieldFocused === dateTypes.START_DATE) {
        selection = {
          ...selection,
          endDate: localDateRange[0].endDate,
        };
        onChange(getChangedRange(selection.startDate, dateRange[1]));
      }
      if (fieldFocused === dateTypes.END_DATE) {
        selection = {
          ...selection,
          startDate: localDateRange[0].startDate,
        };
        onChange(getChangedRange(dateRange[0], selection.endDate));
      }
      setLocalDateRange([selection]);
      handleCalendarClose();
    }
    setIsConfirmDisabled(false);
    if (fieldFocused === dateTypes.START_DATE && dateRange[1]) {
      setIsSameDateSelected(
        dayjs(selection.startDate).isSame(dayjs(dateRange[1]), "day")
      );
    }
    if (fieldFocused === dateTypes.END_DATE && dateRange[0]) {
      setIsSameDateSelected(
        dayjs(selection.endDate).isSame(dayjs(dateRange[0]), "day")
      );
    }
  };

  const onConfirm = () => {
    if (fieldFocused === dateTypes.START_DATE) {
      onChange(getChangedRange(localDateRange[0].startDate, dateRange[1]));
    }
    if (fieldFocused === dateTypes.END_DATE) {
      onChange(getChangedRange(dateRange[0], localDateRange[0].endDate));
    }
    setFieldFocused(null);
    handleCalendarClose();
  };

  const onClear = () => {
    setLocalDateRange(initialRange);
    setIsConfirmDisabled(true);
  };

  const getChangedRange = (startDate, endDate) => {
    let range = [];
    if (startDate) {
      range.push(startDate);
    } else {
      range.push("");
    }
    if (endDate) {
      range.push(endDate);
    } else {
      range.push("");
    }
    return range;
  };

  const handleManualChange = (type, value, isValidate) => {
    if (type === dateTypes.START_DATE) {
      setLocalStartDate(value);
      if (isValidate) {
        onChange(getChangedRange(value, localEndDate));
      }
    }
    if (type === dateTypes.END_DATE) {
      setLocalEndDate(value);
      if (isValidate) {
        onChange(getChangedRange(localStartDate, value));
      }
    }
  };

  const renderCalendar = () => {
    let contentUi = (
      <div
        data-testid={"date-range-calender-wrapper"}
        className={`${styles.dateRangeUiWrapper} ${
          extraClassName ? extraClassName : ""
        }`}
      >
        <DateRange
          dataTestId={"date-range-calender"}
          onChange={handleOnChange}
          moveRangeOnFirstSelection={false}
          months={2}
          weekdayDisplayFormat="EEEEE"
          showMonthAndYearPickers={true}
          ranges={localDateRange}
          showSelectionPreview={false}
          showDateDisplay={false}
          monthDisplayFormat="MMMM yyyy"
          showPreview={false}
          showMonthArrow={true}
          direction={isModalMobileView ? "vertical" : "horizontal"}
          scroll={{
            enabled: isModalMobileView,
          }}
          locale={locales[lang]}
          minDate={new Date()}
          maxDate={addYears(new Date(), 1)}
          editableDateInputs={true}
        />
      </div>
    );
    return contentUi;
  };

  const renderInputUI = (inputFor) => {
    if (inputFor === dateTypes.START_DATE) {
      return (
        <div className={styles.inputContainer}>
          <label
            htmlFor={"input-start-date-" + id}
            data-testid={"label-testid-start-date-" + id}
            className={`${styles.label} ${
              size === "md" || size === "lg" ? styles["label" + size] : ""
            } ${isShowRequiredLabel ? styles.withLabel : ""}`}
          >
            <span>{startDateLabel} </span>
            {isRequired && (
              <span
                data-testid="start-date-required-label"
                className={styles.withLabelContainer}
              >
                <RequiredLogo
                  data-testid="start-date-required-logo"
                  className={styles.requiredIcon}
                />{" "}
                {isShowRequiredLabel && requiredLabel}
              </span>
            )}
          </label>
          <div className={styles.inputWrapper}>
            <MaskedInput
              id={"input-start-date-" + id}
              aria-required={isRequired}
              aria-describedby={
                startDateHelperMessage
                  ? "helpertext-testid-start-date" + id
                  : null
              }
              aria-invalid={isStartDateError}
              data-testid={"input-testid-start-date-" + id}
              className={`${styles[`inputField`]} ${
                size === "md" || size === "lg"
                  ? styles[`inputField` + size]
                  : ""
              } ${isStartDateSuccess ? styles.inputSuccess : ""} ${
                isStartDateError ? styles.inputError : ""
              }`}
              value={localStartDate}
              autocomplete="off"
              disabled={isDisabled}
              readOnly={isCalendarOpen}
              placeholder={
                dateFormat ? (dateFormat + "").toLocaleLowerCase() : ""
              }
              onKeyDown={(e) => {
                handleManualChange(dateTypes.START_DATE, e.target.value, false);
              }}
              onBlur={(e) =>
                handleManualChange(dateTypes.START_DATE, e.target.value, true)
              }
              maskGenerator={maskGenerator}
            />
            <CalendarIcon
              data-testid="start-date-calender-icon"
              onClick={() => {
                if (isDisabled || isReadonly) {
                  return;
                }
                if (!isMobileView) {
                  setIsIconClick(true);
                }
                setFieldFocused(dateTypes.START_DATE);
                handleCalendarOpen();
              }}
              className={`${styles.calendarIcon} ${
                size === "md" || size === "lg"
                  ? styles["calendarIcon" + size]
                  : ""
              }`}
            />
          </div>

          {startDateHelperMessage && (
            <p
              data-testid={"helpertext-testid-start-date" + id}
              id={"helpertext-start-date-" + id}
              className={`${styles.helpertext} ${
                size === "md" || size === "lg"
                  ? styles["helpertext" + size]
                  : ""
              } ${isStartDateSuccess ? styles.helpertextSuccess : ""} ${
                isStartDateError ? styles.helpertextError : ""
              }`}
            >
              {isStartDateSuccess && (
                <RightIcon
                  data-testid={"start-date-success-icon"}
                  className={styles.rightIcon}
                />
              )}
              {isStartDateError && (
                <WarningIcon
                  data-testid={"start-date-error-icon"}
                  className={styles.warningIcon}
                />
              )}
              {startDateHelperMessage}
              {}
              <span className="sr-only">{startDateHelperMessage}</span>
            </p>
          )}
        </div>
      );
    }

    if (inputFor === dateTypes.END_DATE) {
      return (
        <div className={styles.inputContainer}>
          <label
            htmlFor={"input-end-date-" + id}
            data-testid={"label-testid-end-date-" + id}
            className={`${styles.label} ${
              size === "md" || size === "lg" ? styles["label" + size] : ""
            } ${isShowRequiredLabel ? styles.withLabel : ""}`}
          >
            <span>{endDateLabel} </span>
            {isRequired && (
              <span
                data-testid="end-date-required-label"
                className={styles.withLabelContainer}
              >
                <RequiredLogo
                  data-testid="end-date-required-logo"
                  className={styles.requiredIcon}
                />{" "}
                {isShowRequiredLabel && requiredLabel}
              </span>
            )}
          </label>
          <div className={styles.inputWrapper}>
            <MaskedInput
              id={"input-end-date-" + id}
              aria-required={isRequired}
              aria-describedby={
                endDateHelperMessage ? "helpertext-testid-end-date" + id : null
              }
              aria-invalid={isEndDateError}
              data-testid={"input-testid-end-date-" + id}
              className={`${styles[`inputField`]} ${
                size === "md" || size === "lg"
                  ? styles[`inputField` + size]
                  : ""
              } ${isEndDateSuccess ? styles.inputSuccess : ""} ${
                isEndDateError ? styles.inputError : ""
              }`}
              value={localEndDate}
              autocomplete="off"
              disabled={isDisabled}
              readOnly={isCalendarOpen}
              placeholder={
                dateFormat ? (dateFormat + "").toLocaleLowerCase() : ""
              }
              onKeyDown={(e) => {
                handleManualChange(dateTypes.END_DATE, e.target.value, false);
              }}
              onBlur={(e) =>
                handleManualChange(dateTypes.END_DATE, e.target.value, true)
              }
              maskGenerator={maskGenerator}
            />
            <CalendarIcon
              data-testid="end-date-calender-icon"
              onClick={() => {
                if (isDisabled || isReadonly) {
                  return;
                }
                if (!isMobileView) {
                  setIsIconClick(true);
                }
                setFieldFocused(dateTypes.END_DATE);
                handleCalendarOpen();
              }}
              className={`${styles.calendarIcon} ${
                size === "md" || size === "lg"
                  ? styles["calendarIcon" + size]
                  : ""
              }`}
            />
          </div>

          {endDateHelperMessage && (
            <p
              data-testid={"helpertext-testid-end-date" + id}
              id={"helpertext-end-date-" + id}
              className={`${styles.helpertext} ${
                size === "md" || size === "lg"
                  ? styles["helpertext" + size]
                  : ""
              } ${isEndDateSuccess ? styles.helpertextSuccess : ""} ${
                isEndDateError ? styles.helpertextError : ""
              }`}
            >
              {isEndDateSuccess && (
                <RightIcon
                  data-testid={"end-date-success-icon"}
                  className={styles.rightIcon}
                />
              )}
              {isEndDateError && (
                <WarningIcon
                  data-testid={"end-date-error-icon"}
                  className={styles.warningIcon}
                />
              )}
              {endDateHelperMessage}
              <span className="sr-only">{endDateHelperMessage}</span>
            </p>
          )}
        </div>
      );
    }
  };

  let content = (
    <div className={styles.dateRangePickerWrapper}>
      {isCustomInput ? (
        renderInput({
          ...props,
        })
      ) : (
        <div
          className={styles.datePickerContainer}
          style={{ width: containerWidth }}
        >
          {renderInputUI(dateTypes.START_DATE)}
          {renderInputUI(dateTypes.END_DATE)}
        </div>
      )}

      {isCalendarOpen && renderCalendar()}
    </div>
  );

  return (
    <>
      <div data-testid="date-range-component">
        {isMobileView ? (
          content
        ) : (
          <ClickAwayListener onClickAway={() => handleCalendarClose()}>
            {content}
          </ClickAwayListener>
        )}
        {isModalMobileView && (
          <Dialog
            fullScreen
            open={isCalendarOpen}
            onClose={handleCalendarClose}
          >
            <div className={styles.dateRangeContainer}>
              <div className={styles.dateRangeHeader}>
                <CloseIcon
                  className={styles.dateRangeCloseIcon}
                  onClick={() => {
                    handleCalendarClose();
                  }}
                />
                <div className={styles.dateRangeClearContainer}>
                  <Button
                    leftIcon={<ClearIcon data-testid={"modal-clear-icon"} />}
                    variant="text"
                    className={styles.dateRangeBtnClear}
                    size={"md"}
                    onClick={() => {
                      onClear();
                    }}
                  >
                    {clearLabel}
                  </Button>
                </div>
              </div>
              <div className={styles.dateRangeBody}>{renderCalendar()}</div>
              <div className={styles.dateRangeFooter}>
                <Button
                  className={styles.dateRangeBtnConfirm}
                  size={"md"}
                  disabled={isConfirmDisabled}
                  onClick={() => {
                    onConfirm();
                  }}
                >
                  {confirmLabel}
                </Button>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </>
  );
};

DateRangePicker.defaultProps = {
  id: "data-test-id",
  size: "md",
  isCustomInput: false,
  dateFormat: "mm/dd/yyyy",
  isShowRequiredLabel: false,
  isRequired: true,
  isReadonly: false,
  isDisabled: false,
  isEndDateError: false,
  isStartDateError: false,
  endDateHelperMessage: "",
  startDateHelperMessage: "",
  isEndDateSuccess: false,
  isStartDateSuccess: false,
  endDateLabel: "End Date",
  startDateLabel: "Start Date",
  isDateRangeCleared: false,
  requiredLabel: "",
  clearLabel: "",
  confirmLabel: "",
  extraClassName: "",
  lang: "en",
  containerWidth: "100%",
};

DateRangePicker.propTypes = {
  id: PropTypes.string,   // id for date range
  size: PropTypes.string,   // for input field size
  startDateLabel: PropTypes.string, // start date label
  endDateLabel: PropTypes.string,   // end date label
  dateRange: PropTypes.array,   // its an array of start and end date ["", ""], You can pass "", date string or date object  
  onChange: PropTypes.func,   // function provide changed date range 
  isCustomInput: PropTypes.bool,    // if we need input ui passed from outside or not
  renderInput: PropTypes.func,    // to pass input UI from outside 
  dateFormat: PropTypes.string,   // date format
  isRequired: PropTypes.bool,   // if its required field or not
  isShowRequiredLabel: PropTypes.bool,    // if show required label or not
  requiredLabel: PropTypes.string,    // Required label  
  isReadonly: PropTypes.bool,   // if its readonly field
  isDisabled: PropTypes.bool,   // if its disabled field
  isStartDateError: PropTypes.bool,  // if start date has error 
  isEndDateError: PropTypes.bool,   // if end date has error
  isStartDateSuccess: PropTypes.bool,   // if start date is success
  isEndDateSuccess: PropTypes.bool,    // if end date is success
  startDateHelperMessage: PropTypes.string,   // start date message in case of success or error
  endDateHelperMessage: PropTypes.string,   // end date message in case of success or error
  isDateRangeCleared: PropTypes.bool,     // if feilds needs to clear with some external event 
  clearLabel: PropTypes.string,   // for mobile view clear label
  confirmLabel: PropTypes.string,   // for mobile view confirm label
  extraClassName: PropTypes.string,   // for more styling 
  lang: PropTypes.string,    // for internationalization 
  containerWidth: PropTypes.string,     // width of container wrapping input fields
};
