import React from "react";
import { RadioGroup } from "..";
import PropTypes from "prop-types";

export default {
  component: RadioGroup,
  title: "RadioGroup",
};

const Template = (args) => (
  <RadioGroup
    id={args.id}
    items={args.items}
    value={args.value}
    onChangeValue={args.onChangeValue}
    direction={args.direction}
    caption={args.caption}
    showFlexWrap={args.showFlexWrap}
    radioBtnWidth={args.radioBtnWidth}
    otherTextValue={args.otherTextValue}
    onOtherTextChange={args.onOtherTextChange}
    onSubRadioFieldChange={args.onSubRadioFieldChange}
    masterListsMeta={args.masterListsMeta}
    dataSchema={args.dataSchema}
    isRequired={args.isRequired}
  />
);

export const Default = Template.bind({});
Default.args = {
  id: "radioGroup",
  items: [
    { isDisabled: false, value: "option1", label: "Option 1" },
    { isDisabled: false, value: "option2", label: "Option 2" },
  ],
  value: "option1",
  onChangeValue: (selectedValue) => {
    console.log("Selected value:", selectedValue);
  },
  direction: "column",
  caption: "Select an option",
  showFlexWrap: false,
  radioBtnWidth: "auto",
  otherTextValue: "",
  onOtherTextChange: (text) => {
    console.log("Other text:", text);
  },
  onSubRadioFieldChange: (subValue) => {
    console.log("Sub radio field value:", subValue);
  },
  masterListsMeta: {},
  dataSchema: {},
  isRequired: false,
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  ...Default.args,
  direction: "row",
};

export const WithCaption = Template.bind({});
WithCaption.args = {
  ...Default.args,
  caption: "Choose a category",
};

export const Required = Template.bind({});
Required.args = {
  ...Default.args,
  isRequired: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  items: [
    { isDisabled: true, value: "option1", label: "Option 1" },
    { isDisabled: true, value: "option2", label: "Option 2" },
  ],
};
export const WithSubRadioFields = Template.bind({});
WithSubRadioFields.args = {
  ...Default.args,
  items: [
    {
      isDisabled: false,
      value: "option1",
      label: "Option 1",
      subLabel: "Sub-label for Option 1",
    },
    {
      isDisabled: false,
      value: "option2",
      label: "Option 2",
      subLabel: "Sub-label for Option 2",
    },
  ],
};
