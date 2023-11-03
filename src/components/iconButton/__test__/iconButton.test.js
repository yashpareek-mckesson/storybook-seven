import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { IconButton } from "../IconButton";

describe("Icon Button", () => {
  it("renders icon", async () => {
    render(<IconButton icon={<div data-testid="test-icon"></div>} />);
    const element = screen.getByTestId("test-icon");
    expect(element).toBeTruthy();
  });

  it("renders button", async () => {
    render(<IconButton ariaLabel="icon-button" />);
    const element = screen.getByLabelText("icon-button");
    expect(element).toBeTruthy();
  });
});
