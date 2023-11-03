import React from "react";
import { AutoSuggestSearch } from "..";

export default {
  component: AutoSuggestSearch,
  title: "AutoSuggestSearch",
};

const Template = (args) => <AutoSuggestSearch {...args} />;

export const Default = Template.bind({});

Default.args = {
  placeHolder: "Search Patient Name or ID",
  getSuggestionList: (searchText) => {
    const globalSearchList = [
      "test1",
      "newtest",
      "Akira",
      "testdata",
      "NewName",
    ];
    let filterval = globalSearchList.filter((x) => {
      return x.toLowerCase().includes(searchText.toLowerCase());
    });
    return filterval;
  },
  getSelectedValueData: (value) => {
    console.log(value);
  },
};
