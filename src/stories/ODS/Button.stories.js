import React from "react";
import { Button } from "../..";

export default {
  component: Button,
  title: "ODS/Button",
};

const Template = () => (
  <Button id={"button"} dataTestId={"button"} onClick={() => null}>
    Button
  </Button>
);

export const Default = Template.bind({});
