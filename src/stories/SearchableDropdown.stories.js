import React from "react";
import { SearchableDropdown } from "..";

export default {
  component: SearchableDropdown,
  title: "SearchableDropdown",
};

const Template = (args) => (
  <SearchableDropdown
    id={"provider"}
    label={"Provider"}
    name={"provider-input"}
    isRequired={false}
    {...args}
    onChange={(value) => console.log("Selected Providers: ", value)}
  />
);

export const Default = Template.bind({});
Default.args = {
  options: [
    {
      label: "Tandy Christensen",
      value: 48,
      isChecked: false,
    },
    {
      label: "Hill Meadows",
      value: 17,
      isChecked: false,
    },
    {
      label: "Tracy Newman",
      value: 32,
      isChecked: true,
    },
    {
      label: "Taylor Bright",
      value: 46,
      isChecked: true,
    },
    {
      label: "Jody Langley",
      value: 55,
      isChecked: false,
    },
    {
      label: "August Case",
      value: 53,
      isChecked: false,
    },
    {
      label: "Kaylor William",
      value: 82,
      isChecked: false,
    },
    {
      label: "Quinn Robles",
      value: 35,
      isChecked: false,
    },
    {
      label: "Rojas Kelly",
      value: 73,
      isChecked: false,
    },
    {
      label: "Jamie Solomon",
      value: 42,
      isChecked: false,
    },
    {
      label: "Jody Langley",
      value: 58,
      isChecked: false,
    },
    {
      label: "Rowan Herring",
      value: 86,
      isChecked: false,
    },
    {
      label: "Emery Nolan",
      value: 34,
      isChecked: false,
    },
    {
      label: "Asra Simmons",
      value: 66,
      isChecked: false,
    },
    {
      label: "Chance Alexander",
      value: 32,
      isChecked: false,
    },
    {
      label: "Dae Figueroa",
      value: 67,
      isChecked: false,
    },
    {
      label: "Vasquez Robbins",
      value: 4,
      isChecked: false,
    },
    {
      label: "Jo Rosales",
      value: 24,
      isChecked: false,
    },
    {
      label: "Jo Rosales",
      value: 4,
      isChecked: false,
    },
    {
      label: "Bates Black",
      value: 29,
      isChecked: false,
    },
    {
      label: "Shawn Burke",
      value: 31,
      isChecked: false,
    },
    {
      label: "Nico Gould",
      value: 79,
      isChecked: false,
    },
    {
      label: "Bailey Lott",
      value: 13,
      isChecked: false,
    },
    {
      label: "Gomez Guthrie",
      value: 71,
      isChecked: false,
    },
    {
      label: "Shiloh Tran",
      value: 64,
      isChecked: false,
    },
  ],
  isSuccess: true,
};

export const NoSearchable = Template.bind({});
NoSearchable.args = {
  options: [
    { label: "Provider One", value: 10, isChecked: false },
    { label: "Provider Two", value: 20, isChecked: false },
    {
      label: "Provider Three, MD",
      value: 30,
      isChecked: false,
    },
  ],
};

export const ClearSelected = Template.bind({});
ClearSelected.args = {
  options: [
    {
      label: "Tandy Christensen",
      value: 48,
      isChecked: false,
    },
    {
      label: "Hill Meadows",
      value: 17,
      isChecked: false,
    },
    {
      label: "Tracy Newman",
      value: 32,
      isChecked: true,
    },
    {
      label: "Taylor Bright",
      value: 46,
      isChecked: true,
    },
    {
      label: "Jody Langley",
      value: 55,
      isChecked: false,
    },
    {
      label: "August Case",
      value: 53,
      isChecked: false,
    },
    {
      label: "Kaylor William",
      value: 82,
      isChecked: false,
    },
    {
      label: "Quinn Robles",
      value: 35,
      isChecked: false,
    },
    {
      label: "Rojas Kelly",
      value: 73,
      isChecked: false,
    },
    {
      label: "Jamie Solomon",
      value: 42,
      isChecked: false,
    },
    {
      label: "Jody Langley",
      value: 58,
      isChecked: false,
    },
    {
      label: "Rowan Herring",
      value: 86,
      isChecked: false,
    },
    {
      label: "Emery Nolan",
      value: 34,
      isChecked: false,
    },
    {
      label: "Asra Simmons",
      value: 66,
      isChecked: false,
    },
    {
      label: "Chance Alexander",
      value: 32,
      isChecked: false,
    },
    {
      label: "Dae Figueroa",
      value: 67,
      isChecked: false,
    },
    {
      label: "Vasquez Robbins",
      value: 4,
      isChecked: false,
    },
    {
      label: "Jo Rosales",
      value: 24,
      isChecked: false,
    },
    {
      label: "Jo Rosales",
      value: 4,
      isChecked: false,
    },
    {
      label: "Bates Black",
      value: 29,
      isChecked: false,
    },
    {
      label: "Shawn Burke",
      value: 31,
      isChecked: false,
    },
    {
      label: "Nico Gould",
      value: 79,
      isChecked: false,
    },
    {
      label: "Bailey Lott",
      value: 13,
      isChecked: false,
    },
    {
      label: "Gomez Guthrie",
      value: 71,
      isChecked: false,
    },
    {
      label: "Shiloh Tran",
      value: 64,
      isChecked: false,
    },
  ],
};

