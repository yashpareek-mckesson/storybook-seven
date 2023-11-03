import React from "react";
import { Alert } from "..";

export default {
  component: Alert,
  title: "Alert",
};

const Template = (args) => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Title",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  type: "success",
  size: "md",
  onClose: () => {
    console.log("close clicked");
  },
};

export const Large = Template.bind({});
Large.args = {
  title: "Title",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  showTitle: true,
  type: "success",
  size: "lg",
  onClose: () => {
    console.log("close clicked");
  },
};

export const Small = Template.bind({});
Small.args = {
  title: "Title",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  showTitle: true,
  type: "success",
  size: "sm",
  onClose: () => {
    console.log("close clicked");
  },
};

export const Error = Template.bind({});
Error.args = {
  title: "Title",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  showTitle: true,
  type: "error",
  size: "md",
  onClose: () => {
    console.log("close clicked");
  },
};

export const Info = Template.bind({});
Info.args = {
  title: "Title",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  showTitle: true,
  type: "info",
  size: "md",
  onClose: () => {
    console.log("close clicked");
  },
};
