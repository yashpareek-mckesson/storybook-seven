import React, { useState } from "react";
import { IoFemaleSharp } from "react-icons/io5";
import { Modal } from "..";

export default {
  component: Modal,
  title: "Modal",
};

const TemplateDesktop = (args) => (
  <Modal
    isOpen={true}
    onClose={() => null}
    isMobileView={false}
    modalTitle={<div> Modal Title</div>}
    modalBody={
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </div>
    }
  />
);

const TemplateMobile = (args) => (
  <Modal
    isOpen={true}
    //   onClose={() => null}
    isMobileView={true}
    modalTitle={<div> Modal Title</div>}
    modalSize={"xxs"}
    modalBody={
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </div>
    }
  />
);

export const Desktop = TemplateDesktop.bind({});
export const Mobile = TemplateMobile.bind({});
