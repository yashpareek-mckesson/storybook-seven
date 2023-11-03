import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { CommonUtils } from "../../common/utils/CommonUtils";
import styles from "./assets/styles/AutoSelectDropdown.module.scss";
import { ReactComponent as DropdownIcon } from "./assets/svg/dropdown_arrow_down.svg";

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

export const AutoSuggestDropdown = (props) => {
  const [searchText, setSearchText] = useState();
  const [searchBoxContainerActive, setSearchBoxContainerActive] =
    useState(false);
  const listDropdown = useRef(null);

  const [isShowSuggestionList, setIsShowSuggestionList] = useState(false);
  const [isEditingStarted, setIsEditingStarted] = useState(false);
  const [listBottomPoint, setListBottomPoint] = useState(null);

  const {
    selectedVal,
    size,
    suggestionList,
    onChangeInput,
    refineFilterMessage,
    placeHolder,
    suggestionListContainerWidth,
    outline,
    activateFocus,
    getselectedValue,
    disableInput,
    isDisabled,
    optionPosition,
    isShowRefineQueryMessage,
    jestTestData,
  } = props;

  useEffect(() => {
    setSearchText(selectedVal);
    if (jestTestData?.searchText) {
      setSearchText(jestTestData?.searchText);
      setIsShowSuggestionList(true);
    }
  }, []);

  const computeSize = () => {
    let inputSize = styles.sizeLg;
    switch (size) {
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

  const getSelectedValueData = (option) => {
    setSearchText(() => "");
    onInputChange(option.label);
    getselectedValue(option);
    setIsShowSuggestionList((isShowSuggestionList) => !isShowSuggestionList);
    setSearchBoxContainerActive(false);
  };

  let eleRef = onClickOutside(() => {
    setIsShowSuggestionList(false);
    setSearchBoxContainerActive(false);
    setIsEditingStarted(false);
  });

  const filteredOptions = (options) => {
    if (CommonUtils.isNonEmptyArray(options) && searchText.length > 1) {
      if (
        CommonUtils.isNonEmptyString(searchText) &&
        suggestionList.length > 10 &&
        isEditingStarted
      ) {
        return getSortedOptions(options).filter((option) =>
          option.label?.toLowerCase().includes(searchText?.toLowerCase())
        );
      }

      return getSortedOptions(options);
    }

    return [];
  };

  const getSortedOptions = (toSortOptions) => {
    return toSortOptions.sort(function (a, b) {
      const nameA = a.label.toUpperCase(); // ignore upper and lowercase
      const nameB = b.label.toUpperCase(); // ignore upper and lowercase

      // sort in an ascending order
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  };

  const getSuggestionListUI = () => {
    if (isShowSuggestionList) {
      return (
        <ul
          id={"suggestionListContainer"}
          className={`${styles.suggestionListContainer} ${
            optionPosition === "top" && styles.shiftOptions
          }`}
          style={{
            width: suggestionListContainerWidth,
          }}
          data-testid="suggestionListContainer"
        >
          {CommonUtils.isNonEmptyArray(filteredOptions(suggestionList)) ? (
            filteredOptions(suggestionList)
              .slice(0, 20)
              .map((value, i) => {
                return (
                  <li
                    key={"key" + i}
                    className={`${styles.suggestionList} ${
                      getDisplayValue() &&
                      getDisplayValue().toLowerCase() ===
                        value.label.toLowerCase()
                        ? styles.dropdownColor
                        : ""
                    } `}
                    id={"suggestionListContainer-item" + i}
                    tabIndex={i}
                    onClick={() => {
                      getSelectedValueData(value);
                    }}
                    data-testid={"suggestion-list-item"}
                  >
                    {value.label}
                  </li>
                );
              })
          ) : (
            <li className={`${styles.suggestionList}`}>No Result Found!</li>
          )}
          {isShowRefineQueryMessage && getRefineFilterUi()}
        </ul>
      );
    }
  };

  const onDropDownClick = () => {
    setSearchBoxContainerActive(true);
    setIsShowSuggestionList(!isShowSuggestionList);
    setIsEditingStarted(false);
  };

  const getAutoSuggestionStyles = () => {
    let autoSuggestStyle;

    if (outline && !isDisabled) {
      autoSuggestStyle = `${autoSuggestStyle} ${styles.searchBoxContainerOutlined}`;
    }

    if (activateFocus && searchBoxContainerActive) {
      autoSuggestStyle = `${autoSuggestStyle} ${styles.outlinedSearchBoxActive}`;
    }

    return autoSuggestStyle;
  };

  const onInputChange = (event) => {
    setSearchText(event);
    onChangeInput(event);
    setIsShowSuggestionList(true);
  };

  const getRefineFilterUi = () => {
    return (
      <li className={`${styles.refineMessage}`}>
        <span>{refineFilterMessage}</span>
      </li>
    );
  };

  const getDisplayValue = () => {
    if (searchText) return searchText;
    return "";
  };

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
        suggestionList &&
        suggestionList.length > 0 &&
        suggestionList.length > active &&
        event.keyCode == 13
      ) {
        getSelectedValueData(suggestionList[active]);
      }
      if (active != -1) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  return (
    <div
      ref={eleRef}
      onKeyDown={handleKeyUpDown}
      data-testid="dropdown-container"
    >
      <div
        className={`${getAutoSuggestionStyles()} ${
          styles.searchBoxContainer
        } ${computeSize()}`}
        onFocus={() => {
          setSearchBoxContainerActive(true);
        }}
        onBlur={() => {
          setSearchBoxContainerActive(false);
        }}
        onClick={() => {
          isDisabled ? null : onDropDownClick();
        }}
      >
        <input
          type="text"
          placeholder={placeHolder}
          value={getDisplayValue()}
          name="searchTerm"
          onChange={(e) => {
            onInputChange(e.target.value);
            setIsEditingStarted(true);
          }}
          readOnly={disableInput}
          className={`${styles.searchBox} ${styles.dropDownPadding}`}
          disabled={isDisabled}
          data-testid={"search-input"}
        />

        <div
          className={`${styles.dropDownIcon} ${
            isDisabled && styles.disableIcon
          }`}
        >
          <DropdownIcon
            className={`${isShowSuggestionList ? styles.dropdownLight : ""} ${
              isDisabled ? styles.dropdownDisabled : ""
            }`}
          />
        </div>
      </div>

      {searchText && searchText.length > 1 && (
        <div className={`${styles.suggestionListCParentontainer}`}>
          {getSuggestionListUI()}
        </div>
      )}
    </div>
  );
};

AutoSuggestDropdown.propTypes = {
  placeHolder: PropTypes.string,
  getSelectedValueData: PropTypes.func.isRequired,
  activateFocus: PropTypes.bool,
  outline: PropTypes.bool,
  size: PropTypes.string,
  refineFilterMessage: PropTypes.string,
  suggestionListContainerWidth: PropTypes.string,
  isShowRefineQueryMessage: PropTypes.bool,
  getselectedValue: PropTypes.bool,
  disableInput: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

AutoSuggestDropdown.defaultProps = {
  activateFocus: true,
  size: "md",
  chLength: 1,
  outline: true,
  refineFilterMessage: "More records exist. Please refine your query.",
  suggestionListContainerWidth: "360px",
  disbledInput: false,
  isDisabled: false,
};
