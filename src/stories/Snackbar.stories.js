import React from "react";
import { SnackBar } from "..";

export default {
  component: SnackBar,
  title: "SnackBar",
};

const Template = (args) => <SnackBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  title:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt tincidunt nunc,",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt tincidunt nunc, ac facilisis risus.",
  type: "success",
  onClose: () => {
    console.log("close clicked");
  },
  position: "bottom-center",
};
