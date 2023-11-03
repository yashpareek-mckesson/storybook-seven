import React from "react";
import { TabList } from "..";

export default {
  component: TabList,
  title: "Tablist",
};

const Template = (args) => (
  <TabList
    options={[
      {
        label: "CONDITIONS",
        labelForMobile: "Conditions",
        id: 12,
        configId: "ec7c594b-97c8-1a83-e053-0f13090a4df0",
        configName: "CONDITIONS",
        configType: "HEALTH_RECORDS",
        isActive: true,
        sequence: 1,
        parentId: "ec7c594b-97c1-1a83-e053-0f13090a4df0",
        isActiveTab: false,
      },
      {
        label: "RESULTS",
        labelForMobile: "Results",
        id: 13,
        configId: "ec7c594b-97c9-1a83-e053-0f13090a4df0",
        configName: "RESULTS",
        configType: "HEALTH_RECORDS",
        isActive: true,
        sequence: 2,
        parentId: "ec7c594b-97c1-1a83-e053-0f13090a4df0",
        isActiveTab: true,
      },
      {
        label: "MEDICATIONS",
        labelForMobile: "Medications",
        id: 14,
        configId: "ec7c594b-97ca-1a83-e053-0f13090a4df0",
        configName: "MEDICATIONS",
        configType: "HEALTH_RECORDS",
        isActive: true,
        sequence: 3,
        parentId: "ec7c594b-97c1-1a83-e053-0f13090a4df0",
        isActiveTab: false,
      },
      {
        label: "CLINICAL NOTES",
        labelForMobile: "Clinical Notes",
        id: 15,
        configId: "ec7c594b-97cb-1a83-e053-0f13090a4df0",
        configName: "CLINICAL_NOTES",
        configType: "HEALTH_RECORDS",
        isActive: true,
        sequence: 4,
        parentId: "ec7c594b-97c1-1a83-e053-0f13090a4df0",
        isActiveTab: false,
      },
      {
        label: "DEVICES",
        labelForMobile: "Devices",
        id: 16,
        configId: "ec7c594b-97cc-1a83-e053-0f13090a4df0",
        configName: "DEVICES",
        configType: "HEALTH_RECORDS",
        isActive: true,
        sequence: 5,
        parentId: "ec7c594b-97c1-1a83-e053-0f13090a4df0",
        isActiveTab: false,
      },
      {
        label: "ALLERGIES",
        labelForMobile: "Allergies",
        id: 17,
        configId: "ec7c594b-97cd-1a83-e053-0f13090a4df0",
        configName: "ALLERGIES",
        configType: "HEALTH_RECORDS",
        isActive: true,
        sequence: 6,
        parentId: "ec7c594b-97c1-1a83-e053-0f13090a4df0",
        isActiveTab: false,
      },
    ]}
    {...args}
  />
);

export const Default = Template.bind({});

Default.args = {
  alignment: "center",
  showShadow: true,
  useAsButton: false,
};
