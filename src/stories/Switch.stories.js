import React, { useState } from "react";
import { Switch } from "..";

export default {
  component: Switch,
  title: "Switch",
};

const Template = (args) => {
  const [value, setValue] = useState(args.value);
  const handleToggle = () => {
    setValue(!value);
  };

  return <Switch {...args} value={value} handleToggle={handleToggle} />;
};

export const Checked = Template.bind({});
Checked.args = {
  id: "id",
  name: "Toggle",
  label: "Label",
  labelPosition: "right",
  value: true,
  size: "lg",
};

export const UnChecked = Template.bind({});
UnChecked.args = {
  id: "id",
  name: "Toggle",
  label: "Label",
  labelPosition: "right",
  value: false,
  size: "lg",
};

export const LeftLabel = Template.bind({});
LeftLabel.args = {
  id: "id",
  name: "Toggle",
  label: "Label on Left",
  labelPosition: "Left",
  value: false,
  size: "lg",
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: "id",
  name: "Toggle",
  label: "Disabled",
  labelPosition: "right",
  value: true,
  size: "lg",
  disabled: true,
};
