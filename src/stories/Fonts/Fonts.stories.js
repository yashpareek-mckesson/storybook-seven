import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

const FontSizeList = () => {
  const fontSizes = {
    "--brand-font-size--8": "0.8rem",
    "--brand-font-size--10": "1.0rem",
    "--brand-font-size--extra-small": "1.2rem",
    "--brand-font-size--small": "1.4rem",
    "--brand-font-size--15": "1.5rem",
    "--brand-font-size--default": "1.6rem",
    "--brand-font-size--17-4": "1.74rem",
    "--brand-font-size--large": "1.8rem",
    "--brand-font-size--20": "2.0rem",
    "--brand-font-size--22": "2.2rem",
    "--brand-font-size--24": "2.4rem",
    "--brand-font-size--28": "2.8rem",
    "--brand-font-size--44": "4.4rem",
    "--brand-font-size--49": "4.9rem",
    "--brand-font-size--50": "5.0rem",
    "--brand-font-size--54": "5.4rem",
    /*1.6 rem = 16px*/

    "--brand-font-weight-700": "700",
    "--brand-font-weight-600": "600",
    "--brand-font-weight-400": "400",

    "--brand-line-height-primary": "normal",
    "--brand-line-height-11": "1.1rem",
    "--brand-line-height--small": "1.4rem",
    "--brand-line-height--1-44": "1.44rem",
    "--brand-line-height--medium": "1.6rem",
    "--brand-line-height--large": "1.8rem",
    "--brand-line-height--m-large": "2.0rem",
    "--brand-line-height--x-large": "2.2rem",
    "--brand-line-height--24": "2.4rem",
    "--brand-line-height--26": "2.6rem",
    "--brand-line-height--xx-large": "2.8rem",
    "--brand-line-height--32": "3.2rem",
  };

  const [filterText, setFilterText] = useState("");
  const [copiedVariable, setCopiedVariable] = useState("");

  const filteredFontSizes = Object.entries(fontSizes)
    .filter(
      ([name, size]) => name.includes(filterText) || size.includes(filterText)
    )
    .sort(([, sizeA], [, sizeB]) => {
      const sizeValueA = parseFloat(sizeA);
      const sizeValueB = parseFloat(sizeB);
      return sizeValueA - sizeValueB;
    });
  const getFontWeight = (name) => {
    if (name.includes("--brand-font-weight")) {
      return fontSizes[name];
    }
    return "normal";
  };
  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopiedVariable(text);
  };

  return (
    <div>
      <h2>Font Sizes and Weights</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by size name or size (e.g., 1rem)"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <div className="font-list">
        {filteredFontSizes.map(([name, size]) => (
          <div key={name} className="font-item">
            <div className="font-name">
              <span className="variable-name">{name}</span>
            </div>
            <span className="example-text">{size}</span>

            <div
              className="example-text"
              style={{ fontSize: size, fontWeight: getFontWeight(name) }}
            >
              <p>Example Text with This Font Size</p>
            </div>
            <button onClick={() => copyToClipboard(name)}>
              {copiedVariable === name ? "Copied!" : "Copy Variable"}
            </button>
          </div>
        ))}
      </div>
      <style>
        {`
          .search-box {
            margin-bottom: 10px;
          }
          .font-name {
            font-weight: bold;
            margin-bottom: 10px;
          }

          .font-size {
            font-weight: bold;
          }
          
          .search-box input {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: none;
            outline: none;
          }

          .font-list {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
          }

          .font-item {
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            position: relative;
          }

          .font-name {
            font-weight: bold;
            margin-bottom: 10px;
          }

          .example-text {
            margin-top: 20px;
            font-size: 1rem;
          }

          button {
            margin-top: 10px;
            padding: 5px 10px;
            background-color: #007cc1;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          button:hover {
            background-color: #005a91;
          }
        `}
      </style>
    </div>
  );
};

storiesOf("Design Tokens/Fonts", module).add("Font Sizes and Weights", () => (
  <FontSizeList />
));
