import React, { useState } from "react";
import { Card } from "..";

export default {
  component: Card,
  title: "Card",
};
const currentExpandedCard = 1;
const onExpandCard = (uniqueId) => {
  if (uniqueId === currentExpandedCard) {
    currentExpandedCard = null;
  } else {
    currentExpandedCard = uniqueId;
  }
};
const Template = (args) => (
  <Card
    onExpandCard={onExpandCard}
    {...args}
    uniqueId={1}
    header={<h1>Card header</h1>}
    bodyContent={
      <p>
        Card Body Content Loream IPSUM Content Loream IPSUM Content Loream IPSUM
        Content Loream IPSUM Content Loream IPSUM Content Loream IPSUM Content
        Loream IPSUM
      </p>
    }
    type="accordion"
    width={``}
  />
);

export const Closed = Template.bind({});
Closed.args = {
  currentExpandedCard: 0,
};
export const Expanded = Template.bind({});
Expanded.args = {
  currentExpandedCard: 1,
};
