import React, { useState, useEffect } from "react";
import styles from "./assets/styles/AutoSuggestSearch.module.scss";
import PropTypes from "prop-types";
import { useRef } from "react";
import NORESULTFOUND from "./constants/AutoSuggestSearchConstant.js";
import { ReactComponent as CloseIcon } from "./assets/svg/removeCircle.svg";
import { ReactComponent as SearchIcon } from "./assets/svg/search.svg";
import { ReactComponent as InfoIcon } from "./assets/svg/info.svg";
import { ReactComponent as RequiredDot } from "./assets/svg/required_dot.svg";
import { CommonUtils } from "../../common/utils/CommonUtils";
import { Tooltip } from "../..";

const onClickOutside = (handler) => {
  let autoSuggestRef = useRef();
  useEffect(() => {
    let callback = (event) => {
      if (!autoSuggestRef.current.contains(event.target)) {
        handler([]);
      }
    };
    document.addEventListener("mousedown", callback);

    return () => {
      document.removeEventListener("mousedown", callback);
    };
  });
  return autoSuggestRef;
};

export const AutoSuggestSearch = (props) => {
  const [autoSuggestionList, setautoSuggestionList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchBoxContainerActive, setSearchBoxContainerActive] =
    useState(false);
  const {
    suggestionList,
    onChangeInput,
    chLength,
    refineFilterMessage,
    placeHolder,
    suggestionListContainerWidth,
    isShowRefineQueryMessage,
    id,
    label,
    isRequired,
    tooltipText,
    extSearchText,
    jestTestData,
  } = props;

  useEffect(() => {
    if (jestTestData?.searchText) {
      setSearchText(jestTestData?.searchText);
    }
    if (jestTestData?.autoSuggestionList) {
      setautoSuggestionList(jestTestData?.autoSuggestionList);
    }
  }, [jestTestData]);

  useEffect(() => {
    if (extSearchText !== null && extSearchText?.length === 0) {
      setSearchText("");
      setautoSuggestionList([]);
    }
  }, [extSearchText]);

  useEffect(() => {
    if (searchText.length >= chLength) {
      let filterval = props.suggestionList;
      let dupfilterval = [];
      if (filterval && filterval.length > 0) {
        filterval.forEach((element) => {
          if (element) {
            dupfilterval.push(element);
          }
        });
      } else {
        dupfilterval.push({
          label: NORESULTFOUND,
          value: "noResultUi",
        });
      }
      setautoSuggestionList(dupfilterval);
    } else {
      setautoSuggestionList([]);
    }
  }, [suggestionList]);

  const onInputChange = (event) => {
    if (CommonUtils.isNonEmptyString(event)) {
      let searchText = event;
      setSearchText(searchText);
      if (searchText.length >= props.chLength ? props.chLength : 1) {
        onChangeInput(searchText);
      }
    } else {
      setSearchText(event);
      onChangeInput(event);
    }
  };

  const getSelectedValueData = (value) => {
    if (value && value.value != "noResultUi") {
      let selectedText = value.label;
      props.getSelectedValueData(value);
      setSearchText(selectedText);
    }
    setautoSuggestionList([]);
  };

  let eleRef = onClickOutside(() => {
    setautoSuggestionList([]);
  });
  let active = -1;

  const handleKeyUpDown = (event) => {
    let autoSuggestDrpDwn = document.getElementById("suggestionListContainer");
    if (autoSuggestDrpDwn) {
      let autoSuggestDrpDwnItems = autoSuggestDrpDwn.children;
      if (event.keyCode == 40) {
        if (active <= autoSuggestDrpDwnItems.length - 1) {
          if (active == autoSuggestDrpDwnItems.length - 1) {
            active = -1;
          }
          active++;
          autoSuggestDrpDwnItems[active].focus();
        }
      } else if (event.keyCode == 38) {
        if (active > 0) {
          active--;
          autoSuggestDrpDwnItems[active].focus();
        }
      } else if (
        active != -1 &&
        autoSuggestionList &&
        autoSuggestionList.length > 0 &&
        autoSuggestionList.length > active &&
        event.keyCode == 13
      ) {
        getSelectedValueData(autoSuggestionList[active]);
      }
      if (active != -1) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  const computeSize = () => {
    let inputSize = styles.sizeLg;
    switch (props.size) {
      case "lg":
        inputSize = styles.sizeLg;
        break;
      case "md":
        inputSize = styles.sizeMd;
        break;
      case "sm":
        inputSize = styles.sizeSm;
        break;
      default:
        break;
    }
    return inputSize;
  };

  const renderLabel = (value) => {
    //  TODO: Highlight search text in option is not working. Commenting this code for now

    // let label = value.label;
    // let label2 = value.label;
    // let newText = label.split(searchText);

    return <>{value.label}</>;
    // if (typeof searchText === 'string') {
    //       let searchValue = searchText.replace(
    //         /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
    //         '\\$&',
    //       );
    //
    //     return label.replace(
    //       new RegExp(searchValue, 'gim'),
    //       `<mark class="text-highlight">$&</mark>`,
    //     );
    //   }
    // }

    //   if (CommonUtils.isNonEmptyString(searchText) && searchText.length >= chLength) {
    //     if (label.toLowerCase().includes(searchText)) {
    //       return (
    //         <>
    //           {newText[0]}
    //           <span style={{ fontWeight: 700 }}>{searchText}</span>
    //           {newText[1]}
    //         </>
    //       );
    //     }
    //     return <>{value.label}</>;
    //   } else {
    //     return <>{value.label}</>;
    //   }
  };

  const onCloseIconClick = () => {
    onInputChange("");
    setautoSuggestionList([]);
  };

  const getSuggestionListUI = () => {
    if (
      autoSuggestionList &&
      autoSuggestionList.length > 0 &&
      searchText.length >= chLength
    ) {
      return (
        <ul
          id={"suggestionListContainer"}
          className={`${styles.suggestionListContainer} ${
            label ? styles.modifiedsuggestionListContainer : ""
          }`}
          style={{
            width: suggestionListContainerWidth,
          }}
        >
          {autoSuggestionList.map((value, i) => {
            return (
              <li
                className={`${styles.suggestionList}`}
                id={"suggestionListContainer-item" + i}
                tabIndex={i}
                onClick={() => {
                  getSelectedValueData(value);
                }}
                data-testid={"suggestion-list-item"}
              >
                <div>{renderLabel(value)}</div>
              </li>
            );
          })}
          {getRefineFilterUi()}
        </ul>
      );
    }
  };

  const getRefineFilterUi = () => {
    if (
      CommonUtils.isNonEmptyArray(suggestionList) &&
      isShowRefineQueryMessage
    ) {
      return (
        <li className={`${styles.refineMessage}`}>
          <span>{refineFilterMessage}</span>
        </li>
      );
    }
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={"autoSuggestSearch-" + id}
          data-testid={"label-testid-" + id}
          className={`${styles.label}`}
        >
          {label}{" "}
          {isRequired && (
            <RequiredDot
              className={styles.requiredIcon}
              data-testid="required-dot"
            />
          )}
          {tooltipText && (
            <Tooltip
              body={tooltipText}
              key={"autoSuggestSearch-tooltip-" + id}
              placement="top"
            >
              <button
                type="button"
                aria-label="information"
                className={styles.ml4}
              >
                <InfoIcon />
              </button>
            </Tooltip>
          )}
        </label>
      )}
      <div ref={eleRef} onKeyDown={handleKeyUpDown}>
        <div
          className={`${styles.autoSuggestSearchContainer} ${
            label ? `${styles.modifiedContainer}` : ""
          }`}
          data-testid={"autoSuggestSearchContainer"}
        >
          <div
            className={`${styles.searchBoxContainer} ${
              label ? styles.modifiedsearchBoxContainer : ""
            } ${props.outline ? styles.searchBoxContainerOutlined : ""} ${
              props.activateFocus && searchBoxContainerActive
                ? props.outline
                  ? styles.outlinedSearchBoxActive
                  : styles.searchBoxContainerActive
                : ""
            } ${computeSize()} ${
              !CommonUtils.isNonEmptyString(searchText) &&
              `${!label ? `${styles.searchBoxBgColor}` : ""}`
            }`}
            onFocus={() => {
              setSearchBoxContainerActive(true);
            }}
            onBlur={() => {
              setSearchBoxContainerActive(false);
            }}
            data-testid={"searchBoxContainer"}
          >
            <div className={`${styles.iconStyle}`}>
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder={placeHolder}
              value={searchText}
              onChange={(e) => onInputChange(e.target.value)}
              className={`${styles.searchBox}`}
              data-testid={"search-input"}
            />
            {CommonUtils.isNonEmptyString(searchText) && (
              <div
                className={`${styles.closeIcon}`}
                onClick={() => onCloseIconClick()}
                data-testid={"close-icon"}
              >
                <CloseIcon />
              </div>
            )}
          </div>
          <div className={`${styles.suggestionListCParentontainer}`}>
            {getSuggestionListUI()}
          </div>
        </div>
      </div>
    </div>
  );
};

AutoSuggestSearch.propTypes = {
  placeHolder: PropTypes.string,
  getSelectedValueData: PropTypes.func.isRequired,
  getSuggestionList: PropTypes.func.isRequired,
  activateFocus: PropTypes.bool,
  outline: PropTypes.bool,
  size: PropTypes.string,
  refineFilterMessage: PropTypes.string,
  suggestionListContainerWidth: PropTypes.string,
  isShowRefineQueryMessage: PropTypes.bool,
};

AutoSuggestSearch.defaultProps = {
  activateFocus: true,
  outline: false,
  size: "md",
  chLength: 1,
  refineFilterMessage: "More records exist. Please refine your query.",
  suggestionListContainerWidth: "360px",
};
