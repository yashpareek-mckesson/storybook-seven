import React, { useState } from "react";
import { CustomDataTable } from "..";

export default {
  component: CustomDataTable,
  title: "Data Table",
};

// Sample data
let tableData = [
  {
    id: 1,
    PatientName: "John Doe",
    Priority: "High",
    Task: 123,
    Type: "Medical",
    TaskPurpose: "Checkup",
    Location: "Hospital",
    Provider: "Dr. Smith",
    Assignee: "Nurse Jane",
    LastUpdate: "2023-08-15",
    TaskAge: "2 days",
    Status: "Pending",
  },
  {
    id: 2,
    PatientName: "Jane Smith",
    Priority: "Medium",
    Task: 124,
    Type: "Lab",
    TaskPurpose: "Blood Test",
    Location: "Clinic",
    Provider: "Dr. Johnson",
    Assignee: "Lab Technician",
    LastUpdate: "2023-08-14",
    TaskAge: "1 day",
    Status: "Completed",
  },
  // Add more data entries...
];

// Table headers configuration
let tableHeaders = [
  {
    id: "PatientName",
    name: "Patient Name",
    sortable: true,
    selector: (row) => row.PatientName,
  },
  {
    id: "Priority",
    name: "Priority",
    sortable: true,
    cell: (row) => (
      <div style={{ backgroundColor: "red", color: "blue" }}>
        {row.Priority}
      </div>
    ),
    selector: (row) => row.Priority,
  },
  {
    id: "Task",
    name: "Task#",
    sortable: false,
    selector: (row) => row.Task,
  },
  {
    id: "Type",
    name: "Type",
    sortable: false,
    selector: (row) => row.Type,
  },
  {
    id: "TaskPurpose",
    name: "Task Purpose",
    sortable: false,
    selector: (row) => row.TaskPurpose,
  },
  {
    id: "Location",
    name: "Location",
    sortable: false,
    selector: (row) => row.Location,
  },
  {
    id: "Provider",
    name: "Provider",
    sortable: false,
    selector: (row) => row.Provider,
  },
  {
    id: "Assignee",
    name: "Assignee",
    sortable: false,
    selector: (row) => row.Assignee,
  },
  {
    id: "LastUpdate",
    name: "Last Update",
    sortable: false,
    selector: (row) => row.LastUpdate,
  },
  {
    id: "TaskAge",
    name: "Task Age",
    sortable: false,
    selector: (row) => row.TaskAge,
  },
  {
    id: "Status",
    name: "Status",
    sortable: false,
    selector: (row) => row.Status,
  },
];

// Callback for sort icon click
const onSortIconClick = (selectedColumn, sortDirection, sortedRows) => {};

// Callback for page change
const handleChangePage = (event, newPage) => {};

const Template = (args) => <CustomDataTable {...args} />;

// Default variation
export const Default = Template.bind({});
Default.args = {
  columns: tableHeaders,
  data: tableData,
  onSortIconClick: onSortIconClick,
  handleChangePage: handleChangePage,
  totalPageCount: 20,
  totalRecords: tableData.length,
  recordsPerPage: 10,
  currentPage: 1,
  noDataComponent: "No results",
  defaultSortColumn: "Priority",
  paginationTotalRecordsMessage: "results",
  paginationRecordsPerPageMessage: "per page",
  stickyHeader: true,
};
