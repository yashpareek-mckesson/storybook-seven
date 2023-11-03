import React from "react";
import { Address } from "..";

export default {
  component: Address,
  title: "Address",
};

const Template = (args) => <Address {...args} />;

export const Default = Template.bind({});
Default.args = {
  addressHeader: "Home Address",
  addressLine1: "123 Main St",
  addressLine2: "Apt 4B",
  addressLine3: "Building Name",
  city: "San Francisco",
  state: "California",
  zip: "94101",
  phoneNumber: "+1 123-456-7890",
};

export const WithPhoneNumber = Template.bind({});
WithPhoneNumber.args = {
  addressLine1: "456 Elm St",
  city: "New York",
  zip: "10001",
  state: "New York",
  countryCode: "US",
  phoneNumber: "+1 123-456-7890",
};

export const WithCustomLink = Template.bind({});
WithCustomLink.args = {
  addressLine1: "987 Pine St",
  city: "Chicago",
  zip: "60601",
  state: "Illinois",
  countryCode: "US",
  addressWithDirections: true,
  link: <a>https://example.com</a>,
};