export const errorState = Template.bind({});
errorState.args = {
  options: [
    { label: "Provider One", value: 10, isChecked: false },
    { label: "Provider Two", value: 20, isChecked: false },
    {
      label: "Provider Three, MD",
      value: 30,
      isChecked: false,
    },
  ],
  error: true,
  errorMessage: "Please select atleast one provider",
};

export const disabledState = Template.bind({});
disabledState.args = {
  options: [
    { label: "Provider One", value: 10, isChecked: false },
    { label: "Provider Two", value: 20, isChecked: false },
    {
      label: "Provider Three, MD",
      value: 30,
      isChecked: false,
    },
  ],
  isDisabled: true,
};

export const singleSelect = Template.bind({});
singleSelect.args = {
  options: [
    { label: "Provider One", value: 10, isChecked: false },
    { label: "Provider Two", value: 20, isChecked: false },
    {
      label: "Provider Three, MD",
      value: 30,
      isChecked: false,
    },
  ],
  isMultiSelect: false,
  value: "10",
};

export const ActionableSelect = Template.bind({});
ActionableSelect.args = {
  options: [
    { label: "Provider One", value: 10, isChecked: false },
    { label: "Provider Two", value: 20, isChecked: false, isHideAction: true },
    {
      label: "Provider Three, MD",
      value: 30,
      isChecked: false,
    },
  ],
  isMultiSelect: false,
  value: "10",
  isActionable: true,
  menuActionIcon: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1417_48700)">
        <path
          d="M9.75 3.75H2.25C2.1837 3.75 2.12011 3.77634 2.07322 3.82322C2.02634 3.87011 2 3.9337 2 4V11C2 11.2652 2.10536 11.5196 2.29289 11.7071C2.48043 11.8946 2.73478 12 3 12H9C9.26522 12 9.51957 11.8946 9.70711 11.7071C9.89464 11.5196 10 11.2652 10 11V4C10 3.9337 9.97366 3.87011 9.92678 3.82322C9.87989 3.77634 9.8163 3.75 9.75 3.75ZM5.125 10.25C5.125 10.3495 5.08549 10.4448 5.01516 10.5152C4.94484 10.5855 4.84946 10.625 4.75 10.625C4.65054 10.625 4.55516 10.5855 4.48484 10.5152C4.41451 10.4448 4.375 10.3495 4.375 10.25V5.75C4.375 5.65054 4.41451 5.55516 4.48484 5.48484C4.55516 5.41451 4.65054 5.375 4.75 5.375C4.84946 5.375 4.94484 5.41451 5.01516 5.48484C5.08549 5.55516 5.125 5.65054 5.125 5.75V10.25ZM7.625 10.25C7.625 10.3495 7.58549 10.4448 7.51516 10.5152C7.44484 10.5855 7.34946 10.625 7.25 10.625C7.15054 10.625 7.05516 10.5855 6.98484 10.5152C6.91451 10.4448 6.875 10.3495 6.875 10.25V5.75C6.875 5.65054 6.91451 5.55516 6.98484 5.48484C7.05516 5.41451 7.15054 5.375 7.25 5.375C7.34946 5.375 7.44484 5.41451 7.51516 5.48484C7.58549 5.55516 7.625 5.65054 7.625 5.75V10.25Z"
          fill="#627386"
        />
        <path
          d="M11 2H8.625C8.59185 2 8.56005 1.98683 8.53661 1.96339C8.51317 1.93995 8.5 1.90815 8.5 1.875V1.25C8.5 0.918479 8.3683 0.600537 8.13388 0.366117C7.89946 0.131696 7.58152 0 7.25 0L4.75 0C4.41848 0 4.10054 0.131696 3.86612 0.366117C3.6317 0.600537 3.5 0.918479 3.5 1.25V1.875C3.5 1.90815 3.48683 1.93995 3.46339 1.96339C3.43995 1.98683 3.40815 2 3.375 2H1C0.867392 2 0.740215 2.05268 0.646447 2.14645C0.552678 2.24021 0.5 2.36739 0.5 2.5C0.5 2.63261 0.552678 2.75979 0.646447 2.85355C0.740215 2.94732 0.867392 3 1 3H11C11.1326 3 11.2598 2.94732 11.3536 2.85355C11.4473 2.75979 11.5 2.63261 11.5 2.5C11.5 2.36739 11.4473 2.24021 11.3536 2.14645C11.2598 2.05268 11.1326 2 11 2ZM4.5 1.875V1.25C4.5 1.1837 4.52634 1.12011 4.57322 1.07322C4.62011 1.02634 4.6837 1 4.75 1H7.25C7.3163 1 7.37989 1.02634 7.42678 1.07322C7.47366 1.12011 7.5 1.1837 7.5 1.25V1.875C7.5 1.90815 7.48683 1.93995 7.46339 1.96339C7.43995 1.98683 7.40815 2 7.375 2H4.625C4.59185 2 4.56005 1.98683 4.53661 1.96339C4.51317 1.93995 4.5 1.90815 4.5 1.875Z"
          fill="#627386"
        />
      </g>
      <defs>
        <clipPath id="clip0_1417_48700">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  menuActionClick: (value) => {
    console.log("clickedValue: ", value);
  },
};

