// colors.stories.js

import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
const ColorSquare = ({ colorName, colorValue }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const el = document.createElement("textarea");
    el.value = colorName;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "160px",
        height: "100px",
        margin: "20px",
        cursor: "pointer",
      }}
      onClick={handleCopy}
    >
      <span
        role="img"
        aria-label="clipboard"
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          fontSize: "16px",
        }}
      >
        📋
      </span>
      <div
        style={{
          backgroundColor: colorValue,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#000000",
        }}
      >
        {copied && (
          <div
            style={{
              position: "absolute",
              top: "0", // Align to the top
              right: "0", // Align to the right
              background: "rgba(0, 0, 0, 0.8)",
              color: "#ffffff",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              zIndex: "1",
            }}
          >
            Copied!
          </div>
        )}
      </div>
      <div style={{ textAlign: "center", Padding: "5px" }}>
        <div>{colorName}</div>
        <div>{colorValue}</div>
      </div>
    </div>
  );
};

const colorVariables = {
  "--brand-color-primary": "#007cc1",
  "--brand-color-primary--hover": "#1e394e",
  "--brand-color-primary-background": "#627386",
  "--brand-color-secondary": "#f7c91e",
  "--brand-color-secondary--hover": "#faf5e2",
  "--brand-color-secondary-background": "#bce8f1",
  "--brand-color-background": "#E9F0F5",
  "--brand-color-background-grey": "#c3d1d7",
  "--brand-color-border-grey": "#b6c5cc",
  "--brand-color-grey-scale-warm-4": "#F0F3F5",
  "--brand-color-black": "#1e394e",
  "--brand-color-cool-blue": "#F2F6FA",
  "--brand-color-font-black": "#181818",
  "--brand-color-grey": "#1A202C",
  "--brand-color-light-grey": "#eaf1f6",
  "--brand-color-black-1": "#181818",
  "--brand-color-warm-grey": "#FBFBFA",
  "--brand-color-cool-grey-2": "#e5e8ea",
  "--brand-color-cool-grey-3": "#e8e4df",
  "--brand-color-cool-grey-4": "#adadad",
  "--brand-color-primary-slate": "#3C5C6E",
  "--brand-color-primary-blue": "#007CC1",
  "--brand-color-primary-yellow": "#F7C91E",
  "--brand-color-primary-black": "#181818",
  "--brand-color-text-skyblue": "#79b9de",
  "--brand-color-patient-primary-1": "#C6D7DF",
  "--brand-color-patient-primary-2": "#BACAD1",
  "--brand-color-patient-primary-3": "#B3C2C9",
  "--brand-color-patient-secondary": "#E9F0F5",
  "--brand-color-grey-scale-cool-1": "#BAC5CC",
  "--brand-color-grey-scale-cool-2": "#E5E8EA",
  "--brand-color-grey-scale-cool-3": "#F2F6FA",
  "--brand-color-grey-scale-warm-1": "#D9D8D7",
  "--brand-color-grey-scale-warm-2": "#F3F2F1",
  "--brand-color-grey-scale-warm-3": "#FBFBFA",
  "--brand-color-background-white": "#FFFFFF",
  "--brand-color-background-warm-grey-3": "#FBFBFA",
  "--brand-color-background-blue-2": "#00669E",
  "--brand-color-background-blue-3": "#005483",
  "--brand-color-background-cool-grey-3": "#F2F6FA",
  "--brand-color-background-light-slate": "#627386",
  "--brand-color-background-dark-slate": "#1E394E",
  "--brand-color-text-black": "#181818",
  "--brand-color-text-blue": "#007CC1",
  "--brand-color-text-dark-slate": "#1E394E",
  "--brand-color-text-light-slate": "#627386",
  "--brand-color-text-cool-grey": "#BAC5CC",
  "--brand-color-secondary-active-yellow-1": "#F7C91E",
  "--brand-color-secondary-active-yellow-2": "#FAF0C8",
  "--brand-color-secondary-active-yellow-3": "#FAF5E2",
  "--brand-color-secondary-active-yellow-4": "#FEFCF7",
  "--brand-color-success-green-1": "#2E8540",
  "--brand-color-success-green-2": "#48A463",
  "--brand-color-success-green-3": "#8DD6A3",
  "--brand-color-success-green-4": "#E7F4E4",
  "--brand-color-warning-coral": "#FF5B42",
  "--brand-color-warning-orange-1": "#D3722E",
  "--brand-color-warning-orange-2": "#ECB672",
  "--brand-color-warning-orange-3": "#F9E6CF",
  "--brand-color-warning-orange-4": "#DB3A29",
  "--brand-color-warning-red-4": "#f9e9e8",
  "--brand-color-warning-dark-coral": "#DB3A29",
  "--brand-color-dark-box-shadow-1": "rgba(38, 44, 54, 0.4)",
  "--brand-color-general-white": "#FFFFFF",
  "--brand-color-general-black": "#000000",
  "--brand-color-general-offwhite": "#DCEBF5",
};

const ColorList = ({ filterText }) => (
  <div style={{ display: "flex", flexWrap: "wrap" }}>
    {Object.entries(colorVariables)
      .filter(([name, value]) => {
        // Check if either the color name or value includes the filter text
        return (
          name.includes(filterText) ||
          value.toLowerCase().includes(filterText.toLowerCase())
        );
      })
      .map(([name, value]) => (
        <ColorSquare colorName={name} colorValue={value} key={name} />
      ))}
  </div>
);

const ColorPalette = () => {
  const [filterText, setFilterText] = useState("");

  return (
    <div>
      <h2>All Colors</h2>
      <div style={searchBoxStyles}>
        <input
          type="text"
          placeholder="Search by color name or hex code"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={inputStyles}
        />
      </div>
      <ColorList filterText={filterText} />
    </div>
  );
};

const searchBoxStyles = {
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const inputStyles = {
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxShadow: "none",
  outline: "none",
};
storiesOf("Design Tokens/Colors", module).add("All Colors", () => (
  <ColorPalette />
));
