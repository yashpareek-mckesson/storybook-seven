import React from "react";
import { TextField } from "..";

export default {
  component: TextField,
  title: "Text Field",
};

const Template = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Place holder",
  variant: "outline",
  label: "Label",
  value: "Loream",
};
