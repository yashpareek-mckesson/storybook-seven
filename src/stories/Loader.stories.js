import React from "react";
import { Loader } from "..";

export default {
  component: Loader,
  title: "Loader",
};

const Template = (args) => <Loader {...args} />;

export const Screen = Template.bind({});
Screen.args = {
  type: "screen",
};
export const Inline = Template.bind({});
Screen.args = {
  type: "inline",
};
