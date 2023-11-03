import React, { useState } from "react";
import { DateRangePicker } from "..";

export default {
  component: DateRangePicker,
  title: "DateRangePicker",
};

const Template = (args) => {
  const [dateRange, setDateRange] = useState(["", ""]);
  return (
    <DateRangePicker
      {...args}
      dateRange={dateRange}
      onChange={(e) => {
        setDateRange(e);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  id: "data-test-id",
  size: "md",
  isCustomInput: false,
  dateFormat: "MM/DD/YYYY",
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
  containerWidth: '300px'
};
