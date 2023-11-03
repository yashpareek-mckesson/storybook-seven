import React from "react";
import { InputField } from "..";

export default {
  component: InputField,
  title: "InputField",
};

const register = () => {};

const Template = (args) => (
  <InputField
    id={args.id}
    name={args.name}
    label={args.label}
    isRequired={args.isRequired}
    validationFn={args.validationFn}
    onBlurFn={args.onBlurFn}
    onChangeFn={args.onChangeFn}
    register={args.register}
    errors={args.errors}
    tooltipText={args.tooltipText}
    autoFocus={args.autoFocus}
  />
);

export const Default = Template.bind({});
Default.args = {
  id: "firstName",
  name: "firstName",
  label: "First Name",
  isRequired: true,
  validationFn: (value) => null,
  onBlurFn: () => null,
  onChangeFn: () => null,
  register: register,
  errors: {},
  tooltipText: "Enter your first name",
  autoFocus: false,
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  ...Default.args,
  label: undefined,
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  errors: { firstName: "Field is required" },
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  isDisabled: true,
};
