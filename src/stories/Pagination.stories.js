import React from "react";
import { Paginate } from "..";

export default {
  component: Paginate,
  title: "Pagination",
};
const handleChangePage = (event, newPage) => {
  // setCurrentPage(newPage);
};
const Template = (args) => (
  <Paginate
    currentPage={1}
    totalCount={6}
    pageSize={10}
    onPageChange={handleChangePage}
  />
);

export const Default = Template.bind({});
