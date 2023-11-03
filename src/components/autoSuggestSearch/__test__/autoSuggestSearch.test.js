import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { AutoSuggestSearch } from "../AutoSuggestSearch";

const MockAutoSuggestSearch = (props) => {
  return <AutoSuggestSearch {...props} />;
};

describe("AutoSuggestSearch", () => {
  it("renders label", async () => {
    render(<MockAutoSuggestSearch id={1} label={"search label"} />);
    const element = screen.getByTestId("label-testid-1");
    expect(element).toBeTruthy();
  });

  it("renders required dot if required field", async () => {
    render(<MockAutoSuggestSearch label={"search label"} isRequired={true} />);
    const element = screen.getByTestId("required-dot");
    expect(element).toBeTruthy();
  });
  it("renders tooltip if tooltip text present", async () => {
    render(
      <MockAutoSuggestSearch
        tooltipText={"this is tooltip text"}
        label={"search label"}
      />
    );
    const element = screen.getByRole("button", { value: "information" });
    expect(element).toBeTruthy();
  });
  it("renders search container", async () => {
    render(<MockAutoSuggestSearch />);
    const element = screen.getByTestId("autoSuggestSearchContainer");
    expect(element).toBeTruthy();
  });
  it("renders search input field", async () => {
    render(<MockAutoSuggestSearch jestTestData={{ searchText: "text" }} />);
    const element = screen.getByTestId("search-input");
    expect(element).toBeTruthy();
  });
  it("renders search placeholder", async () => {
    render(<MockAutoSuggestSearch placeHolder={"Placeholder text"} />);
    const element = screen.getByPlaceholderText("Placeholder text");
    expect(element).toBeTruthy();
  });
  it("renders input text in search bar", async () => {
    render(
      <MockAutoSuggestSearch jestTestData={{ searchText: "sample text" }} />
    );
    const element = screen.getByTestId("search-input");
    fireEvent.change(element, { target: { value: "sample text" } });
    expect(element).toBeTruthy();
  });
  it("renders suggestion list on search input", async () => {
    let suggestionList = ["result 1", "result 2"];
    let data = { searchText: "text" };
    render(
      <MockAutoSuggestSearch
        searchText={"text"}
        jestTestData={data}
        chLength={0}
        suggestionList={suggestionList}
      />
    );
    let list = screen.getAllByTestId("suggestion-list-item");
    expect(list.length).toBe(2);
  });
  it("renders refine message in suggestion list on search input", async () => {
    let suggestionList = ["result 1", "result 2"];
    let data = { searchText: "text" };
    render(
      <MockAutoSuggestSearch
        searchText={"text"}
        jestTestData={data}
        chLength={0}
        suggestionList={suggestionList}
        isShowRefineQueryMessage={true}
        refineFilterMessage={"Sample refine message"}
      />
    );
    const element = screen.getByText("Sample refine message");
    expect(element).toBeTruthy();
  });
  it("renders no results found in suggestion list on search input", async () => {
    let data = { searchText: "text" };
    render(
      <MockAutoSuggestSearch
        searchText={"text"}
        jestTestData={data}
        chLength={0}
      />
    );
    let element = screen.getByText("No Result Found!");
    expect(element).toBeTruthy();
  });
  it("renders close icon in search field if text is entered", async () => {
    render(<MockAutoSuggestSearch jestTestData={{ searchText: "text" }} />);
    const element = screen.getByTestId("close-icon");
    expect(element).toBeTruthy();
  });
  it("clear suggestion list when close icon clicked", async () => {
    let onChangeInput = jest.fn();
    render(
      <MockAutoSuggestSearch
        jestTestData={{ searchText: "text" }}
        onChangeInput={onChangeInput}
      />
    );
    const element = screen.getByTestId("close-icon");
    expect(element).toBeTruthy();
    await fireEvent.click(element);
    expect(onChangeInput).toHaveBeenCalled();
  });
});
