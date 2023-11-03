import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { Tooltip } from "../Tooltip";

describe("Tooltip", () => {
  it("Should render tooltip", async () => {
    const element = render(
      <Tooltip body={<div>Tooltip</div>}>
        <div data-testid="hover-tooltip">Hover for tooltip</div>
      </Tooltip>
    );
    fireEvent.mouseOver(element.getByTestId("hover-tooltip"));
    expect(await element.findByText("Tooltip")).toBeInTheDocument();
  });

  it("Should not render tooltip by default without hover", async () => {
    const element = render(
      <Tooltip body={<div>Tooltip</div>} defaultIsOpen={false}>
        <div data-testid="hover-tooltip">Hover for tooltip</div>
      </Tooltip>
    );
    expect(element.queryByText("Tooltip")).not.toBeInTheDocument();
  });

  it("Should not render tooltip when disabled", async () => {
    const element = render(
      <Tooltip body={<div>Tooltip</div>} isDisabled={true}>
        <div data-testid="hover-tooltip">Hover for tooltip</div>
      </Tooltip>
    );
    fireEvent.mouseOver(element.getByTestId("hover-tooltip"));
    expect(element.queryByText("Tooltip")).not.toBeInTheDocument();
  });
});
