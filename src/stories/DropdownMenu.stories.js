import React, { useState } from "react";
import { DropdownMenu } from "..";

export default {
  component: DropdownMenu,
  title: "DropdownMenu",
};

const Template = (args) => {
  return (
    <div>
      <DropdownMenu
        options={[
          {
            label: "Copy",
            value: "Copy",
          },
          {
            label: "Cut",
            value: "Cut",
          },
          {
            label: "Paste",
            value: "Paste",
          },
          {
            label: "Withdraw form",
            value: "Withdraw form",
          },
        ]}
        anchorEl={<span>Click</span>}
        handleSelect={(e) => console.log(e)}
      />
    </div>
  );
};
export const Default = Template.bind({});
