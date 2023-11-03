import React from "react";
import { ProgressButton } from "..";

export default {
  component: ProgressButton,
  title: "ProgressButton",
};

const Template = (args) => (
  <ProgressButton
    id={"P1"}
    {...args}
    processingText={"Saving..."}
    completedText={"Saved"}
    onClickFn={() => {}}
  >
    Save
  </ProgressButton>
);

export const Default = Template.bind({});
Default.args = {
  isProcessing: false,
  isCompleted: false,
};

export const InProgress = Template.bind({});
InProgress.args = {
  isProcessing: true,
};

export const InCompleted = Template.bind({});
InCompleted.args = {
  isProcessing: false,
  isCompleted: true,
};
