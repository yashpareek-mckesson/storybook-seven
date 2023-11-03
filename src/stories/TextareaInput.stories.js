import React, { useState } from "react";
import { TextareaInput } from "..";

export default {
  component: TextareaInput,
  title: "TextareaInput",
};

const Template = (args) => {
  const [contentValue, setContentValue] = useState("");
  return (
    <TextareaInput
      {...args}
      value={contentValue}
      onChangeFn={(value) => setContentValue(value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  id: "FirstName",
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  isRequiredText: "Required",
  isSingleFormField: false,
  label: "First name",
  maxCharHelperText: "Maximum 1,000 Characters",
  maxCharLimit: 1000,
  maxCharWarningLimit: 900,
  maxLimitReachedHelpertext: "Character limit reached",
  placeholder: "Type something",
  minRows: 3,
};
