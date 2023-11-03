import React from "react";
import { CheckboxGroup } from "..";

export default {
  component: CheckboxGroup,
  title: "CheckboxGroup",
};

const Template = (args) => <CheckboxGroup id={"checkbox" + 1} {...args} />;

export const Unchecked = Template.bind({});
Unchecked.args = {
  items: [
    {
      isDisabled: false,
      isChecked: false,
      label: <span>select</span>,
      onChange: () => null,
    },
  ],
};
export const Checked = Template.bind({});
Checked.args = {
  items: [
    {
      isDisabled: false,
      isChecked: true,
      label: <span>select</span>,
      onChange: () => null,
    },
  ],
};
export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  items: [
    {
      isChecked: true,
      isDisabled: true,
      label: <span>select</span>,
      onChange: () => null,
    },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  items: [
    {
      isDisabled: true,
      isChecked: false,
      label: <span>select</span>,
      onChange: () => null,
    },
  ],
};
