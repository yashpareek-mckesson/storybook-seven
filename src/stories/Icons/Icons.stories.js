import React, { useMemo, useState } from "react";
import { storiesOf } from "@storybook/react";
import { ReactComponent as crossButton } from "../../assets/icons/assets/svg/crossButton.svg";
import { ReactComponent as downArrow } from "../../assets/icons/assets/svg/downArrow.svg";
import { ReactComponent as leftArrow } from "../../assets/icons/assets/svg/leftArrow.svg";
import { ReactComponent as mobileArrow } from "../../assets/icons/assets/svg/mobileArrow.svg";
import { ReactComponent as attachmentsIndicator } from "../../assets/icons/assets/svg/attachmentsIndicator.svg";
import { ReactComponent as commentsIndicator } from "../../assets/icons/assets/svg/commentsIndicator.svg";

const svgs = {
  CrossButton: crossButton,
  DownArrow: downArrow,
  LeftArrow: leftArrow,
  MobileArrow: mobileArrow,
  AttachmentsIndicator: attachmentsIndicator,
  CommentsIndicator: commentsIndicator,
};

const IconsList = () => {
  const [copiedIcon, setCopiedIcon] = useState("");
  const [copied, setCopied] = useState(false);
  const [filterText, setFilterText] = useState("");

  const filteredIcons = useMemo(() => {
    return Object.keys(svgs).filter((icon) =>
      icon.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText]);

  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopiedIcon(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div>
      <h2>All Icons</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by icon name"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <div>
        <h2>Accessibility</h2>
        <div className="accessbility">
          <p className="accessbility-text">
            <span>{"<"}</span>
            <span className="wheat-text">Icon</span>{" "}
            <span className="green-text">src</span>
            <span className="white-text">=</span>
            <span className="pink-text">"CrossButton"</span>{" "}
            <span className="green-text">size</span>
            <span>=</span>
            <span className="pink-text">"l"</span>{" "}
            <span className="green-text">fill</span>
            <span>=</span>
            <span className="pink-text">"#0000000"</span>
            <span>{"/>"}</span>
          </p>
        </div>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <h2>Size</h2>
        <span className="sizes">
          'xs' |&nbsp;'s' |&nbsp;'m' |&nbsp;'l' |&nbsp;'xl' |&nbsp;'xxl'
        </span>
      </div>
      <div className="icon-list">
        {filteredIcons.map((icon) => {
          const SvgIcon = svgs[icon];
          return (
            <div>
              <div
                key={icon}
                className="icon"
                title="Click to copy to clipboard"
                onClick={() => copyToClipboard(icon)}
              >
                <SvgIcon  height="30px" width="30px"/>
                {copiedIcon === icon && copied && (
                  <div className="copied-text">Copied!</div>
                )}
              </div>
              <div className="icon-name">
                <div>{icon}</div>
              </div>
            </div>
          );
        })}
      </div>
      <style>
        {`  
          .sizes {
            font-size: 10px;
          }
          .search-box {
            margin-bottom: 10px;
          }
          .accessbility {
            border: 1px solid;
            padding: 10px 10px;
            border-radius: 5px;
            margin-bottom: 15px;
            background-color: black;
          }
          .accessbility-text {
            font-size: 14px;
            color: white;
          }
          .copy-icon {
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 16px;
            cursor: pointer;
          }
          .icon-name {
            text-align: center;
            padding: 5px;
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

          .icon-list {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
          }

          .icon {
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            position: relative;
            height: 80px;
            width: 120px;
            background: #eeee;
            cursor: pointer;
          }

          .icon:hover {
            background:#ffff
          }

          .copied-text {
            position: absolute;
            top: 0;
            right: 0;
            background-color: #000000;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            }
            .wheat-text {
              color: #e6db74;
            }
            .green-text {
              color: #a6e22e;
            }
            .pink-text {
              color: pink;
            }
        `}
      </style>
    </div>
  );
};

storiesOf("Design Tokens/Icons", module).add("All Icons", () => <IconsList />);
