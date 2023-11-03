import React from "react";
import { ErrorPage } from "../components/errorPage";

export default {
  component: ErrorPage,
  title: "ErrorPage",
};

const Template = (args) => <ErrorPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  errorTitle: "Something Unexpected Happened",

  errorSubtitle:
    "Sorry, an error has occurred. Please check back later.If the problem persists, contact Ontada Health support at (555) 555-5555",
};
