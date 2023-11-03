import React from "react";
import { Tooltip } from "..";

export default {
  component: Tooltip,
  title: "Tooltip",
};

const Template = (args) => (
  <Tooltip {...args}>
    <p>Tooltip Content hover to see tooltip</p>
  </Tooltip>
);

export const Default = Template.bind({});
Default.args = {
  isDisabled: false,
  openDelay: 3000,
  body: "Lorema Ipsum Body",
};
