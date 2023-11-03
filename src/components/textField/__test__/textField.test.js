import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { TextField } from "../TextField";

describe("TextField", () => {
  it("Should render text field component", async () => {
    render(<TextField />);
    const element = screen.getByTestId("input");
    expect(element).toBeTruthy();
  });

  it("Should render placeholder", async () => {
    render(<TextField placeholder="placeholder test" />);
    const element = screen.getByPlaceholderText("placeholder test");
    expect(element).toBeTruthy();
  });

  it("Should render typed input", async () => {
    render(<TextField />);
    let element = screen.getByTestId("input");
    fireEvent.change(element, { target: { value: "sample text" } });
    expect(element).toBeTruthy();
  });
});
