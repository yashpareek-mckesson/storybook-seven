import React from "react";
import { Badge } from "..";

export default {
  component: Badge,
  title: "Badge",
};

const Template = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "info",
};

export const Error = Template.bind({});
Error.args = {
  text: "error",
  type: "error",
};

export const Warning = Template.bind({});
Warning.args = {
  text: "warning",
  type: "warning",
};

export const Success = Template.bind({});
Success.args = {
  text: "success",
  type: "success",
};

export const Info = Template.bind({});
Info.args = {
  text: "info-high",
  type: "info-high",
};

export const Error_High = Template.bind({});
Error_High.args = {
  text: "error-high",
  type: "error-high",
};

export const Warning_High = Template.bind({});
Warning_High.args = {
  text: "warning-high",
  type: "warning-high",
};

export const Success_High = Template.bind({});
Success_High.args = {
  text: "success-high",
  type: "success-high",
};

export const Info_Default = Template.bind({});
Info_Default.args = {
  text: "info-default",
  type: "info-default",
};

export const Primary = Template.bind({});
Primary.args = {
  text: "primary",
  type: "primary",
};

export const Primary_High = Template.bind({});
Primary_High.args = {
  text: "primary-high",
  type: "primary-high",
};

export const Primary_Default = Template.bind({});
Primary_Default.args = {
  text: "primary-default",
  type: "primary-default",
};
