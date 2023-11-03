import React from "react";
import { Stepper } from "..";
import PropTypes from "prop-types";

export default {
  component: Stepper,
  title: "Stepper",
};

const Template = (args) => (
  <Stepper
    activeIndex={args.activeIndex}
    stepHeaders={args.stepHeaders}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  activeIndex: 1,
  stepHeaders: [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }],
  isCompleted: false,
  isShowDefaultIcon: true,
  labelPosition: "default",
  mobileLabel: "Step",
  dividerText: "of",
  mobileView: false,
  mobileViewCount: true,
};

export const Completed = Template.bind({});
Completed.args = {
  ...Default.args,
  isCompleted: true,
};

export const RightLabelPosition = Template.bind({});
RightLabelPosition.args = {
  ...Default.args,
  labelPosition: "right",
};

export const MobileView = Template.bind({});
MobileView.args = {
  ...Default.args,
  mobileView: true,
};

export const MobileViewWithoutCount = Template.bind({});
MobileViewWithoutCount.args = {
  ...Default.args,
  mobileView: true,
  mobileViewCount: false,
};