export const asyncSearchable = Template.bind({});
asyncSearchable.args = {
  variant: "async",
  options: [
    {
      label: "Tandy Christensen",
      value: 48,
      isChecked: false,
    },
    {
      label: "Hill Meadows",
      value: 17,
      isChecked: false,
    },
    {
      label: "Tracy Newman",
      value: 32,
      isChecked: true,
    },
    {
      label: "Taylor Bright",
      value: 46,
      isChecked: true,
    },
    {
      label: "Jody Langley",
      value: 55,
      isChecked: false,
    },
    {
      label: "August Case",
      value: 53,
      isChecked: false,
    },
    {
      label: "Kaylor William",
      value: 82,
      isChecked: false,
    },
    {
      label: "Quinn Robles",
      value: 35,
      isChecked: false,
    },
    {
      label: "Rojas Kelly",
      value: 73,
      isChecked: false,
    },
    {
      label: "Jamie Solomon",
      value: 42,
      isChecked: false,
    },
    {
      label: "Jody Langley",
      value: 58,
      isChecked: false,
    },
    {
      label: "Rowan Herring",
      value: 86,
      isChecked: false,
    },
    {
      label: "Emery Nolan",
      value: 34,
      isChecked: false,
    },
    {
      label: "Asra Simmons",
      value: 66,
      isChecked: false,
    },
    {
      label: "Chance Alexander",
      value: 32,
      isChecked: false,
    },
    {
      label: "Dae Figueroa",
      value: 67,
      isChecked: false,
    },
    {
      label: "Vasquez Robbins",
      value: 4,
      isChecked: false,
    },
    {
      label: "Jo Rosales",
      value: 24,
      isChecked: false,
    },
    {
      label: "Jo Rosales",
      value: 4,
      isChecked: false,
    },
    {
      label: "Bates Black",
      value: 29,
      isChecked: false,
    },
    {
      label: "Shawn Burke",
      value: 31,
      isChecked: false,
    },
    {
      label: "Nico Gould",
      value: 79,
      isChecked: false,
    },
    {
      label: "Bailey Lott",
      value: 13,
      isChecked: false,
    },
    {
      label: "Gomez Guthrie",
      value: 71,
      isChecked: false,
    },
    {
      label: "Shiloh Tran",
      value: 64,
      isChecked: false,
    },
  ],
  asyncRecordsFound: 20,
  asyncHandleSearch: (e) => {
    console.log("Search text is: ", e);
  },
};
