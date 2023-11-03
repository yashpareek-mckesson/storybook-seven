import React, { useState } from "react";
import { Dropdown } from "..";

export default {
  component: Dropdown,
  title: "Dropdown",
};

const Template = (args) => {
  const [selectedValue, setSelectedValue] = useState();
  return (
    <div style={{ width: "500px" }}>
      <Dropdown
        id={args.id}
        label={args.label}
        name={args.name}
        isRequired={args.isRequired}
        placeholder={args.placeholder}
        options={args.options}
        value={selectedValue}
        showRequiredLabel={args.showRequiredLabel}
        size={args.size}
        onChange={(selectedValue) => {
          setSelectedValue(selectedValue);
        }}
        isShowLabel={args.isShowLabel}
        menuWidthStyle={args.menuWidthStyle}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: "demo-dropdown",
  label: "Age",
  name: "age-input",
  isRequired: false,
  placeholder: "select age",
  options: [
    { label: "ten", value: 10, subLabel: "(M.D)" },
    { label: "twenty", value: 20 },
    {
      label: "thirty, two MD",
      value: 30,
      subLabel: "(Medical Oncology, Radiology Oncology, Surgical Oncology)",
    },
    {
      label: "abc@yopmail.com",
      value: 40,
      endLabel: "Primary",
    },
  ],
  showRequiredLabel: false,
  size: "sm",
  isShowLabel: true,
  menuWidthStyle: "inherit",
};

export const Required = Template.bind({});
Required.args = {
  ...Default.args,
  isRequired: true,
  showRequiredLabel: true,
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  ...Default.args,
  size: "lg",
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  ...Default.args,
  label: undefined,
  isShowLabel: false,
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  ...Default.args,
  menuWidthStyle: "300px",
};
