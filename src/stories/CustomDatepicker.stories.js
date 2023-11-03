import React from "react";
import { CustomDatepicker } from "..";

export default {
  component: CustomDatepicker,
  title: "CustomDatepicker",
};

const Template = (args) => <CustomDatepicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "dateOfBirth",
  name: "dateOfBirth",
  label: "Date of Birth",
  onChangeFn: {},
  value: new Date(),
  isShowLabel: true,
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  id: "eventDate",
  name: "eventDate",
  label: "Event Date",
  onChangeFn: {},
  value: null,
  placeholder: "Select a date",
  isShowLabel: true,
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  id: "anniversary",
  name: "anniversary",
  onChangeFn: {},
  value: new Date(),
  isShowLabel: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: "disabledDate",
  name: "disabledDate",
  label: "Disabled Date",
  onChangeFn: {},
  value: new Date(),
  isShowLabel: true,
  isDisabled: true,
};
