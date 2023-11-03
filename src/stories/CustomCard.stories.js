import React from "react";
import { CustomCard } from ".."; // Replace with the correct import path

export default {
  component: CustomCard,
  title: "Custom Card",
};

const CardContent = (
  <div>
    <div style={{ padding: "20px", borderRadius: "5px" }}>
      <h2 style={{ marginBottom: "10px" }}>Product Name</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#333", fontWeight: "bold", fontSize: "18px" }}>
          $29.99
        </span>
        <button
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

const Template = (args) => <CustomCard {...args}>{CardContent}</CustomCard>;

export const Default = Template.bind({});
Default.args = {};

export const Selected = Template.bind({});
Selected.args = {
  isSelected: true,
};
